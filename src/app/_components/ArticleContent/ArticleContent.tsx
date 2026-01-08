'use client'

import DOMPurify from "dompurify"
import styles from './ArticleContent.module.css';

export default function ArticleContent({ htmlContent }: { htmlContent: string }) {
    const cleanHtml = DOMPurify.sanitize(htmlContent)

    return <div className={styles.content_wrapper} dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
}