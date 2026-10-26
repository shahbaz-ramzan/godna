export const Routes = {
  DASHBOARD: "/",
  CONTACTS: "/contacts",
  MARKET_MOOD: "/market-mood",
  SETTINGS: "/settings",
  REPORT: "/report",
  STYLE_MATCH: "/style-match",
  SUBSCRIPTION: "/subscription",
  DISCOVERY: "/discovery",
  DNA_DISCOVERY: "/dna-discovery",
  SIGN_UP: "/signup",
  PARTICIPANT_FINANCIAL_REPORT: "/report/participant-financial-report",
  WORK_TALENTS_REPORT: "/report/work-talents-report",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_OF_SERVICE: "/terms-of-service",
  LOGIN: "/login",
  DISCOVERY_COMPLETED: "/discovery-completed",
  DISCOVERY_INSTRUCTION: "/discovery-instruction",
};

export const PUBLIC_ROUTES = [
  Routes.SIGN_UP,
  Routes.PRIVACY_POLICY,
  Routes.TERMS_OF_SERVICE,
  Routes.LOGIN,
];

export const PROTECTED_ROUTES = [
  Routes.DASHBOARD,
  Routes.CONTACTS,
  Routes.SETTINGS,
  Routes.REPORT,
  Routes.MARKET_MOOD,
  Routes.STYLE_MATCH,
  Routes.SUBSCRIPTION,
  Routes.DISCOVERY,
  Routes.DNA_DISCOVERY,
  Routes.DISCOVERY_COMPLETED,
  Routes.PARTICIPANT_FINANCIAL_REPORT,
  Routes.DISCOVERY_INSTRUCTION,
  Routes.WORK_TALENTS_REPORT,
];

export function normalizePathname(pathname: string): string {
  if (pathname.length <= 1) return pathname || "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function isProtectedRoute(pathname: string): boolean {
  const p = normalizePathname(pathname);
  return PROTECTED_ROUTES.some(
    (route) => p === route || (route !== "/" && p.startsWith(`${route}/`)),
  );
}

export function isPublicRoute(pathname: string): boolean {
  const p = normalizePathname(pathname);
  return PUBLIC_ROUTES.some(
    (route) => p === route || p.startsWith(`${route}/`),
  );
}
