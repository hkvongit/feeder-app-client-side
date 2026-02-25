'use client'

import { API_PATHS, FEED_SOURCES_QUERY_KEY } from "@/constants"
import { apiRequest } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"

export default function useGetFeedSources() {
    return useQuery({
        queryKey: FEED_SOURCES_QUERY_KEY,
        queryFn: () => apiRequest(API_PATHS.FEEDS),
    })
}