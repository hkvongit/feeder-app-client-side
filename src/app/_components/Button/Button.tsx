import React, { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  isActive?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

export const Button = ({
  variant = "primary",
  isActive = false,
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    isActive ? styles.active : "",
    !children ? styles.icon_only : "",
    className,
  ]
    .join(" ")
    .trim();

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.text}>{children}</span>}
    </button>
  );
};
