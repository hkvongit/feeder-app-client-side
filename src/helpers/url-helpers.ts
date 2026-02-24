export function getDomainFromUrl(url: string) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    console.error("Invalid URL:", error);
    return "#";
  }
}

/** Returns true if the string is a valid http(s) URL. */
export function isValidFeedUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  try {
    const u = new URL(url.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
