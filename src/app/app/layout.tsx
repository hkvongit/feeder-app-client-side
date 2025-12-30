import AppMenu from "@/app/_components/AppMenu/AppMenu";
import TanstackProvider from "@/providers/TanstackProvider";
import { ReactNode } from "react";
import styles from "./layout.module.css"

export default function AppLayout({
    children
}: Readonly<{ children: ReactNode }>) {
    return (
        <TanstackProvider>
            <main className={styles.app_layout}>
                <AppMenu />
                {children}
            </main>
        </TanstackProvider>
    )
}