"use client";

import { ReactNode } from "react";
import { TamaguiProvider } from "tamagui";
import { config } from "../../tamagui.config";

export default function AppTamaguiProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      {children}
    </TamaguiProvider>
  );
}
