## Chat with article – integration plan

### Short summary

- **History API**: `POST /chats/history` with `article_guid`.
- **Chat API**: `POST /chats` with `article_guid`, `url`, `message`, `fallback_snippet`.
- **Identifiers**:
  - `article_guid` = `decodeURIComponent(articleId)` (URL param).
  - `url` = `article.link`.
  - `fallback_snippet` = `article.summary`.

## Diagram 1 – Page load and chat history fetch

```mermaid
sequenceDiagram
    participant U as User
    participant AP as ArticlePageComponent
    participant CH as ChatPanel (new)
    participant API as Chats API

    U->>AP: Open article (feedId, articleId)
    AP->>AP: useFetchArticle({ feedId, articleGuid })
    AP-->>U: Show "Loading article..."

    AP->>AP: Article loaded successfully
    AP-->>U: Render article content
    AP->>CH: Mount ChatPanel with articleGuid (from URL param) and url (from article.link)

    Note over AP,CH: articleGuid is ready from URL param immediately. url and fallbackSnippet arrive after article fetch.
    alt article_guid available (always from URL param)
        CH->>API: POST /chats/history
        Note over CH,API: Body: { article_guid }
        CH-->>U: Show "Loading chat..."

        alt History found
            API-->>CH: 200 OK + { chat_id, messages[] }
            CH->>CH: Store chat_id and messages
            CH-->>U: Render chat messages list
        else No history / empty messages
            API-->>CH: 200 OK + { chat_id?, messages: [] }
            CH->>CH: Store optional chat_id, empty messages
            CH-->>U: Show "No chat yet. Ask a question."
        end
    else Missing article_guid
        CH-->>U: Show "Chat unavailable for this article."
    end

    opt History fetch error
        API--xCH: Network / server error
        CH->>CH: Mark chat state = error
        CH-->>U: Show "Couldn't load chat history" (non-blocking)
    end
```

Key integration points in `ArticlePageComponent`:

- Pass `decodeURIComponent(articleId)` as `articleGuid` directly to `ChatPanel` — no need to wait for article fetch.
- Pass `article.link` as `url` and `article.summary` as `fallbackSnippet` once article data is available.
- Ensure layout can accommodate a scrollable chat area without breaking article scrolling.

---

## Diagram 2 – Initiate / continue chat from the article page

```mermaid
sequenceDiagram
    participant U as User
    participant CH as ChatPanel
    participant API as Chats API

    U-->>CH: Type message in input
    CH->>CH: Validate message (non-empty)

    alt Message is empty or whitespace
        CH-->>U: Do nothing (send disabled or ignored)
    else Valid message
        CH->>CH: Append temporary user message to local messages
        CH->>CH: Set state = SendingMessage
        CH-->>U: Disable send button, show "Sending..."

        CH->>API: POST /chats
        Note over CH,API: Body: { article_guid, url, message, fallback_snippet }

        API-->>CH: 200 OK + { chat_id, answer, role: "assistant" }
        CH->>CH: Update / store chat_id
        CH->>CH: Append assistant answer to messages
        CH->>CH: Set state = ShowingHistory
        CH-->>U: Re-enable send - scroll chat to latest message
    end
```

## Diagram 3 – Chat panel UI states

```mermaid
stateDiagram-v2
    [*] --> Hidden

    Hidden --> LoadingHistory: Article with chat loads and chat UI is opened
    Hidden --> Unavailable: article_guid or url missing

    LoadingHistory --> ShowingHistory: History loaded (may be empty)
    LoadingHistory --> Error: History fetch failed

    Unavailable --> [*]

    state ShowingHistory {
        [*] --> Idle
        Idle --> SendingMessage: User clicks "Send" with non-empty message
        SendingMessage --> Idle: Send success
        SendingMessage --> Error: Send failure
    }

    Error --> LoadingHistory: User retries loading history
    Error --> ShowingHistory: User retries send and succeeds
    ShowingHistory --> Hidden: User closes article or chat panel
```

## Diagram 4 – High-level component wiring on article page

```mermaid
flowchart LR
    AP[ArticlePageComponent -- existing] --> AH[Article header and meta]
    AP --> AC[ArticleContent -- existing]
    AP --> CP[ChatPanel new]

    subgraph AP_layout[Article page layout - Tamagui XStack]
        direction LR
        AC --- CP
    end

    CP --> CHS[useChatHistory hook - POST /chats/history]
    CP --> CHM[useSendChatMessage hook - POST /chats]

    CHS --> API1[(POST /chats/history)]
    CHM --> API2[(POST /chats)]
```


## Implementation checklist

- [x] **1. Article data wiring**
  - [x] Pass `decodeURIComponent(articleId)` as `articleGuid` to `ChatPanel` — available immediately, no article fetch needed.
  - [x] Pass `article.link` as `url` once article data is loaded.
  - [x] Pass `article.summary` as `fallbackSnippet` once article data is loaded.

- [x] **2. Layout**
  - [x] Update layout to show `ArticleContent` and `ChatPanel` side by side inside the article modal.
  - [x] Use [Tamagui](https://tamagui.dev) `XStack` / `YStack` primitives for the split view and chat panel internals.
  - [x] Ensure `ChatPanel` scroll is independent of the article scroll.

- [x] **3. ChatPanel component**
  - [x] Create `ChatPanel` UI container using Tamagui.
  - [x] Add scrollable messages list area.
  - [x] Add text input and send button.
  - [x] Disable send button when input is empty or whitespace-only.
  - [x] Disable send button until `url` and `fallbackSnippet` are available (article still loading).

- [x] **4. History fetch hook – `useChatHistory`**
  - [x] Implement `useChatHistory(articleGuid)` using `POST /chats/history` with JSON body `{ article_guid }`.
  - [x] Handle loading, success, and error states.
  - [x] Normalize response into `{ chatId, messages[] }` shape for the UI.

- [x] **5. Send message hook – `useSendChatMessage`**
  - [x] Implement `useSendChatMessage()` using `POST /chats`.
  - [x] Accept `{ articleGuid, url, message, fallbackSnippet }` as input.
  - [x] Return mutation state `{ isPending, error, mutateAsync }` for the UI to consume.

- [x] **6. ChatPanel behaviour**
  - [x] On mount, fire `useChatHistory` immediately using `articleGuid`.
  - [x] Show "Loading chat..." while history is fetching.
  - [x] Show empty state when history loads with no messages.
  - [x] Show non-blocking error when history fetch fails but keep input usable.
  - [x] On successful send, append user + assistant messages to local state and scroll to bottom.

- [x] **7. Edge cases**
  - [x] Hide or disable chat when `articleGuid` is missing.
  - [x] Ensure long messages wrap and chat area scrolls independently.
  - [x] Reset chat state when navigating to a different article. (Handled by `articleGuid` in query key.)
  - [x] Prevent multiple rapid sends while a request is in-flight.

- [x] **8. Basic UX polish**
  - [x] Keep user's message in the conversation if a send fails.
  - [x] Use concise inline error messages for history and send failures.
  - [x] Visually distinguish user vs assistant messages.
