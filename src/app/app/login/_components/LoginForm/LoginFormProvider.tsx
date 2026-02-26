"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useLogin from "@/query-hooks/auth/useLogin";
import { LoginFormView } from "./LoginFormView";
import { CLIENT_SIDE_ROUTES } from "@/constants";

export type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginFormProvider() {
  const router = useRouter();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const submitError =
    login.isError && login.error instanceof Error
      ? login.error.message
      : login.isError
        ? "Something went wrong"
        : null;

  const onSubmit = (values: LoginFormValues) => {
    login.mutate(
      { email: values.email.trim(), password: values.password },
      {
        onSuccess: () => {
          router.push(CLIENT_SIDE_ROUTES.HOME);
        },
      },
    );
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    void handleSubmit(onSubmit)(event);
  };

  return (
    <LoginFormView
      isPending={login.isPending}
      register={register}
      errors={errors}
      onSubmit={handleFormSubmit}
      globalErrorMessage={submitError}
    />
  );
}
