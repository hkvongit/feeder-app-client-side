"use client";

import { useRouter } from "next/navigation";
import { Button } from "tamagui";
import useLogout from "@/query-hooks/auth/useLogout";
import { CLIENT_SIDE_ROUTES } from "@/constants";

export default function LogoutButton() {
  const router = useRouter();
  const logout = useLogout();

  const handlePress = () => {
    logout.mutate(undefined, {
      onSettled: () => {
        router.push(CLIENT_SIDE_ROUTES.LOGIN);
      },
    });
  };

  return (
    <Button
      chromeless
      width="100%"
      padding="$4"
      justifyContent="flex-start"
      // textDecorationLine="underline"
      textDecorationColor="rgba(128,128,128,0.2)"
      hoverStyle={{
        background: "var(--app-theme-color)",
        // color: "rgba(128,128,128,0)",
        borderRadius: 4,
      }}
      pressStyle={{ opacity: 0.9 }}
      disabledStyle={{ opacity: 0.6, cursor: "not-allowed" }}
      onPress={handlePress}
      disabled={logout.isPending}
    >
      {logout.isPending ? "Logging out…" : "Logout"}
    </Button>
  );
}
