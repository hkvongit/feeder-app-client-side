"use client";

import { FeedDataResponseInf } from "@/app/_types/feed-types";
import { API_PATHS } from "@/constants";
import { apiRequest } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

interface IUseFetchFeedData {
  feedId: string;
}

export default function useFetchFeedData({ feedId }: IUseFetchFeedData) {
  return useQuery({
    queryKey: ["feed-data", feedId],
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: () =>
      apiRequest<FeedDataResponseInf>(
        `${API_PATHS.FETCH_FEED_DATA}/${feedId}`
      ),
  });
}
