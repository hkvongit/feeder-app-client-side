import { API_BASE_URL } from "@/constants";
import { getToken } from "@/lib/token-storage";

/** Thrown when the API returns 401 or a session-expired style message. */
export class SessionExpiredError extends Error {
  constructor(message: string = "Session expired. Please sign in again.") {
    super(message);
    this.name = "SessionExpiredError";
    Object.setPrototypeOf(this, SessionExpiredError.prototype);
  }
}

/** True if status is 401 or message suggests session/unauthorized. */
function isSessionExpiredResponse(status: number, message: string): boolean {
  if (status === 401) return true;
  const lower = message.toLowerCase();
  return lower.includes("session") || lower.includes("unauthorized");
}

export type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  /** When true, omit Authorization header (for login/register). */
  skipAuth?: boolean;
};

/**
 * Centralized API request: adds auth, handles errors, and throws
 * SessionExpiredError when the response indicates session expiry.
 * Use this in all query/mutation hooks so session handling is in one place.
 */
export async function apiRequest<T = unknown>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T | null> {
  const {
    method = "GET",
    body,
    headers: customHeaders = {},
    skipAuth,
  } = options;
  const url = `${API_BASE_URL}${path}`;
  const token = skipAuth ? null : getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };

  const response = await fetch(url, {
    method,
    headers,
    ...(body != null && { body: JSON.stringify(body) }),
  });

  const responseText = await response.text();
  const responseData = (() => {
    try {
      return responseText
        ? (JSON.parse(responseText) as { message?: string })
        : {};
    } catch {
      return {};
    }
  })();

  if (!response.ok) {
    const message =
      typeof responseData?.message === "string"
        ? responseData.message
        : response.statusText || "Request failed";
    if (isSessionExpiredResponse(response.status, message)) {
      throw new SessionExpiredError(message);
    }
    throw new Error(message);
  }

  if (!responseText.trim()) return null;
  try {
    return JSON.parse(responseText) as T;
  } catch {
    return responseText as unknown as T;
  }
}
