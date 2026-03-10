"use client";

import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-client";
import { API_PATHS } from "@/constants";

export type SendChatMessageInput = {
  articleGuid: string;
  url: string;
  message: string;
  fallbackSnippet: string;
};

export type SendChatMessageResponse = {
  chat_id: string;
  answer: string;
  role: "assistant";
};

export default function useSendChatMessage() {
  return useMutation({
    mutationFn: async (input: SendChatMessageInput) => {
      const { articleGuid, url, message, fallbackSnippet } = input;

      const data = await apiRequest<SendChatMessageResponse>(
        API_PATHS.AI_CHAT,
        {
          method: "POST",
          body: {
            article_guid: articleGuid,
            url,
            message,
            fallback_snippet: fallbackSnippet,
          },
        },
      );

      if (!data) {
        throw new Error("Empty response from chat API");
      }

      return data;
    },
  });
}
