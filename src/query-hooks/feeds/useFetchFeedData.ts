"use client";

import { FeedDataResponseInf } from "@/app/_types/feed-types";
import { API_BASE_URL, API_BEARER_TOKEN, API_PATHS } from "@/constants";
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
    queryFn: async function () {
      const response = await fetch(
        `${API_BASE_URL}${API_PATHS.FETCH_FEED_DATA}/${feedId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error fetching feeds: ${response.statusText}`);
      }
      return response.json() as Promise<FeedDataResponseInf>;
    },
  });
}
