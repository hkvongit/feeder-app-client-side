"use client";

import { YStack } from "tamagui";
import { Paragraph } from "tamagui";
import RegisterForm from "./_components/RegisterForm";

export default function RegisterPage() {
  return (
    <YStack flex={1} style={{ padding: "$4", gap: "$4", maxWidth: 400 }}>
      <Paragraph fontSize={20} fontWeight="600">
        Create account
      </Paragraph>
      <RegisterForm />
    </YStack>
  );
}
