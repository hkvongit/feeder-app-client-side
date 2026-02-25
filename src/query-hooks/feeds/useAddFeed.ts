'use client'

import { API_PATHS, FEED_SOURCES_QUERY_KEY } from "@/constants"
import { apiRequest } from "@/lib/api-client"
import type { AddFeedRequestBody } from "@/app/_types/feed-types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useAddFeed() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: AddFeedRequestBody) =>
            apiRequest(API_PATHS.FEEDS, { method: "POST", body }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FEED_SOURCES_QUERY_KEY })
        },
    })
}
