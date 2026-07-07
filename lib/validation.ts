import "server-only";

import {
  DOSAGE_GUIDE_MAX_LENGTH,
  DOSAGE_GUIDE_RANGES,
  normalizeDosageGuide,
} from "@/lib/dosage-guide";
import { isObjectStorageConfigured } from "@/lib/storage";
import { z } from "zod";

const emptyToNull = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return null;
  }

  return value;
};

const emptyToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  if (value === null) {
    return undefined;
  }

  return value;
};

const optionalString = (max: number) =>
  z
    .preprocess(
      emptyToNull,
      z.string().trim().max(max).nullable().optional(),
    )
    .transform((value) => value ?? null);

const optionalInt = (max: number) =>
  z
    .preprocess(
      emptyToNull,
      z.coerce.number().int().min(0).max(max).nullable().optional(),
    )
    .transform((value) => value ?? null);

const dosageGuideEntry = optionalString(DOSAGE_GUIDE_MAX_LENGTH);

const dosageGuide = z
  .preprocess(
    emptyToNull,
    z
      .object(
        Object.fromEntries(
          DOSAGE_GUIDE_RANGES.map((range) => [range.key, dosageGuideEntry]),
        ) as Record<
          (typeof DOSAGE_GUIDE_RANGES)[number]["key"],
          typeof dosageGuideEntry
        >,
      )
      .partial()
      .nullable()
      .optional(),
  )
  .transform((value) => normalizeDosageGuide(value));

const optionalDate = z
  .preprocess(emptyToNull, z.string().trim().nullable().optional())
  .transform((value, ctx) => {
    if (!value) return null;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      ctx.addIssue({
        code: "custom",
        message: "Expiry date must be valid.",
      });
      return z.NEVER;
    }

    return date;
  });

const imageUrl = z
  .preprocess(emptyToNull, z.string().trim().max(1_000_000).nullable().optional())
  .transform((value, ctx) => {
    if (!value) return null;

    if (/^data:image\/(png|jpeg|jpg|webp|gif);base64,/i.test(value)) {
      if (isObjectStorageConfigured()) {
        ctx.addIssue({
          code: "custom",
          message: "Upload images via the file picker when object storage is enabled.",
        });
        return z.NEVER;
      }

      if (process.env.NODE_ENV === "production") {
        ctx.addIssue({
          code: "custom",
          message: "Base64 image uploads are disabled in production. Use object storage uploads.",
        });
        return z.NEVER;
      }

      return value;
    }

    try {
      const url = new URL(value);
      if (url.protocol !== "https:") {
        ctx.addIssue({
          code: "custom",
          message: "Image URL must use HTTPS.",
        });
        return z.NEVER;
      }

      return value;
    } catch {
      ctx.addIssue({
        code: "custom",
        message: "Image URL must be valid.",
      });
      return z.NEVER;
    }
  });

const safeCtaUrl = z
  .preprocess(emptyToNull, z.string().trim().max(1_000).nullable().optional())
  .transform((value, ctx) => {
    if (!value) return null;

    if (value.startsWith("/") && !value.startsWith("//")) {
      return value;
    }

    try {
      const url = new URL(value);
      if (url.protocol === "https:") {
        return value;
      }
    } catch {
      // Fall through to the shared validation issue below.
    }

    ctx.addIssue({
      code: "custom",
      message: "CTA URL must be a safe internal path or HTTPS URL.",
    });
    return z.NEVER;
  });

const productShape = {
  name: z.string().trim().min(1, "Product name is required.").max(160),
  description: optionalString(5_000),
  category: optionalString(80),
  sku: optionalString(80),
  price: z.coerce.number().positive("Price must be greater than zero.").max(999_999),
  quantity: z.coerce.number().int().min(0).max(100_000),
  lowStock: optionalInt(100_000),
  dosage: optionalString(120),
  dosageGuide,
  manufacturer: optionalString(160),
  expiryDate: optionalDate,
  imageUrl,
  prescriptionRequired: z.boolean(),
  activeListing: z.boolean(),
  isFeatured: z.boolean(),
  featuredRank: optionalInt(1_000),
};

