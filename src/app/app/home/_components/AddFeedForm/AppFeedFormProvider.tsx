"use client";

import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAddFeed from "@/query-hooks/feeds/useAddFeed";
import { AppFeedFormView } from "@/app/app/home/_components/AddFeedForm/AppFeedFormView";

export interface AddFeedFormProps {
  onSuccess?: () => void;
}

export interface AddFeedFormValues {
  title: string;
  url: string;
  description: string;
  favicon: string;
}

export default function AppFeedFormProvider({ onSuccess }: AddFeedFormProps) {
  const addFeed = useAddFeed();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddFeedFormValues>({
    defaultValues: {
      title: "",
      url: "",
      description: "",
      favicon: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  // Reset mutation state when form is shown so previous errors don’t linger after reopening modal
  useEffect(() => {
    addFeed.reset();
    // We need the reset only on initial mount. So we are adding a eslint disable to prevent linter from mentioning addFeed hook missing in dep. array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitError =
    addFeed.isError && addFeed.error instanceof Error
      ? addFeed.error.message
      : addFeed.isError
        ? "Something went wrong"
        : null;

  const onSubmit = (values: AddFeedFormValues) => {
    const titleTrimmed = values.title.trim();
    const urlTrimmed = values.url.trim();
    const descriptionTrimmed = values.description.trim();
    const faviconTrimmed = values.favicon.trim();

    addFeed.mutate(
      {
        title: titleTrimmed,
        url: urlTrimmed,
        ...(descriptionTrimmed && { description: descriptionTrimmed }),
        ...(faviconTrimmed && { favicon: faviconTrimmed }),
      },
      {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      },
    );
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    void handleSubmit(onSubmit)(event);
  };

  return (
    <AppFeedFormView
      isPending={addFeed.isPending}
      register={register}
      errors={errors}
      onSubmit={handleFormSubmit}
      globalErrorMessage={submitError}
    />
  );
}
