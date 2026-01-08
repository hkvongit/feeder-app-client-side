'use client'


import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import { QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type ReactNode } from 'react'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // gc= Garbage collection, higher than the default if you want long-term persistence
            gcTime: 1000 * 60 * 60 * 24 // 24 hours
        }
    }
})

// Tanstack query persister using localStorage
// doc: https://tanstack.com/query/v4/docs/framework/react/plugins/persistQueryClient
const persister = createAsyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
})

export default function TanstackProvider({ children }: { children: ReactNode }) {


    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </PersistQueryClientProvider>
    )
}