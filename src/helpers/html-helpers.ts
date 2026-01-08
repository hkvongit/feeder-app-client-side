export const stripHtml = (html: string): string => {
    if (typeof window === 'undefined') return html; // Safety check for SSR
    // 1. Parse the string as HTML
    const doc = new DOMParser().parseFromString(html, 'text/html')
    // 2. Extract text content (this removes tags and decodes entities)
    return doc.body.textContent || "";
}