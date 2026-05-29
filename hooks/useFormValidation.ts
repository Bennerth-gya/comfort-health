import { useState } from "react";

export type ValidationRule = {
  validate: (value: unknown) => boolean | string;
  message: string;
};

export type ValidationRules = {
  [key: string]: ValidationRule[];
};

export type FormErrors = {
  [key: string]: string | null;
};

export function useFormValidation(rules: ValidationRules) {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (fieldName: string, value: unknown): boolean => {
    const fieldRules = rules[fieldName];
    if (!fieldRules) return true;

    for (const rule of fieldRules) {
      const result = rule.validate(value);
      if (result !== true) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: typeof result === "string" ? result : rule.message,
        }));
        return false;
      }
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: null,
    }));
    return true;
  };

  const validateAll = (data: Record<string, unknown>): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    for (const fieldName in rules) {
      const value = data[fieldName];
      const fieldRules = rules[fieldName];

      for (const rule of fieldRules) {
        const result = rule.validate(value);
        if (result !== true) {
          newErrors[fieldName] = typeof result === "string" ? result : rule.message;
          isValid = false;
          break;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearFieldError = (fieldName: string) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: null,
    }));
  };

  return {
    errors,
    validateField,
    validateAll,
    clearErrors,
    clearFieldError,
  };
}

// Common validation rules
export const commonRules = {
  required: (message = "This field is required"): ValidationRule => ({
    validate: (value: unknown) => {
      if (typeof value === "string") return value.trim().length > 0;
      if (typeof value === "number") return value !== null && value !== undefined;
      return !!value;
    },
    message,
  }),

  minLength: (length: number): ValidationRule => ({
    validate: (value: unknown) => !value || value.toString().length >= length,
    message: `Minimum ${length} characters required`,
  }),

  maxLength: (length: number): ValidationRule => ({
    validate: (value: unknown) => !value || value.toString().length <= length,
    message: `Maximum ${length} characters allowed`,
  }),

  min: (num: number): ValidationRule => ({
    validate: (value: unknown) => value === null || value === undefined || value === "" || Number(value) >= num,
    message: `Minimum value is ${num}`,
  }),

  max: (num: number): ValidationRule => ({
    validate: (value: unknown) => value === null || value === undefined || value === "" || Number(value) <= num,
    message: `Maximum value is ${num}`,
  }),

  positiveNumber: (): ValidationRule => ({
    validate: (value: unknown) => {
      if (value === null || value === undefined || value === "") return true;
      const num = Number(value);
      return Number.isFinite(num) && num > 0;
    },
    message: "Must be a positive number",
  }),

  validNumber: (): ValidationRule => ({
    validate: (value: unknown) => {
      if (value === null || value === undefined || value === "") return true;
      return Number.isFinite(Number(value));
    },
    message: "Must be a valid number",
  }),

  validUrl: (): ValidationRule => ({
    validate: (value: unknown) => {
      if (!value) return true;
      try {
        new URL(String(value));
        return true;
      } catch {
        return false;
      }
    },
    message: "Must be a valid URL",
  }),
};
