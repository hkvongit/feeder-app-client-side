"use client";

import { useState, useEffect } from "react";
import useAddFeed from "@/query-hooks/feeds/useAddFeed";
import { isValidFeedUrl } from "@/helpers/url-helpers";
import { Button } from "@/app/_components/Button/Button";
import styles from "./AddFeedForm.module.css";

interface AddFeedFormProps {
  onSuccess?: () => void;
}

interface FieldErrors {
  title?: string;
  url?: string;
}

export default function AddFeedForm({ onSuccess }: AddFeedFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [favicon, setFavicon] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const addFeed = useAddFeed();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const titleTrimmed = title.trim();
    const urlTrimmed = url.trim();

    const errors: FieldErrors = {};
    if (!titleTrimmed) errors.title = "Title is required";
    if (!urlTrimmed) errors.url = "URL is required";
    else if (!isValidFeedUrl(urlTrimmed))
      errors.url = "Please enter a valid http or https URL";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    addFeed.mutate(
      {
        title: titleTrimmed,
        url: urlTrimmed,
        ...(description.trim() && { description: description.trim() }),
        ...(favicon.trim() && { favicon: favicon.trim() }),
      },
      {
        onSuccess: () => {
          setTitle("");
          setUrl("");
          setDescription("");
          setFavicon("");
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="add-feed-title">
          Title
        </label>
        <input
          id="add-feed-title"
          type="text"
          className={`${styles.input} ${fieldErrors.title ? styles.input_error : ""}`}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (fieldErrors.title)
              setFieldErrors((prev) => ({ ...prev, title: undefined }));
          }}
          placeholder="e.g. Creative Bloq"
          disabled={addFeed.isPending}
          autoComplete="off"
          aria-invalid={!!fieldErrors.title}
          aria-describedby={
            fieldErrors.title ? "add-feed-title-error" : undefined
          }
        />
        {fieldErrors.title && (
          <span
            id="add-feed-title-error"
            className={styles.error_message}
            role="alert"
          >
            {fieldErrors.title}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="add-feed-url">
          Feed URL
        </label>
        <input
          id="add-feed-url"
          type="url"
          className={`${styles.input} ${fieldErrors.url ? styles.input_error : ""}`}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (fieldErrors.url)
              setFieldErrors((prev) => ({ ...prev, url: undefined }));
          }}
          placeholder="https://example.com/feed"
          disabled={addFeed.isPending}
          autoComplete="off"
          aria-invalid={!!fieldErrors.url}
          aria-describedby={fieldErrors.url ? "add-feed-url-error" : undefined}
        />
        {fieldErrors.url && (
          <span
            id="add-feed-url-error"
            className={styles.error_message}
            role="alert"
          >
            {fieldErrors.url}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="add-feed-description">
          Description (optional)
        </label>
        <input
          id="add-feed-description"
          type="text"
          className={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description of the feed"
          disabled={addFeed.isPending}
          autoComplete="off"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="add-feed-favicon">
          Favicon URL (optional)
        </label>
        <input
          id="add-feed-favicon"
          type="url"
          className={styles.input}
          value={favicon}
          onChange={(e) => setFavicon(e.target.value)}
          placeholder="https://example.com/favicon.ico"
          disabled={addFeed.isPending}
          autoComplete="off"
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
