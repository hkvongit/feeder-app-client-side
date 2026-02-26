"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useRegister from "@/query-hooks/auth/useRegister";
import { RegisterFormView } from "./RegisterFormView";
import { CLIENT_SIDE_ROUTES } from "@/constants";

export type RegisterFormValues = {
  email: string;
  password: string;
  fullName: string;
};

export default function RegisterFormProvider() {
  const router = useRouter();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: { email: "", password: "", fullName: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const submitError =
    registerMutation.isError && registerMutation.error instanceof Error
      ? registerMutation.error.message
      : registerMutation.isError
        ? "Something went wrong"
        : null;

  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(
      {
        email: values.email.trim(),
        password: values.password,
        fullName: values.fullName.trim(),
      },
      {
        onSuccess: () => {
          router.push(CLIENT_SIDE_ROUTES.LOGIN);
        },
      },
    );
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    void handleSubmit(onSubmit)(event);
  };

  return (
    <RegisterFormView
      isPending={registerMutation.isPending}
      register={register}
      errors={errors}
      onSubmit={handleFormSubmit}
      globalErrorMessage={submitError}
    />
  );
}
