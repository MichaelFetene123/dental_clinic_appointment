import { getSessionToken } from "./cookies";
import { validateSession } from "./session";

export type AuthSession = {
  userId: string;
  sessionId: string;
  isSuperAdmin: boolean;
  permissions: string[];
};

export class AuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AuthError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

/**
 * Validates the current session cookie.
 * Throws AuthError if unauthenticated.
 * Use this in every Server Action to ensure the caller is logged in.
 */
export async function requireAuth(): Promise<AuthSession> {
  const token = await getSessionToken();
  if (!token) throw new AuthError("No session token found");

  const session = await validateSession(token);
  if (!session) throw new AuthError("Session is expired or revoked");

  return session;
}

/**
 * Checks that the current session includes the specified permission.
 * Super Admins bypass all permission checks.
 * Throws ForbiddenError if the user lacks the required permission.
 *
 * @example
 *   const session = await requirePermission("patient.edit");
 */
export async function requirePermission(action: string): Promise<AuthSession> {
  const session = await requireAuth();

  if (session.isSuperAdmin) return session; // Super admin bypasses all checks

  if (!session.permissions.includes(action)) {
    throw new ForbiddenError(`Missing permission: ${action}`);
  }

  return session;
}

/**
 * Verifies that the resource being accessed belongs to the current user.
 * Use this for scope-limited roles (e.g. a Doctor can only update their own appointments).
 * Throws ForbiddenError if the resource does not belong to the session user.
 */
export function verifyScope(resourceOwnerId: string, session: AuthSession) {
  if (session.isSuperAdmin) return; // Super admin has no scope restriction
  if (resourceOwnerId !== session.userId) {
    throw new ForbiddenError("Access denied: resource out of scope");
  }
}
