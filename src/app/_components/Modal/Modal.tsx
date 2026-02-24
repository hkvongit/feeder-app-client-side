"use client";

import { ReactNode, useEffect, useRef, useCallback } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Ref to the element that should receive focus when the modal closes (e.g. the trigger button). */
  restoreFocusRef?: React.RefObject<HTMLElement | null>;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  restoreFocusRef,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    restoreFocusRef?.current?.focus?.();
    onClose();
  }, [onClose, restoreFocusRef]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      queueMicrotask(() => panelRef.current?.focus());
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      // onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={panelRef}
        className={styles.panel}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
          <button
            type="button"
            className={styles.close_btn}
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
