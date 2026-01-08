'use client'

import { use } from 'react'
import ArticlePageComponent from '../../_components/ArticlePage/ArticlePage'

export default function ArticlePage({
    params,
}: { params: Promise<{ articleId: string, feedId: string }> }) {

    const { articleId, feedId } = use(params)

    return (
        <ArticlePageComponent articleId={articleId} feedId={feedId} />
    )
}
