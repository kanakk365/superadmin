import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = ["/login"];

// Define protected route prefixes
const protectedRoutePrefixes = [
  "/battle-lounge",
  "/ysn",
  "/overall",
  "/select-platform",
  "/connected-athlete",
  "/destination-kp",
  "/game-reel",
  "/google-analytics",
  "/orders",
  "/youtube-data",
];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Check if this is an SSO login attempt (has token parameter)
  const hasSsoToken = searchParams.has("token");

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );

  // Get the auth token from cookies or check localStorage via a cookie
  // Note: We use a cookie-based check for middleware since localStorage isn't available server-side
  const authStorage = request.cookies.get("auth-storage");

  let isAuthenticated = false;

  if (authStorage?.value) {
    try {
      const parsed = JSON.parse(decodeURIComponent(authStorage.value));
      isAuthenticated = parsed?.state?.isAuthenticated === true;
    } catch {
      isAuthenticated = false;
    }
  }

  // If trying to access a protected route without authentication, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated user tries to access login page WITHOUT SSO token, redirect to dashboard
  // But allow if there's an SSO token - let the page handle re-authentication
  if (
    isPublicRoute &&
    isAuthenticated &&
    pathname === "/login" &&
    !hasSsoToken
  ) {
    return NextResponse.redirect(new URL("/overall", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
