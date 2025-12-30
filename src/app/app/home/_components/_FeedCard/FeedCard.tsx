'use client'
import "./FeedCard.css"

interface FeedCardProps {
    title: string
}
export default function FeedCard({ title }: FeedCardProps) {
    return (
        <div>
            <p className="card" >{title}</p>
        </div>
    )
}