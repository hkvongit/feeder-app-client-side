"use client";

import { useState, useRef } from "react";
import useGetFeedSources from "@/query-hooks/feeds/useGetFeedSources";
import styles from "./home-page.module.css";
import MainContainerHeader from "@/app/_components/MainContainerHeader/MainContainerHeader";
import { getDomainFromUrl } from "@/helpers/url-helpers";
import { getFeedSourceInitials } from "@/helpers/string-helpers";
import FeedGrid from "@/app/_components/FeedGrid/FeedGrid";
import { Button } from "@/app/_components/Button/Button";
import Modal from "@/app/_components/Modal/Modal";
import AddFeedForm from "@/app/app/home/_components/AddFeedForm/AddFeedForm";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FeedDbInfoInf } from "@/app/_types/feed-types";

export default function FeedsPage() {
  const urlPathName = usePathname();
  const [isAddFeedModalOpen, setIsAddFeedModalOpen] = useState(false);
  const addFeedButtonRef = useRef<HTMLButtonElement>(null);

  const { data: feedSources, isLoading, isError } = useGetFeedSources();

  if (isLoading) {
    return <div>Loading feed sources ...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  const count = feedSources?.count ?? 0;
  const feeds = feedSources?.feeds ?? [];
  const hasFeeds = feeds.length > 0;

  return (
    <>
      <FeedGrid
        header={
          <MainContainerHeader header="Feed sources" count={count}>
            <div className={styles.header_actions}>
              <Button
                ref={addFeedButtonRef}
                variant="primary"
                onClick={() => setIsAddFeedModalOpen(true)}
              >
                Add feed
              </Button>
            </div>
          </MainContainerHeader>
        }
      >
        <div className={styles.feed_list}>
          {hasFeeds ? (
            <>
              {feeds.map((feedSource: FeedDbInfoInf) => {
                const domainUrl = getDomainFromUrl(feedSource.url);
                return (
                  <Link
                    href={`${urlPathName}/${feedSource.id}`}
                    prefetch={false}
                    key={feedSource.id}
                  >
                    <div className={styles.feedSource}>
                      {feedSource.favicon ? (
                        <img
                          className={styles.feed_source_img}
                          src={feedSource.favicon}
                          alt={`${feedSource.title}-icon`}
                        />
                      ) : (
                        <div className={styles.feed_source_icon}>
                          {getFeedSourceInitials(feedSource.title)}
                        </div>
                      )}
                      <h2 className={styles.title}>{feedSource.title}</h2>
                      <p className={styles.description}>
                        {feedSource.description}
                      </p>
                      <span className={styles.rss_link}>{domainUrl}</span>
                    </div>
                  </Link>
                );
              })}
              <p className="no_data_message">No more data available</p>
            </>
          ) : (
            <p className={styles.empty_state}>
              No feed sources yet. Click &quot;Add feed&quot; to add one.
            </p>
          )}
        </div>
      </FeedGrid>

      <Modal
        isOpen={isAddFeedModalOpen}
        onClose={() => setIsAddFeedModalOpen(false)}
        title="Add feed source"
        restoreFocusRef={addFeedButtonRef}
      >
        <AddFeedForm onSuccess={() => setIsAddFeedModalOpen(false)} />
      </Modal>
    </>
  );
}
