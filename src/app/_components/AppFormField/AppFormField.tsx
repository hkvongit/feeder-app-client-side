import React from "react";
import { Label, Paragraph, YStack } from "tamagui";

interface AppFormFieldProps {
  label: string;
  htmlFor: string;
  errorMessage?: string;
  children: React.ReactNode;
}

export function AppFormField({
  label,
  htmlFor,
  errorMessage,
  children,
}: AppFormFieldProps) {
  const errorId = `${htmlFor}-error`;

  return (
    <YStack gap={4}>
      <Label htmlFor={htmlFor} fontSize={14} fontWeight="500">
        {label}
      </Label>
      {children}
      {errorMessage && (
        <Paragraph id={errorId} fontSize={13} color="#c00" role="alert">
          {errorMessage}
        </Paragraph>
      )}
    </YStack>
  );
}
