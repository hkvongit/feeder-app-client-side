'use client'

import { API_BASE_URL, API_BEARER_TOKEN, API_PATHS, FEED_SOURCES_QUERY_KEY } from "@/constants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AddFeedRequestBody } from "@/app/_types/feed-types"

export default function useAddFeed() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: AddFeedRequestBody) => {
            const response = await fetch(`${API_BASE_URL}${API_PATHS.FEEDS}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_BEARER_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                const message =
                    typeof errorData?.message === "string"
                        ? errorData.message
                        : response.statusText || "Failed to add feed"
                throw new Error(message)
            }

            const text = await response.text()
            if (!text.trim()) return null
            try {
                return JSON.parse(text) as unknown
            } catch {
                return null
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FEED_SOURCES_QUERY_KEY })
        },
    })
}
