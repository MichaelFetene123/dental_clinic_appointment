# Dental Clinic Appointment System

## Authentication & Session Lifecycle

This document outlines the authentication architecture, token lifecycle, and session management flow used in this application. It is designed to provide high security (short-lived access tokens, strict inactivity termination) without compromising on a seamless user experience (silent token rotation).

### 1. Token Architecture
The system relies on a dual-token (Access + Refresh) structure stored securely via `HttpOnly` cookies:
- **Access Token (`session`)**: Extremely short-lived (15 minutes). Acts as the primary credential for backend operations. 
- **Refresh Token (`refresh`)**: Longer-lived (7 days). Used exclusively to mint new access tokens silently in the background.

### 2. Login Flow
When a user successfully authenticates (`/api/auth/login` or server action):
1. The server generates a unique `familyId`, a new access token, and a new refresh token.
2. The tokens are hashed (SHA-256) before being stored in the database.
3. The raw tokens are sent to the client as secure, `HttpOnly` cookies.
4. User permissions are computed and cached within the session record.

### 3. Silent Token Refresh & Rotation
To prevent the user from being logged out every 15 minutes, the system utilizes a background silent refresh mechanism:
- **Client Hook (`useSessionRefresh`)**: Runs silently in the global layout (`SessionRefresher`).
- **Interval**: Every 12 minutes (safely before the 15-minute access token expiry), the client triggers a `POST` request to `/api/auth/refresh`.
- **Rotation**: The server verifies the `HttpOnly` refresh cookie. If valid, it immediately invalidates the old token pair and issues a **brand new** access and refresh token. 
- **Security (Reuse Detection)**: If an old, already-used refresh token is presented, the system detects a "Refresh Token Reuse Attack" and immediately revokes the **entire token family** (forcing a logout across all devices).

### 4. Strict Inactivity Control
For heightened security (critical for clinical/admin environments), sessions must not remain active indefinitely if the user walks away from the device.
- **Activity Tracking**: The client monitors standard interaction events (`mousemove`, `keydown`, `scroll`, `click`, `touchstart`).
- **Cross-Tab Synchronization**: Activity timestamps are stored in `localStorage` (throttled to update every 2 seconds). This ensures that activity in one tab keeps the session alive in all open tabs.
- **15-Minute Timeout Limit**: A dedicated idle checker runs every 30 seconds.
- **Session Expiration**: If exactly 15 minutes elapse with **zero** tracked activity across all tabs:
  - The client instantly triggers a hard logout.
  - The database actively revokes both the access and refresh tokens.
  - Cookies are cleared.
  - The user is redirected to the `/login` screen.
  - **Note**: The token refresh cycle is completely halted if the user is considered idle. A stale session will never be artificially kept alive.

### 5. Manual Logout
When a user clicks "Log Out" (or is forced out by the inactivity timer):
1. The `logout()` server action is invoked.
2. The current session record is marked as `revokedAt = now()` in the database.
3. The `HttpOnly` cookies are destroyed (`maxAge=0`).
4. Re-authentication (entering credentials) is strictly required to generate a new session family.
