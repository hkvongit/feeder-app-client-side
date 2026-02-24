import React from "react";
import { XStack } from "tamagui";

interface AppFormActionsProps {
  children: React.ReactNode;
}

export function AppFormActions({ children }: AppFormActionsProps) {
  return (
    <XStack style={[{ justifyContent: "flex-end", marginTop: 8 }]} gap={8}>
      {children}
    </XStack>
  );
}
