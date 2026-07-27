import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { rotateSession } from "@/lib/auth/session";

const isProd = process.env.NODE_ENV === "production";
const REFRESH_COOKIE = isProd ? "__Host-refresh" : "refresh";

/**
 * POST /api/auth/refresh
 *
 * Silent token refresh endpoint.
 * Reads the HttpOnly refresh cookie, calls rotateSession() which:
 *   - Issues a new access + refresh token pair (rotation)
 *   - Sets updated HttpOnly cookies via setAuthCookies()
 *   - Detects refresh token reuse attacks (revokes entire family)
 *
 * Returns:
 *   200 { ok: true }  – tokens rotated, new cookies set
 *   401 { ok: false } – refresh token missing, expired, or revoked → must re-login
 */
export async function POST() {
  const cookieStore = await cookies();
  const rawRefreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

  if (!rawRefreshToken) {
    return NextResponse.json({ ok: false, reason: "no_refresh_token" }, { status: 401 });
  }

  const rotated = await rotateSession(rawRefreshToken);

  if (!rotated) {
    return NextResponse.json({ ok: false, reason: "refresh_failed" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
