import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetailsClient from "@/app/products/ProductDetailsClient";

type ProductDetails = {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  price: number;
  imageUrl: string | null;
  dosage: string | null;
  manufacturer: string | null;
  prescriptionRequired: boolean;
  quantity: number;
};

export const dynamic = "force-dynamic";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      category: true,
      description: true,
      price: true,
      imageUrl: true,
      dosage: true,
      manufacturer: true,
      prescriptionRequired: true,
      quantity: true,
    },
  });

  if (!product) {
    notFound();
  }

  const productDetails: ProductDetails = {
    ...product,
    price: parseFloat(product.price.toString()),
  };

  return <ProductDetailsClient product={productDetails} />;
}
