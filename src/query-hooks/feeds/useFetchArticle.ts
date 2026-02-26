"use client";

import {
  FeedDataResponseInf,
  ParsedFeedDataInf,
  TransformedArticleDataInf,
} from "@/app/_types/feed-types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface IUseFetchFeedData {
  feedId: string;
  articleGuid: string;
}

export default function useFetchArticle({
  feedId,
  articleGuid,
}: IUseFetchFeedData) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [
      "article-data",
      `feedId:${feedId}`,
      `articleGuid:${articleGuid}`,
    ],
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: async function () {
      const feedData = queryClient.getQueryData<FeedDataResponseInf>([
        "feed-data",
        feedId,
      ]);

      const cachedArticle = feedData?.items?.find(
        (item: ParsedFeedDataInf) => item.id === articleGuid,
      );
      const result = {
        ...cachedArticle,
        feedInfo: feedData?.feedInfo,
      };
      if (cachedArticle) return result as TransformedArticleDataInf;

      throw new Error(`Data not available`);
    },
  });
}
