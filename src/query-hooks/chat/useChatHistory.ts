"use client";

import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-client";
import { API_PATHS } from "@/constants";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

export type ChatHistoryResponse = {
  chat_id: string;
  messages: ChatMessage[];
};

interface UseChatHistoryArgs {
  articleGuid: string | null;
}

export default function useChatHistory({ articleGuid }: UseChatHistoryArgs) {
  return useQuery({
    queryKey: ["chat-history", articleGuid],
    enabled: Boolean(articleGuid),
    queryFn: async () => {
      const data = await apiRequest<ChatHistoryResponse>(
        API_PATHS.AI_CHAT_HISTORY,
        {
          method: "POST",
          body: { article_guid: articleGuid },
        },
      );

      if (!data) {
        return {
          chat_id: "",
          messages: [] as ChatMessage[],
        };
      }

      return data;
    },
  });
}
