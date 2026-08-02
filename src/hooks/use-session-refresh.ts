"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth/auth-actions";

const IDLE_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
const REFRESH_INTERVAL_MS = 12 * 60 * 1000; // 12 minutes
const ACTIVITY_STORAGE_KEY = "lastActivity";

/**
 * useSessionRefresh
 *
 * Enforces strict session inactivity control and automatic token refresh.
 * - Tracks user activity across tabs using localStorage.
 * - If the user is inactive for > 15 minutes, automatically revokes the session and logs them out.
 * - If the user remains active, silently refreshes the access token every 12 minutes.
 */
export function useSessionRefresh() {
  const router = useRouter();
  const refreshTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idleCheckTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Safely get last activity from localStorage
  const getLastActivity = () => {
    const val = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    return val ? parseInt(val, 10) : Date.now();
  };

let refreshPromise: Promise<void> | null = null;

  const attemptRefresh = async () => {
    const inactiveDuration = Date.now() - getLastActivity();

    // Do not refresh if they are already considered idle (let the idle checker handle logout)
    if (inactiveDuration >= IDLE_TIMEOUT_MS) return;

    if (refreshPromise) {
      console.log(`[AUTH DEBUG] [${new Date().toISOString()}] attemptRefresh(): Already in-flight, waiting for existing request.`);
      return refreshPromise;
    }

    refreshPromise = (async () => {
      try {
        console.log(`[AUTH DEBUG] [${new Date().toISOString()}] attemptRefresh(): Calling /api/auth/refresh`);
        const res = await fetch("/api/auth/refresh", { method: "POST" });
        if (res.ok) {
          console.log(`[AUTH DEBUG] [${new Date().toISOString()}] attemptRefresh(): Success`);
          localStorage.setItem("lastRefresh", Date.now().toString());
        } else if (res.status === 401 || res.status === 403) {
          console.log(`[AUTH DEBUG] [${new Date().toISOString()}] attemptRefresh(): Auth failed with status ${res.status}, redirecting to /login`);
          // Refresh token is gone/expired/revoked → force re-login
          router.push("/login");
        } else {
          console.log(`[AUTH DEBUG] [${new Date().toISOString()}] attemptRefresh(): Transient server error ${res.status}, ignoring and retrying next interval`);
          // Server error (e.g. 500 connection timeout). Do not force logout.
        }
      } catch {
        console.log(`[AUTH DEBUG] [${new Date().toISOString()}] attemptRefresh(): Network error`);
        // Network error – stay quiet and retry at the next interval
      } finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  };

  const checkIdleStatus = async () => {
    const inactiveDuration = Date.now() - getLastActivity();

    if (inactiveDuration >= IDLE_TIMEOUT_MS) {
      // User has been inactive for >= 15 mins.
      // Force logout: revokes tokens in DB, clears cookies, redirects to login.
      try {
        console.log(`[AUTH DEBUG] [${new Date().toISOString()}] checkIdleStatus(): User idle, forcing logout`);
        await logout();
      } catch (e) {
        // Next.js redirect() throws an error. Catch it to prevent console noise.
        if (e && typeof e === 'object' && 'digest' in e && (e as any).digest?.startsWith('NEXT_REDIRECT')) {
             throw e; // Let Next.js handle its own redirect
        }
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    console.log(`[AUTH DEBUG] [${new Date().toISOString()}] useSessionRefresh() mounted`);
    // Initialize activity tracker
    localStorage.setItem(ACTIVITY_STORAGE_KEY, Date.now().toString());

    let throttleTimeout: ReturnType<typeof setTimeout> | null = null;
    const updateActivity = () => {
      if (throttleTimeout) return;
      
      // Throttle localStorage updates to once every 2 seconds
      throttleTimeout = setTimeout(() => {
        localStorage.setItem(ACTIVITY_STORAGE_KEY, Date.now().toString());
        throttleTimeout = null;
      }, 2000);
    };

    // Track standard user interactions
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((evt) => window.addEventListener(evt, updateActivity, { passive: true }));

    // Manage initial refresh - fire immediately to test grace period
    attemptRefresh();

    // Setup intervals
    refreshTimerRef.current = setInterval(attemptRefresh, REFRESH_INTERVAL_MS);
    idleCheckTimerRef.current = setInterval(checkIdleStatus, 30000); // Check idle status every 30 seconds

    // When the user returns to a hidden tab, check idle status and refresh if still active
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkIdleStatus().then(() => {
           const inactiveDuration = Date.now() - getLastActivity();
           if (inactiveDuration < IDLE_TIMEOUT_MS) {
             console.log(`[AUTH DEBUG] [${new Date().toISOString()}] Visibility changed to visible. Firing attemptRefresh().`);
             attemptRefresh();
           }
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      console.log(`[AUTH DEBUG] [${new Date().toISOString()}] useSessionRefresh() unmounted`);
      if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
      if (idleCheckTimerRef.current) clearInterval(idleCheckTimerRef.current);
      if (throttleTimeout) clearTimeout(throttleTimeout);
      
      events.forEach((evt) => window.removeEventListener(evt, updateActivity));
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
