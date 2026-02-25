/**
 * Lets the API layer (e.g. QueryClient onError) notify the app about session expiry
 * without depending on React. The SessionExpiryProvider registers a callback on mount.
 */

type Callback = (message: string) => void;

let callback: Callback | null = null;

export function setSessionExpiredCallback(cb: Callback | null): void {
  callback = cb;
}

export function notifySessionExpired(message: string): void {
  callback?.(message);
}
