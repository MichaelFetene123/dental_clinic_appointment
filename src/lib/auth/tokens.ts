import { createHash, randomBytes } from "crypto";

/**
 * Generates a cryptographically secure opaque token (256-bit hex string).
 */
export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Hashes a token using SHA-256 for safe storage in the database.
 * Only the hash is stored; the raw token travels only over the wire.
 */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
