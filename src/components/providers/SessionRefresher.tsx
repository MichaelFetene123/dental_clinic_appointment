"use client";

import { useSessionRefresh } from "@/hooks/use-session-refresh";

/**
 * SessionRefresher
 *
 * A zero-render client component placed at the root of the admin layout.
 * It owns the useSessionRefresh hook, silently rotating the access token
 * in the background without causing any visible re-render or navigation.
 */
export function SessionRefresher() {
  useSessionRefresh();
  return null;
}
