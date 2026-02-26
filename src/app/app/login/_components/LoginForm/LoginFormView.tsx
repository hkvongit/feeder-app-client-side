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
import type { LoginFormValues } from "./LoginFormProvider";

interface LoginFormViewProps {
  isPending: boolean;
  register: UseFormRegister<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  globalErrorMessage?: string | null;
}

const passwordRules: RegisterOptions<LoginFormValues, "password"> = {
  required: "Password is required",
};

export function LoginFormView({
  isPending,
  register,
  errors,
  onSubmit,
  globalErrorMessage,
}: LoginFormViewProps) {
  return (
    <form onSubmit={onSubmit}>
      <YStack gap={16} style={{ minWidth: 320 }}>
        <AppTextInputField<LoginFormValues>
          id="login-email"
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

        <AppTextInputField<LoginFormValues>
          id="login-password"
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          disabled={isPending}
          autoComplete="current-password"
          register={register}
          errors={errors}
          rules={passwordRules}
        />

        <AppFormError message={globalErrorMessage} />

        <AppFormActions>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? "Signing in…" : "Sign in"}
          </Button>
        </AppFormActions>

        <YStack style={{ paddingTop: 8 }}>
          <Link
            href={CLIENT_SIDE_ROUTES.REGISTER}
            style={{ fontSize: 14, color: "#666", textDecoration: "underline" }}
          >
            Don&apos;t have an account? Register
          </Link>
        </YStack>
      </YStack>
    </form>
  );
}
