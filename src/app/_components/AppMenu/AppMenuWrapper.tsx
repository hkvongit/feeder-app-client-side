"use client";

import { usePathname } from "next/navigation";
import { CLIENT_SIDE_ROUTES } from "@/constants";
import AppMenu from "./AppMenu";

const HIDE_MENU_ROUTES = [CLIENT_SIDE_ROUTES.LOGIN, CLIENT_SIDE_ROUTES.REGISTER];

export default function AppMenuWrapper() {
  const pathname = usePathname();
  const hideMenu = HIDE_MENU_ROUTES.includes(pathname ?? "");

  if (hideMenu) return null;

  return <AppMenu />;
}
