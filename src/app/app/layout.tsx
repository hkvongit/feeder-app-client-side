import AppMenu from "@/app/_components/AppMenu/AppMenu";
import SessionExpiryProvider, {
  SessionExpiryAlert,
} from "@/providers/SessionExpiryProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import AppTamaguiProvider from "@/providers/TamaguiProvider";
import { ReactNode } from "react";

import styles from "./layout.module.css";

export default function AppLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SessionExpiryProvider>
      <TanstackProvider>
        <AppTamaguiProvider>
          <main className={styles.app_layout}>
            <SessionExpiryAlert />
            <AppMenu />
            {children}
          </main>
        </AppTamaguiProvider>
      </TanstackProvider>
    </SessionExpiryProvider>
  );
}
