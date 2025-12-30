'use client'
import { useEffect, useState } from 'react';
import Parser from 'rss-parser'
import FeedCard from './_components/_FeedCard/FeedCard';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
export default function FeedsPage() {
    const [data, setData] = useState<any>(null);

    const parser = new Parser();

    const fetchRssData = async () => {
        await parser.parseURL(CORS_PROXY + 'https://davidwalsh.name/feed', function (err, feed) {
            if (err) throw err;
            console.log(feed);
            setData(feed);
        })
    }
    useEffect(() => {
        fetchRssData();
    }, [])
    if (data && data.items.length > 0) {
        return <div>

            {data.items.map((item) => {
                return (<FeedCard title={item.title} key={item.guid} />)
            })}
        </div>
    }
    return <div>
        Empty data
    </div>;
}