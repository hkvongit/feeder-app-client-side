'use client'

import { stripHtml } from "@/helpers/html-helpers"
import useFetchFeedData from "@/query-hooks/feeds/useFetchFeedData"
import { use, useEffect } from "react"
import styles from './feedlistpage.module.css'
import { convertUtcToTimeDifferenceFromNow } from "@/helpers/datetime-helpers"
import FeedGrid from "@/app/_components/FeedGrid/FeedGrid"
import MainContainerHeader from "@/app/_components/MainContainerHeader/MainContainerHeader"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ParsedFeedDataInf } from "@/app/_types/feed-types"

// **Thing to implement**

export default function Feeds({ params }: {
    params: Promise<{ feedId: string }>
}) {
    const { feedId } = use(params)

    const urlPathName = usePathname()
    // fetch the data from the feed source:
    const { data: feedData, isLoading, isError, error } = useFetchFeedData({ feedId })


    if (isLoading) {
        return <div>Loading feed data ...</div>
    }

    if (isError) {
        return <div>Error occured</div>
    }

    if (!feedData || feedData.items.length === 0) {
        return <div className="p-4">No feed data found.</div>;
    }


    return (
        <FeedGrid header={<MainContainerHeader header={feedData?.feedInfo?.title ?? "Feed Name"} ><></></MainContainerHeader>}>
            <section className={styles.feed_data_list_section}>
                <ul className={styles.unordered_list_of_feeds}>
                    {feedData.items.map((item: ParsedFeedDataInf) => (
                        <li key={item.id} className={styles.feedDataListItem}>
                            <article className={styles.feed_item}>
                                <Link href={`${urlPathName}/article/${encodeURIComponent(item.id)}`} className={`${styles.feed_title}`}>{item.title}</Link>
                                {item.pubDate ? <time className={styles.time}>
                                    {convertUtcToTimeDifferenceFromNow(item.pubDate)} days ago
                                </time> : null}
                                {
                                    item.content?
                                        <p className={`${styles.desc}`}>{stripHtml(item.content)}</p>
                                        : null
                                }
                            </article>

                        </li>
                    ))}
                </ul>
                <p className="no_data_message">No more data available</p>
            </section>
        </FeedGrid>
    )
}