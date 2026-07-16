import { prisma } from "@/lib/prisma";
import { generateToken, hashToken } from "./tokens";
import { setAuthCookies } from "./cookies";

const SESSION_TTL_MS = 15 * 60 * 1000; // 15 minutes
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Retrieves the flat list of permission IDs for a given user
 * by unioning all permissions across their assigned roles.
 */
async function computePermissions(userId: string): Promise<string[]> {
  const userRoles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        include: {
          permissions: {
            include: { permission: true },
          },
        },
      },
    },
  });

  const permissionSet = new Set<string>();
  for (const userRole of userRoles) {
    for (const rp of userRole.role.permissions) {
      permissionSet.add(rp.permission.id);
    }
  }

  return Array.from(permissionSet);
}

/**
 * Creates a new session for a user after successful login.
 * Computes permissions, stores hashed tokens, and sets cookies.
 */
export async function createSession(userId: string, ipAddress?: string) {
  const sessionToken = generateToken();
  const refreshToken = generateToken();
  const familyId = generateToken(); // Stable ID for this token family

  const permissions = await computePermissions(userId);

  await prisma.session.create({
    data: {
      userId,
      familyId,
      tokenHash: hashToken(sessionToken),
      refreshHash: hashToken(refreshToken),
      tokenExpiresAt: new Date(Date.now() + SESSION_TTL_MS),
      refreshExpiresAt: new Date(Date.now() + REFRESH_TTL_MS),
      permissionsJson: JSON.stringify(permissions),
      ipAddress: ipAddress ?? null,
    },
  });

  await setAuthCookies(sessionToken, refreshToken);
}

/**
 * Validates an incoming session token against the database.
 * Returns the session and permissions if valid, or null if expired/revoked.
 * Slides the session expiry on each valid request.
 */
export async function validateSession(rawToken: string): Promise<{
  userId: string;
  sessionId: string;
  isSuperAdmin: boolean;
  permissions: string[];
} | null> {
  const tokenHash = hashToken(rawToken);

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (
    !session ||
    session.revokedAt !== null ||
    session.tokenExpiresAt < new Date()
  ) {
    return null;
  }

  // Slide the session expiry
  await prisma.session.update({
    where: { id: session.id },
    data: { tokenExpiresAt: new Date(Date.now() + SESSION_TTL_MS) },
  });

  return {
    userId: session.userId,
    sessionId: session.id,
    isSuperAdmin: session.user.isSuperAdmin,
    permissions: JSON.parse(session.permissionsJson) as string[],
  };
}

/**
 * Handles refresh token rotation.
 *
 * Security model:
 *  - If the incoming token matches the CURRENT refreshHash → rotate (happy path).
 *  - If the incoming token matches previousRefreshHash → REUSE ATTACK.
 *    Revoke the entire token family immediately.
 *  - Otherwise → unknown token, deny.
 */
export async function rotateSession(rawRefreshToken: string, ipAddress?: string): Promise<boolean> {
  const incomingHash = hashToken(rawRefreshToken);

  // Check for current active refresh token
  const session = await prisma.session.findFirst({
    where: {
      refreshHash: incomingHash,
      revokedAt: null,
    },
    include: { user: true },
  });

  if (session) {
    if (session.refreshExpiresAt < new Date()) {
      // Absolute expiry reached
      await prisma.session.update({
        where: { id: session.id },
        data: { revokedAt: new Date() },
      });
      return false;
    }

    // Happy path: rotate
    const newSessionToken = generateToken();
    const newRefreshToken = generateToken();
    const permissions = await computePermissions(session.userId);

    await prisma.session.update({
      where: { id: session.id },
      data: {
        previousRefreshHash: session.refreshHash,
        tokenHash: hashToken(newSessionToken),
        refreshHash: hashToken(newRefreshToken),
        tokenExpiresAt: new Date(Date.now() + SESSION_TTL_MS),
        rotationCount: { increment: 1 },
        permissionsJson: JSON.stringify(permissions), // Re-compute on rotation
        ipAddress: ipAddress ?? session.ipAddress,
      },
    });

    await setAuthCookies(newSessionToken, newRefreshToken);
    return true;
  }

  // Check if the token matches a RETIRED (rotated-away) refresh hash → REUSE ATTACK
  const compromisedSession = await prisma.session.findFirst({
    where: { previousRefreshHash: incomingHash },
  });

  if (compromisedSession) {
    // Revoke the ENTIRE token family
    await prisma.session.updateMany({
      where: {
        familyId: compromisedSession.familyId,
        revokedAt: null,
      },
      data: { revokedAt: new Date() },
    });
    console.warn(`[SECURITY] Refresh token reuse detected. Family ${compromisedSession.familyId} revoked.`);
  }

  return false;
}

/**
 * Revokes a single session by its session token hash.
 */
export async function revokeSession(rawToken: string) {
  const tokenHash = hashToken(rawToken);
  await prisma.session.updateMany({
    where: { tokenHash, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

/**
 * Revokes ALL active sessions for a user (global logout / force-kick).
 */
export async function revokeAllSessions(userId: string) {
  await prisma.session.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}
