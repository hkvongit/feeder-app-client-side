'use client'

import { ReactNode, useEffect, useRef, useState } from "react"
import styles from './FeedGrid.module.css'

interface IFeedGrid {
    children: ReactNode;
    header: ReactNode;
}
export default function FeedGrid({ children, header }: IFeedGrid) {

    const [isStuck, setIsStuck] = useState(false)
    const sentinelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the sentinel is NOT intersecting, it's above the viewport
                setIsStuck(!entry.isIntersecting)
            },
            { threshold: [0] }
        )

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div className={styles.main_container}>
            <div className={styles.top_occupier}>
                <div className={styles.top_right_portion} />
                <div className={styles.top_left_portion} />
            </div>
            <div className={`${styles.header} ${isStuck ? styles.header_stuck : ""}`}>
                {header}
                <div className={styles.search_container}></div>
            </div>
            <div className={styles.left_section}>
                {children}
                <div className={styles.suggestions_container}></div>
            </div>
        </div>
    )
}