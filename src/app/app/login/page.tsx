"use client";

import { YStack } from "tamagui";
import { Paragraph } from "tamagui";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <YStack flex={1} style={{ padding: "$4", gap: "$4", maxWidth: 400 }}>
      <Paragraph fontSize={20} fontWeight="600">
        Sign in
      </Paragraph>
      <LoginForm />
    </YStack>
  );
}
