import React, { forwardRef } from "react";
import styles from "./AppTextInput.module.css";

interface AppTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const AppTextInput = forwardRef<HTMLInputElement, AppTextInputProps>(
  ({ hasError = false, className = "", ...rest }, ref) => {
    const inputClasses = [
      styles.input,
      hasError ? styles.input_error : "",
      className,
    ]
      .join(" ")
      .trim();

    return <input ref={ref} className={inputClasses} {...rest} />;
  },
);

AppTextInput.displayName = "AppTextInput";
