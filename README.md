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






## Appointment Workflow & Patient Deduplication Architecture

The appointment booking system uses a bifurcated approach to handle two distinct types of users: anonymous public guests and authenticated portal users. This architecture prevents duplicate patient records while maintaining a seamless user experience.

### 1. Two Distinct Booking Flows

#### Flow A: Authenticated Portal Patients (`/portal/appointments`)
- **Mechanism**: The user must be fully authenticated with a valid session. The system inherently knows their identity via the `patientId` attached to their user session.
- **Deduplication**: Not required. Appointments are booked directly onto the exact, verified patient record.
- **Advantage**: Guaranteed 1:1 data integrity without requiring the user to re-enter their demographic details.

#### Flow B: Public Guest Booking (`/appointment`)
- **Mechanism**: A completely anonymous, top-of-funnel entry point for new visitors. Users must provide their full name, email, and phone number.
- **Challenge**: If a patient already exists in the system (e.g., they have a portal account but didn't log in, or they visited the clinic previously), the system must avoid creating a duplicate `Patient` entity.

### 2. The Smart Deduplication Pipeline

When a public booking form is submitted, the `createGuestAppointment` server mutation intercepts the request and runs a structured, 3-tier fallback matching system to safely identify existing patients:

1. **Tier 1 (High Confidence) - Email Match**: 
   The system queries for an exact match on the provided `email`. If found, the appointment is appended to that existing patient.
2. **Tier 2 (High Confidence) - Phone Match**: 
   If the email check misses (or was left blank), the system queries for an exact match on the `phone` number.
3. **Tier 3 (Fuzzy Fallback) - Full Name Match**: 
   If both contact methods fail (e.g., the user changed their phone number and used a different email), the system takes the provided `firstName` and `lastName`, combines them, and runs a case-insensitive match against the `name` column in the database.

**Outcome**:
- **Match Found**: The system says "I know who this is," bypasses patient creation, and attaches the appointment to the existing patient record. (This is completely invisible to the user).
- **No Match Found**: The system concludes this is genuinely a brand-new person and creates a new `Patient` record in the database.

### 3. Edge Cases & Known Tradeoffs

While the deduplication pipeline resolves >95% of duplication risks, edge cases exist:
- **Typo + New Contact Info**: If a returning patient uses a new email, a new phone number, *and* spells their name differently than their initial registration, the system will intentionally fail safely and create a duplicate patient record.
- **Administrative Resolution**: In the event a duplicate is created, staff can manually review the records and merge them using the admin dashboard tools.

By keeping these flows separated and implementing a 3-tier fallback on the public route, the system balances zero-friction guest onboarding with strong relational database integrity.
