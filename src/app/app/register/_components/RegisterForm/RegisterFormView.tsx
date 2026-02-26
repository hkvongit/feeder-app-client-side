"use client";

import React from "react";
import type {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import Link from "next/link";
import { YStack } from "tamagui";
import { Button } from "@/app/_components/Button/Button";
import { AppFormError } from "@/app/_components/AppFormError/AppFormError";
import { AppFormActions } from "@/app/_components/AppFormActions/AppFormActions";
import { AppTextInputField } from "@/app/_components/AppTextInputField/AppTextInputField";
import { CLIENT_SIDE_ROUTES } from "@/constants";
import { emailValidationRules } from "@/helpers/form-validation-helpers";
import type { RegisterFormValues } from "./RegisterFormProvider";

interface RegisterFormViewProps {
  isPending: boolean;
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  globalErrorMessage?: string | null;
}

const passwordRules: RegisterOptions<RegisterFormValues, "password"> = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters",
  },
};

const fullNameRules: RegisterOptions<RegisterFormValues, "fullName"> = {
  required: "Full name is required",
  minLength: {
    value: 1,
    message: "Full name is required",
  },
};

export function RegisterFormView({
  isPending,
  register,
  errors,
  onSubmit,
  globalErrorMessage,
}: RegisterFormViewProps) {
  return (
    <form onSubmit={onSubmit}>
      <YStack gap={16} style={{ minWidth: 320 }}>
        <AppTextInputField<RegisterFormValues>
          id="register-fullName"
          name="fullName"
          label="Full name"
          type="text"
          placeholder="John Doe"
          disabled={isPending}
          autoComplete="name"
          register={register}
          errors={errors}
          rules={fullNameRules}
        />

        <AppTextInputField<RegisterFormValues>
          id="register-email"
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          disabled={isPending}
          autoComplete="email"
          register={register}
          errors={errors}
          rules={emailValidationRules}
        />

        <AppTextInputField<RegisterFormValues>
          id="register-password"
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          disabled={isPending}
          autoComplete="new-password"
          register={register}
          errors={errors}
          rules={passwordRules}
        />

        <AppFormError message={globalErrorMessage} />

        <AppFormActions>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? "Creating account…" : "Create account"}
          </Button>
        </AppFormActions>

        <YStack style={{ paddingTop: 8 }}>
          <Link
            href={CLIENT_SIDE_ROUTES.LOGIN}
            style={{ fontSize: 14, color: "#666", textDecoration: "underline" }}
          >
            Already have an account? Login
          </Link>
        </YStack>
      </YStack>
    </form>
  );
}