export const ProductCreateSchema = z
  .object({
    ...productShape,
    prescriptionRequired: productShape.prescriptionRequired.default(false),
    activeListing: productShape.activeListing.default(true),
    isFeatured: productShape.isFeatured.default(false),
  })
  .strip();

export const ProductUpdateSchema = z
  .object(productShape)
  .partial()
  .strip()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one product field is required.",
  });

const HeroSlideSchema = z
  .object({
    title: z.string().trim().min(1, "Slide title is required.").max(160),
    subtitle: optionalString(1_000),
    // For the general schema we accept the common `imageUrl` transform, but
    // creation requires a non-null string because the DB column is non-nullable.
    imageUrl: imageUrl,
    ctaText: optionalString(80),
    ctaUrl: safeCtaUrl,
    active: z.boolean().default(true),
    sortOrder: z.coerce.number().int().min(0).default(0),
  })
  .strip();

// Creation schema must ensure `imageUrl` is a real string (DB requires it)
export const HeroSlideCreateSchema = HeroSlideSchema.extend({
  imageUrl: z.preprocess(emptyToNull, z.string().trim().max(1_000_000)),
});

export const HeroSlideUpdateSchema = HeroSlideSchema
  .partial()
  .extend({
    imageUrl: z.preprocess(emptyToUndefined, z.string().trim().max(1_000_000).optional()),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one hero slide field is required.",
  });

const CheckoutItemSchema = z.object({
  id: z.string().trim().min(1).max(128),
  quantity: z.coerce.number().int().min(1).max(99),
});

export const CheckoutRequestSchema = z
  .object({
    email: z.string().trim().email().toLowerCase(),
    idempotencyKey: z
      .string()
      .trim()
      .min(16)
      .max(128)
      .regex(/^[A-Za-z0-9:_-]+$/, "Invalid checkout idempotency key."),
    items: z
      .array(CheckoutItemSchema)
      .min(1, "Cart items are required.")
      .max(50, "Too many cart items.")
      .superRefine((items, ctx) => {
        const seen = new Set<string>();

        for (const [index, item] of items.entries()) {
          if (seen.has(item.id)) {
            ctx.addIssue({
              code: "custom",
              path: [index, "id"],
              message: "Duplicate cart item.",
            });
          }

          seen.add(item.id);
        }
      }),
  })
  .strict();

export const PaystackWebhookSchema = z
  .object({
    event: z.string().optional(),
    data: z
      .object({
        reference: z.string().trim().min(1).optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

const optionalQueryString = (max: number) =>
  z.preprocess(emptyToUndefined, z.string().trim().max(max).optional());

const optionalQueryNumber = z.preprocess(
  emptyToUndefined,
  z.coerce.number().min(0).optional(),
);

export const AdminProductListQuerySchema = z
  .object({
    q: optionalQueryString(120).default(""),
    category: optionalQueryString(80),
    brand: optionalQueryString(160),
    status: z
      .preprocess(
        emptyToUndefined,
        z.enum(["in", "low", "out", "all"]).optional(),
      ),
    minPrice: optionalQueryNumber,
    maxPrice: optionalQueryNumber,
    limit: z
      .preprocess(emptyToUndefined, z.coerce.number().int().min(1).max(200))
      .default(50),
    skip: z
      .preprocess(emptyToUndefined, z.coerce.number().int().min(0))
      .default(0),
  })
  .refine(
    (value) =>
      typeof value.minPrice !== "number" ||
      typeof value.maxPrice !== "number" ||
      value.minPrice <= value.maxPrice,
    {
      message: "Minimum price cannot exceed maximum price.",
      path: ["minPrice"],
    },
  );

export const PublicProductListQuerySchema = z.object({
  limit: z
    .preprocess(emptyToUndefined, z.coerce.number().int().min(1).max(100))
    .default(50),
  skip: z
    .preprocess(emptyToUndefined, z.coerce.number().int().min(0))
    .default(0),
  q: z
    .preprocess(emptyToUndefined, z.string().trim().max(100))
    .optional(),
});

export function validationMessage(error: z.ZodError) {
  return error.issues[0]?.message ?? "Invalid request payload.";
}
