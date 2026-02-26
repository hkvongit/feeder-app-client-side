"use client";

import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode } from "react";
import { SessionExpiredError } from "@/lib/api-client";
import { clearToken } from "@/lib/token-storage";
import { notifySessionExpired } from "@/lib/session-expiry-notifier";

function handleSessionExpired(error: unknown): void {
  if (error instanceof SessionExpiredError) {
    clearToken();
    notifySessionExpired(error.message);
  }
}

const queryClient = new QueryClient({
  // docs on QueryCache: https://tanstack.com/query/latest/docs/reference/QueryCache
  queryCache: new QueryCache({ onError: handleSessionExpired }),
  //Docs on MutationCache: https://tanstack.com/query/v5/docs/reference/MutationCache
  mutationCache: new MutationCache({ onError: handleSessionExpired }),
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

// Tanstack query persister using localStorage
// doc: https://tanstack.com/query/v4/docs/framework/react/plugins/persistQueryClient
const persister = createAsyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

export default function TanstackProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
