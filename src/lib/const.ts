export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/",
} as const;

export const ROLES = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENTE",
};

export const PAGES = {
  dashboard: "/",
  clients: "/clientes",
  entries: "/entradas",
  plans: "/planes",
} as const;

export const PAGES_TITLES = {
  "/": "Dashboard Administrativo",
  "/clientes": "Gestión de clientes",
  "/entradas": "Dashboard de movimientos",
  "/planes": "Dashboard de planes",
} as const;
