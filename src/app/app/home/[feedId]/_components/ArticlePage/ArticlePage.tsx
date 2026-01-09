'use client'

import styles from './ArticlePage.module.css'
import useFetchArticle from '@/query-hooks/feeds/useFetchArticle'
import ArticleContent from '@/app/_components/ArticleContent/ArticleContent'
import { convertUtcToAppStdDateFormat } from '@/helpers/datetime-helpers'

export default function ArticlePageComponent({
    articleId, feedId
}: { articleId: string, feedId: string }) {

    const { data: article, isLoading, isError } = useFetchArticle({
        feedId,
        articleGuid: decodeURIComponent(articleId)
    })

    if (isLoading) {
        return (
            <article className={styles.modal}>
                <p>Loading article...</p>
            </article>
        )
    }

    if (isError || !article) {
        return (
            <article className={styles.modal}>
                <p>Failed to load article details.</p>
            </article>
        )
    }

    return (
        <article className={styles.modal}>
            <h1 className={styles.title}>{article.title}</h1>
            <p>{article.feedInfo.title}</p>
            <time>{convertUtcToAppStdDateFormat(article.pubDate ?? "")}</time>
            <ArticleContent htmlContent={article.content} />
        </article>
    )
}
