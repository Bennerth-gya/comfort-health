export const DOSAGE_GUIDE_MAX_LENGTH = 600;

export const DOSAGE_GUIDE_RANGES = [
  {
    key: "age0To10",
    label: "0-10 years",
    placeholder: "e.g. 5 ml twice daily after meals",
  },
  {
    key: "age11To17",
    label: "11-17 years",
    placeholder: "e.g. 10 ml twice daily after meals",
  },
  {
    key: "age18Plus",
    label: "18+ adult",
    placeholder: "e.g. 1 tablet every 8 hours after meals",
  },
] as const;

export type DosageGuideKey = (typeof DOSAGE_GUIDE_RANGES)[number]["key"];
export type DosageGuide = Partial<Record<DosageGuideKey, string>>;
export type DosageGuideForm = Record<DosageGuideKey, string>;

export function emptyDosageGuideForm(): DosageGuideForm {
  return DOSAGE_GUIDE_RANGES.reduce((guide, range) => {
    guide[range.key] = "";
    return guide;
  }, {} as DosageGuideForm);
}

export function normalizeDosageGuide(value: unknown): DosageGuide | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const source = value as Record<string, unknown>;
  const guide: DosageGuide = {};

  for (const range of DOSAGE_GUIDE_RANGES) {
    const raw = source[range.key];
    if (typeof raw !== "string") {
      continue;
    }

    const text = raw.trim();
    if (text) {
      guide[range.key] = text;
    }
  }

  return Object.keys(guide).length > 0 ? guide : null;
}

export function dosageGuideToForm(value: unknown): DosageGuideForm {
  const normalized = normalizeDosageGuide(value);
  const form = emptyDosageGuideForm();

  if (!normalized) {
    return form;
  }

  for (const range of DOSAGE_GUIDE_RANGES) {
    form[range.key] = normalized[range.key] ?? "";
  }

  return form;
}

export function dosageGuideEntries(value: unknown) {
  const normalized = normalizeDosageGuide(value);
  if (!normalized) {
    return [];
  }

  return DOSAGE_GUIDE_RANGES.flatMap((range) => {
    const text = normalized[range.key];
    return text ? [{ ...range, text }] : [];
  });
}
