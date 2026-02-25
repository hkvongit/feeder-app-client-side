"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Button, Dialog, XStack, YStack } from "tamagui";
import { setSessionExpiredCallback } from "@/lib/session-expiry-notifier";

type SessionExpiryContextValue = {
  isSessionExpired: boolean;
  message: string;
  clearSessionExpired: () => void;
};

const SessionExpiryContext = createContext<SessionExpiryContextValue | null>(
  null,
);

const DEFAULT_MESSAGE = "Session expired. Please sign in again.";

export function useSessionExpiry(): SessionExpiryContextValue {
  const ctx = useContext(SessionExpiryContext);
  if (!ctx) {
    throw new Error(
      "useSessionExpiry must be used within SessionExpiryProvider",
    );
  }
  return ctx;
}

export function SessionExpiryAlert() {
  const { isSessionExpired, message, clearSessionExpired } = useSessionExpiry();
  if (!isSessionExpired) return null;

  return (
    <Dialog
      modal
      open
      onOpenChange={(open) => {
        if (!open) {
          clearSessionExpired();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay key="overlay" background="rgba(0,0,0,0.5)" />
        <Dialog.Content
          key="content"
          bordered
          elevate
          style={{ borderRadius: 8, padding: 16 }}
        >
          <YStack gap="$3">
            <Dialog.Title>Session expired</Dialog.Title>
            <Dialog.Description>
              {message || DEFAULT_MESSAGE}
            </Dialog.Description>
            <XStack gap="$3" style={{ justifyContent: "flex-end" }}>
              <Dialog.Close asChild>
                <Button>Dismiss</Button>
              </Dialog.Close>
            </XStack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

export default function SessionExpiryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  const handleExpired = useCallback((msg: string) => {
    setIsSessionExpired(true);
    setMessage(msg || DEFAULT_MESSAGE);
  }, []);

  const clearSessionExpired = useCallback(() => {
    setIsSessionExpired(false);
    setMessage(DEFAULT_MESSAGE);
  }, []);

  useEffect(() => {
    setSessionExpiredCallback(handleExpired);
    return () => setSessionExpiredCallback(null);
  }, [handleExpired]);

  const value = useMemo<SessionExpiryContextValue>(
    () => ({
      isSessionExpired,
      message,
      clearSessionExpired,
    }),
    [isSessionExpired, message, clearSessionExpired],
  );

  return (
    <SessionExpiryContext.Provider value={value}>
      {children}
    </SessionExpiryContext.Provider>
  );
}
