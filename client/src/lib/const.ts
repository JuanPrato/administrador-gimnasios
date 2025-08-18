export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/",
} as const;

export const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export const SERVER_ROUTES = {
  PLAN: {
    LIST: "/plans",
    STATS: "/plans/stats",
  } as const,
} as const;
