import { NextRequest, NextResponse } from "next/server";

// The cookie name must match what is set in src/lib/auth/cookies.ts
const isProd = process.env.NODE_ENV === "production";
const SESSION_COOKIE = isProd ? "__Host-session" : "session";

// Route prefixes that require authentication.
const PROTECTED_ROUTES = ["/admin", "/portal", "/dashboard"];

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public pages stay accessible to everyone, including guests.
  // Only the restricted app surfaces below require a valid session cookie.
  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  // Allow Next.js internals and static assets.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;

  // No session cookie → redirect to login
  if (!sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Session cookie exists — let the Server Action / layout validate against the DB.
  // Fine-grained permission checks happen inside Server Actions via requirePermission().
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
