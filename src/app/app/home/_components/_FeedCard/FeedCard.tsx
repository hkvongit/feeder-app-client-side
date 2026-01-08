'use client'
import feedSourceStyle from '@/app/app/home/home-page.module.css'

interface FeedCardProps {
    title: string
}
export default function FeedCard({ title }: FeedCardProps) {
    return (
        <div>
            <p className={feedSourceStyle.title} >{title}</p>
        </div>
    )
}