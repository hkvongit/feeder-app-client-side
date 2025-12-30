import { ReactNode } from "react";
import styles from "./MainContainerHeader.module.css"


interface MainContainerHeaderProps {
    children: ReactNode;
    header: string;
    count?: number;
}
export default function MainContainerHeader({ children, header, count }: MainContainerHeaderProps) {
    return (
        <div className={styles.main_container_header}>
            <h1 className={styles.main_container_header_label}>{header}</h1>
            {count ? <label className={styles.main_container_count}>{count}</label> : null}
            {children}
        </div>
    )
}