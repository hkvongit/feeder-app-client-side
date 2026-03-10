"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { XStack, YStack, Paragraph } from "tamagui";
import { AppTextInput } from "@/app/_components/AppTextInput/AppTextInput";
import { Button } from "@/app/_components/Button/Button";
import useChatHistory from "@/query-hooks/chat/useChatHistory";
import useSendChatMessage, {
  type SendChatMessageInput,
} from "@/query-hooks/chat/useSendChatMessage";

type ChatPanelProps = {
  articleGuid: string | null;
  url?: string | null;
  fallbackSnippet?: string | null;
};

export function ChatPanel({
  articleGuid,
  url,
  fallbackSnippet,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; created_at?: string }[]
  >([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    data: history,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useChatHistory({ articleGuid });

  const sendMutation = useSendChatMessage();

  // Initialize messages from history when it loads
  useEffect(() => {
    if (history?.messages) {
      setMessages(history.messages);
    }
  }, [history]);

  // Auto-scroll to bottom on messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const isSendDisabled = useMemo(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return true;
    if (!articleGuid) return true;
    if (!url || !fallbackSnippet) return true;
    if (sendMutation.isPending) return true;
    return false;
  }, [articleGuid, url, fallbackSnippet, inputValue, sendMutation.isPending]);

  const errorMessage = useMemo(() => {
    if (sendMutation.error instanceof Error) {
      return sendMutation.error.message;
    }
    if (isHistoryError) {
      return "Couldn't load chat history. You can still try asking a question.";
    }
    return null;
  }, [sendMutation.error, isHistoryError]);

  async function handleSend() {
    const trimmed = inputValue.trim();
    if (
      !trimmed ||
      isSendDisabled ||
      !articleGuid ||
      !url ||
      !fallbackSnippet
    ) {
      return;
    }

    const userMessage = {
      role: "user" as const,
      content: trimmed,
      created_at: new Date().toISOString(),
    };

    // Optimistically add user message
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    const payload: SendChatMessageInput = {
      articleGuid,
      url,
      message: trimmed,
      fallbackSnippet,
    };

    try {
      const response = await sendMutation.mutateAsync(payload);
      const assistantMessage = {
        role: "assistant" as const,
        content: response.answer,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      // On error, keep the text field empty but show error message
      // Messages already contain the user message; we keep it to show what was attempted.
    }
  }

  if (!articleGuid) {
    return null;
  }

  return (
    <YStack
      flex={1}
      height="100%"
      style={{
        padding: 16,
        minWidth: 320,
        maxWidth: 420,
      }}
      borderLeftWidth={1}
      borderColor="#e0e0e0"
      gap={12}
    >
      <Paragraph fontSize={16} fontWeight="700">
        Chat about this article
      </Paragraph>

      <YStack
        ref={scrollRef}
        flex={1}
        borderWidth={1}
        borderColor="#e0e0e0"
        borderRadius={8}
        padding={8}
        style={{
          overflow: "auto",
        }}
        backgroundColor="#fff"
      >
        {isHistoryLoading && messages.length === 0 ? (
          <Paragraph fontSize={14} color="#666">
            Loading chat...
          </Paragraph>
        ) : messages.length === 0 ? (
          <Paragraph fontSize={14} color="#666">
            No chat yet. Ask a question about this article.
          </Paragraph>
        ) : (
          messages.map((msg, index) => (
            <XStack
              key={index}
              style={{
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: 8,
              }}
            >
              <YStack
                style={{
                  maxWidth: "80%",
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: msg.role === "user" ? "#e0f2ff" : "#f3f3f3",
                }}
              >
                <Paragraph
                  fontSize={12}
                  style={{ marginBottom: 4 }}
                  color="#777"
                >
                  {msg.role === "user" ? "You" : "Assistant"}
                </Paragraph>
                <Paragraph fontSize={14} whiteSpace="pre-wrap">
                  {msg.content}
                </Paragraph>
              </YStack>
            </XStack>
          ))
        )}
      </YStack>

      {errorMessage && (
        <Paragraph fontSize={12} color="#c00">
          {errorMessage}
        </Paragraph>
      )}

      <XStack gap={8} style={{ alignItems: "center" }}>
        <AppTextInput
          flex={1}
          placeholder="Ask something about this article..."
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <Button
          type="button"
          variant="primary"
          disabled={isSendDisabled}
          onClick={handleSend}
        >
          {sendMutation.isPending ? "Sending..." : "Send"}
        </Button>
      </XStack>
    </YStack>
  );
}
