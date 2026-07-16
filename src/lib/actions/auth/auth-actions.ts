"use server";

import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/bcrypt";
import { createSession, revokeSession, revokeAllSessions } from "@/lib/auth/session";
import { getSessionToken, getRefreshToken, clearAuthCookies } from "@/lib/auth/cookies";
import { rotateSession } from "@/lib/auth/session";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Inline rate-limit tracker (in-memory, suitable for single-instance; use Redis for multi-instance)
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();

function getIpAddress(): Promise<string | undefined> {
  return headers().then((h) => h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? undefined);
}

// ─── Login ────────────────────────────────────────────────────────────────────

export async function login(
  _prevState: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const ip = await getIpAddress();
  const key = `${email}:${ip ?? "unknown"}`;
  const attempt = loginAttempts.get(key) ?? { count: 0, lockedUntil: 0 };

  // Check lockout
  if (attempt.lockedUntil > Date.now()) {
    return { error: "Too many failed attempts. Please try again in 15 minutes." };
  }

  // Fetch user — always perform lookup to prevent timing attacks on non-existent emails
  const user = await prisma.user.findUnique({ where: { email } });

  const isValid =
    user !== null && (await comparePassword(password, user.password));

  if (!isValid) {
    attempt.count += 1;
    if (attempt.count >= 5) {
      attempt.lockedUntil = Date.now() + 15 * 60 * 1000;
    }
    loginAttempts.set(key, attempt);
    return { error: "Invalid email or password." };
  }

  // Reset attempt counter on success
  loginAttempts.delete(key);

  await createSession(user.id, ip);

  redirect("/admin");
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logout() {
  const token = await getSessionToken();
  if (token) {
    await revokeSession(token);
  }
  await clearAuthCookies();
  redirect("/login");
}

// ─── Force logout all devices ────────────────────────────────────────────────

export async function logoutAllDevices(userId: string) {
  await revokeAllSessions(userId);
  await clearAuthCookies();
  redirect("/login");
}

// ─── Silent token refresh ────────────────────────────────────────────────────

export async function refreshAuthSession(): Promise<boolean> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return false;

  const ip = await getIpAddress();
  return await rotateSession(refreshToken, ip);
}
