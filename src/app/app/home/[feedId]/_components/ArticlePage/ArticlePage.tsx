"use client";

import styles from "./ArticlePage.module.css";
import useFetchArticle from "@/query-hooks/feeds/useFetchArticle";
import ArticleContent from "@/app/_components/ArticleContent/ArticleContent";
import { convertUtcToAppStdDateFormat } from "@/helpers/datetime-helpers";
import { useEffect } from "react";
import {
  LinkIcon,
  MoveToExtLinkIcon,
  BookmarkIcon,
} from "@/app/_components/Icons";
import { Button } from "@/app/_components/Button/Button";
import { XStack, YStack } from "tamagui";
import { ChatPanel } from "@/app/_components/ChatPanel/ChatPanel";

export default function ArticlePageComponent({
  articleId,
  feedId,
}: {
  articleId: string;
  feedId: string;
}) {
  const {
    data: article,
    isLoading,
    isError,
  } = useFetchArticle({
    feedId,
    articleGuid: decodeURIComponent(articleId),
  });

  useEffect(() => {
    // Disable scroll on the body when this component is open
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    return () => {
      // Cleanup: re-enable scroll when this component is closed
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    };
  }, []);

  if (isLoading) {
    return (
      <article className={styles.modal}>
        <p>Loading article...</p>
      </article>
    );
  }

  if (isError || !article) {
    return (
      <article className={styles.modal}>
        <p>Failed to load article details.</p>
      </article>
    );
  }

  const articleGuidFromUrl = decodeURIComponent(articleId);

  return (
    <article className={styles.modal}>
      <header className={styles.header}>
        <p className={styles.feed_source}>{article.feedInfo.title}</p>
        <div className={styles.quicklinks_container}>
          <Button
            icon={<LinkIcon className={styles.quicklink_icon} />}
            aria-label="Copy Link"
            onClick={() => {
              if (article?.link) {
                navigator.clipboard.writeText(article.link);
              }
            }}
          />
          <Button
            icon={<BookmarkIcon className={styles.quicklink_icon} />}
            aria-label="Bookmark"
          />
          <Button
            icon={<MoveToExtLinkIcon className={styles.quicklink_icon} />}
            aria-label="Move to external link"
            onClick={() => {
              if (article?.link) {
                window.open(article.link, "_blank", "noopener,noreferrer");
              }
            }}
          />
        </div>
      </header>
      <XStack flex={1} gap={16} style={{ marginTop: 16 }}>
        <YStack flex={2}>
          <div className={styles.article_info}>
            <h1 className={styles.title}>{article.title}</h1>
            <time className={styles.published_date}>
              {convertUtcToAppStdDateFormat(article.pubDate ?? "")}
            </time>
          </div>
          <ArticleContent htmlContent={article.content} />
        </YStack>
        <ChatPanel
          articleGuid={articleGuidFromUrl}
          url={article.link}
          fallbackSnippet={article.summary}
        />
      </XStack>
    </article>
  );
}
