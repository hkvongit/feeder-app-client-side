'use client'

import useGetFeedSources from "@/query-hooks/feeds/useGetFeedSources";
import styles from "./home-page.module.css"
import MainContainerHeader from "@/app/_components/MainContainerHeader/MainContainerHeader";
import { getDomainFromUrl } from "@/helpers/url-helpers";
import { getFeedSourceInitials } from "@/helpers/string-helpers";



export default function FeedsPage() {
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


    return <div className={styles.main_container}>
        <div className={styles.top_occupier}>
            <div className={styles.top_right_portion} />
            <div className={styles.top_left_portion} />
        </div>
        <div className={styles.header}>
            <MainContainerHeader header="Feed sources" count={feedSources.count}><div></div></MainContainerHeader>
            <div className={styles.search_container}></div>
        </div>
        <div className={styles.left_section}>
            <div className={styles.feed_list}>
                {feedSources.feeds.map((feedSource: any) => {
                    const domainUrl = getDomainFromUrl(feedSource.url)
                    return (
                        <div className={styles.feedSource} key={feedSource.id}>
                            {feedSource.favicon ? <img className={styles.feed_source_img} src={feedSource.favicon} alt={`${feedSource.title}-icon`} /> : <div className={styles.feed_source_icon}>{getFeedSourceInitials(feedSource.title)}</div>}
                            <h2 className={styles.title}>{feedSource.title}</h2>
                            <dd className={styles.description}>{feedSource.description}</dd>
                            <a className={styles.rss_link} href={`https://${domainUrl}`} target="_blank">{domainUrl} </a>
                        </div>
                    )
                })}
                <p className="no_data_message">No more data available</p>
            </div>
            <div className={styles.suggestions_container}></div>
        </div>
    </div>
}