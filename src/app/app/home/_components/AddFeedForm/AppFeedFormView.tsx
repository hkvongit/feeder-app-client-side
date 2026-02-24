import React from "react";
import type {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { YStack } from "tamagui";
import { Button } from "@/app/_components/Button/Button";
import { AppFormError } from "@/app/_components/AppFormError/AppFormError";
import { AppFormActions } from "@/app/_components/AppFormActions/AppFormActions";
import { AppTextInputField } from "@/app/_components/AppTextInputField/AppTextInputField";
import type { AddFeedFormValues } from "./AppFeedFormProvider";
import { isValidFeedUrl } from "@/helpers/url-helpers";

interface AppFeedFormViewProps {
  isPending: boolean;
  register: UseFormRegister<AddFeedFormValues>;
  errors: FieldErrors<AddFeedFormValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  globalErrorMessage?: string | null;
}

const titleValidationRules: RegisterOptions<AddFeedFormValues, "title"> = {
  validate: (value) => (value.trim() ? true : "Title is required"),
};

const urlValidationRules: RegisterOptions<AddFeedFormValues, "url"> = {
  validate: (value) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "URL is required";
    }

    return isValidFeedUrl(trimmed) || "Please enter a valid http or https URL";
  },
};

export function AppFeedFormView({
  isPending,
  register,
  errors,
  onSubmit,
  globalErrorMessage,
}: AppFeedFormViewProps) {
  return (
    <form onSubmit={onSubmit}>
      <YStack gap={16} minW={"30vw"}>
        <AppTextInputField<AddFeedFormValues>
          id="add-feed-title"
          name="title"
          label="Title"
          type="text"
          placeholder="e.g. Creative Bloq"
          disabled={isPending}
          autoComplete="off"
          register={register}
          errors={errors}
          rules={titleValidationRules}
        />

        <AppTextInputField<AddFeedFormValues>
          id="add-feed-url"
          name="url"
          label="Feed URL"
          type="url"
          placeholder="https://example.com/feed"
          disabled={isPending}
          autoComplete="off"
          register={register}
          errors={errors}
          rules={urlValidationRules}
        />

        <AppTextInputField<AddFeedFormValues>
          id="add-feed-description"
          name="description"
          label="Description (optional)"
          type="text"
          placeholder="Short description of the feed"
          disabled={isPending}
          autoComplete="off"
          register={register}
          errors={errors}
        />

        <AppTextInputField<AddFeedFormValues>
          id="add-feed-favicon"
          name="favicon"
          label="Favicon URL (optional)"
          type="url"
          placeholder="https://example.com/favicon.ico"
          disabled={isPending}
          autoComplete="off"
          register={register}
          errors={errors}
        />

        <AppFormError message={globalErrorMessage} />

        <AppFormActions>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? "Adding…" : "Add feed"}
          </Button>
        </AppFormActions>
      </YStack>
    </form>
  );
}
