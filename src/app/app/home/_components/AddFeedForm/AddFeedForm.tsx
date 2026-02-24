"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAddFeed from "@/query-hooks/feeds/useAddFeed";
import { isValidFeedUrl } from "@/helpers/url-helpers";
import { Button } from "@/app/_components/Button/Button";
import { AppTextInput } from "@/app/_components/AppTextInput/AppTextInput";
import styles from "./AddFeedForm.module.css";

interface AddFeedFormProps {
  onSuccess?: () => void;
}

interface AddFeedFormValues {
  title: string;
  url: string;
  description: string;
  favicon: string;
}

export default function AddFeedForm({ onSuccess }: AddFeedFormProps) {
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

  const isSessionExpired =
    addFeed.isError &&
    addFeed.error instanceof Error &&
    (addFeed.error.message.toLowerCase().includes("unauthorized") ||
      addFeed.error.message.toLowerCase().includes("session"));

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="add-feed-title">
          Title
        </label>
        <AppTextInput
          id="add-feed-title"
          type="text"
          placeholder="e.g. Creative Bloq"
          disabled={addFeed.isPending}
          autoComplete="off"
          aria-invalid={!!errors.title}
          aria-describedby={
            errors.title ? "add-feed-title-error" : undefined
          }
          hasError={!!errors.title}
          {...register("title", {
            validate: (value) =>
              value.trim() ? true : "Title is required",
          })}
        />
        {errors.title && (
          <span
            id="add-feed-title-error"
            className={styles.error_message}
            role="alert"
          >
            {errors.title.message}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="add-feed-url">
          Feed URL
        </label>
        <AppTextInput
          id="add-feed-url"
          type="url"
          placeholder="https://example.com/feed"
          disabled={addFeed.isPending}
          autoComplete="off"
          aria-invalid={!!errors.url}
          aria-describedby={errors.url ? "add-feed-url-error" : undefined}
          hasError={!!errors.url}
          {...register("url", {
            validate: (value) => {
              const trimmed = value.trim();
              if (!trimmed) {
                return "URL is required";
              }
              return (
                isValidFeedUrl(trimmed) ||
                "Please enter a valid http or https URL"
              );
            },
          })}
        />
        {errors.url && (
          <span
            id="add-feed-url-error"
            className={styles.error_message}
            role="alert"
          >
            {errors.url.message}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="add-feed-description">
          Description (optional)
        </label>
        <AppTextInput
          id="add-feed-description"
          type="text"
          placeholder="Short description of the feed"
          disabled={addFeed.isPending}
          autoComplete="off"
          {...register("description")}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="add-feed-favicon">
          Favicon URL (optional)
        </label>
        <AppTextInput
          id="add-feed-favicon"
          type="url"
          placeholder="https://example.com/favicon.ico"
          disabled={addFeed.isPending}
          autoComplete="off"
          {...register("favicon")}
        />
      </div>

      {(submitError || isSessionExpired) && (
        <p className={styles.error_message} role="alert">
          {isSessionExpired
            ? "Session expired. Please sign in again."
            : submitError}
        </p>
      )}

      <div className={styles.actions}>
        <Button type="submit" variant="primary" disabled={addFeed.isPending}>
          {addFeed.isPending ? "Adding…" : "Add feed"}
        </Button>
      </div>
    </form>
  );
}
