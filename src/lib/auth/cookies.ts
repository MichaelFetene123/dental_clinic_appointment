import { cookies } from "next/headers";

const isProd = process.env.NODE_ENV === "production";
const SESSION_COOKIE = isProd ? "__Host-session" : "session";
const REFRESH_COOKIE = isProd ? "__Host-refresh" : "refresh";

const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

const SESSION_MAX_AGE = 60 * 15; // 15 minutes
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * Sets both the session token and refresh token as HttpOnly secure cookies.
 */
export async function setAuthCookies(sessionToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, sessionToken, {
    ...BASE_COOKIE_OPTIONS,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
  });

  cookieStore.set(REFRESH_COOKIE, refreshToken, {
    ...BASE_COOKIE_OPTIONS,
    sameSite: "strict",
    maxAge: REFRESH_MAX_AGE,
  });
}

/**
 * Reads the raw session token from the cookie jar.
 */
export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

/**
 * Reads the raw refresh token from the cookie jar.
 */
export async function getRefreshToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_COOKIE)?.value;
}

/**
 * Clears both auth cookies (used on logout).
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
}
