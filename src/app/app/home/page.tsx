'use client'

import useGetFeedSources from "@/query-hooks/feeds/useGetFeedSources";
import styles from "./home-page.module.css"
import MainContainerHeader from "@/app/_components/MainContainerHeader/MainContainerHeader";
import { getDomainFromUrl } from "@/helpers/url-helpers";
import { getFeedSourceInitials } from "@/helpers/string-helpers";
import FeedGrid from "@/app/_components/FeedGrid/FeedGrid";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function FeedsPage() {
    const urlPathName = usePathname()

    const { data: feedSources, isLoading, isError, error } = useGetFeedSources()


    if (isLoading) {
        return <div>Loading feed sources ...</div>
    }

    if (isError) {
        return <div>Error occured</div>
    }

    if (!feedSources || feedSources.feeds.length === 0) {
        return <div className="p-4">No feed sources found.</div>;
    }

    return (
        <FeedGrid header={<MainContainerHeader header="Feed sources" count={feedSources.count}><div></div></MainContainerHeader>} >

            <div className={styles.feed_list}>
                {feedSources.feeds.map((feedSource: any) => {
                    const domainUrl = getDomainFromUrl(feedSource.url)
                    return (
                        <Link href={`${urlPathName}/${feedSource.id}`} prefetch={false} key={feedSource.id}>
                            <div className={styles.feedSource}>
                                {feedSource.favicon ? <img className={styles.feed_source_img} src={feedSource.favicon} alt={`${feedSource.title}-icon`} /> : <div className={styles.feed_source_icon}>{getFeedSourceInitials(feedSource.title)}</div>}
                                <h2 className={styles.title}>{feedSource.title}</h2>
                                <dd className={styles.description}>{feedSource.description}</dd>
                                <span className={styles.rss_link} href={`https://${domainUrl}`} target="_blank">{domainUrl} </span>
                            </div>
                        </Link>
                    )
                })}
                <p className="no_data_message">No more data available</p>
            </div>

        </FeedGrid>
    )
}