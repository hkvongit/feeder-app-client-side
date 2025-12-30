'use client'

import { API_BASE_URL, API_BEARER_TOKEN, API_PATHS } from "@/constants"
import { useQuery } from "@tanstack/react-query"

export default function useGetFeedSources() {
    return useQuery({
        queryKey: ["feed-sources"],
        queryFn: async function () {
            const response = await fetch(`${API_BASE_URL}${API_PATHS.FEEDS}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${API_BEARER_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error(`Error fetching feeds: ${response.statusText}`)
            }
            return response.json()
        }
    })
}