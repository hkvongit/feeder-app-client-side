/**
 * Token storage for auth. Uses localStorage so the token persists across
 * browser sessions. All calls are wrapped in try/catch in case localStorage
 * is unavailable (e.g. private browsing).
 */

const STORAGE_KEY = "session_token";

export function getToken(): string | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, token);
  } catch {
    // Ignore if localStorage is unavailable
  }
}

export function clearToken(): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore if localStorage is unavailable
  }
}
