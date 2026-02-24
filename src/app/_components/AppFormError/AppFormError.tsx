import React from "react";
import { Paragraph } from "tamagui";

interface AppFormErrorProps {
  message?: string | null;
}

export function AppFormError({ message }: AppFormErrorProps) {
  if (!message) return null;

  return (
    <Paragraph fontSize={13} color="#c00" role="alert">
      {message}
    </Paragraph>
  );
}
