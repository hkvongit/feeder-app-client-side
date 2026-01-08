import { ReactNode } from "react";

export default function FeedListPageLayout({
    children,
    articleslot
}: {
    children: ReactNode;
    articleslot: ReactNode
}) {
    return (
        <>
            {children}
            {/* Slot needs to be added in the render part in order for the parellel route to work. We intercept it in the same level to redirect it to the article page
            Docs: 1. https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes
            2. https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes
             */}
            {articleslot}
        </>
    )
}