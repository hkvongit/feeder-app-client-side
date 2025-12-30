export function getDomainFromUrl(url: string) {
    try {
        const urlObj = new URL(url)
        return urlObj.hostname;
    } catch (error) {
        console.error('Invalid URL:', error);
        return "#"
    }
}