'use client'

import { API_BASE_URL, API_BEARER_TOKEN, API_PATHS, FEED_SOURCES_QUERY_KEY } from "@/constants"
import { useQuery } from "@tanstack/react-query"

export default function useGetFeedSources() {
    return useQuery({
        queryKey: FEED_SOURCES_QUERY_KEY,
        queryFn: async function () {
            const response = await fetch(`${API_BASE_URL}${API_PATHS.FEEDS}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${API_BEARER_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error(response.statusText || "Failed to load feeds")
            }
            return response.json()
        }
    })
}