import { NextRequest, NextResponse } from "next/server";
import { isProtectedRoute, isPublicRoute, Routes } from "./constants/routes";
import { validateToken } from "./lib/utils";

function redirectWithClearedToken(destinationUrl: URL) {
  const response = NextResponse.redirect(destinationUrl, { status: 307 });
  response.cookies.delete("token");
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value ?? "";
  const isTokenValid = validateToken(token);

  if (!isTokenValid && isProtectedRoute(pathname)) {
    const absoluteURL = new URL(Routes.LOGIN, request.nextUrl.origin);
    return redirectWithClearedToken(absoluteURL);
  }

  if (isTokenValid && isPublicRoute(pathname)) {
    const absoluteURL = new URL(Routes.DASHBOARD, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL, { status: 307 });
  }

  const response = NextResponse.next();
  if (isProtectedRoute(pathname)) {
    response.headers.set("Cache-Control", "no-store, private");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - invalid-subdomain (error page)
     * - .swa (Azure Static Web Apps deployment health — must bypass middleware)
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|invalid-subdomain|\\.swa).*)",
  ],
};
