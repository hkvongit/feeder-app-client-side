export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_PATHS = {
  FEEDS: "/feed",
  FETCH_FEED_DATA: "/feed-data",
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
  AI_CHAT: "/chats",
  AI_CHAT_HISTORY: "/chats/history",
};

/** React Query key for feed sources list (GET /feed). */
export const FEED_SOURCES_QUERY_KEY = ["feed-sources"] as const;

// UI specifics
export const BRAND = {
  APP_NAME: "Focus feeds",
  TAGLINE: "Get a life from doom scrolling",
};

export const CLIENT_SIDE_ROUTES = {
  HOME: "/app/home",
  LOGIN: "/app/login",
  REGISTER: "/app/register",
  FAV_SOURCES: "/app/favorites",
  SAVED_FEEDS: "/app/saved-feeds",
  TAGS: "/app/tags",
};
