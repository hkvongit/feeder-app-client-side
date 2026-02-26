import type { RegisterOptions } from "react-hook-form";

/** Shared email validation rules for forms with an email field. */
export const emailValidationRules: RegisterOptions<{ email: string }, "email"> =
  {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email",
    },
  };
