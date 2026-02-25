import React from "react";
import type {
  FieldErrors,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { AppFormField } from "@/app/_components/AppFormField/AppFormField";
import { AppTextInput } from "@/app/_components/AppTextInput/AppTextInput";

type AppTextInputComponentProps = Omit<
  React.ComponentProps<typeof AppTextInput>,
  "id" | "aria-invalid" | "aria-describedby" | "hasError"
>;

interface BaseFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  id: string;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
}

export function AppTextInputField<TFieldValues extends FieldValues>({
  name,
  label,
  id,
  register,
  errors,
  rules,
  ...inputProps
}: BaseFieldProps<TFieldValues> & AppTextInputComponentProps) {
  const fieldError = errors[name];
  const errorMessage =
    typeof fieldError?.message === "string" ? fieldError.message : undefined;
  const hasError = !!errorMessage;
  const errorId = `${id}-error`;

  return (
    <AppFormField label={label} htmlFor={id} errorMessage={errorMessage}>
      <AppTextInput
        id={id}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        hasError={hasError}
        {...register(name, rules)}
        {...inputProps}
      />
    </AppFormField>
  );
}
