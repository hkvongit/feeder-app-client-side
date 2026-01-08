'use client'

import { API_BASE_URL, API_BEARER_TOKEN, API_PATHS } from "@/constants"
import { useQuery, useQueryClient } from "@tanstack/react-query"

interface IUseFetchFeedData {
    feedId: string,
    articleGuid: string
}

export default function useFetchArticle({ feedId, articleGuid }: IUseFetchFeedData) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["article-data", `feedId:${feedId}`, `articleGuid:${articleGuid}`],
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        queryFn: async function () {
            const feedData = queryClient.getQueryData<any>(['feed-data', feedId])
            console.log("computing...")
            const cachedArticle = feedData?.items?.find(
                (item: any) => item.guid === articleGuid
            )
            if (cachedArticle) return cachedArticle

            throw new Error(`Data not available`)
        }
    })
}