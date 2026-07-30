# Dental Clinic Appointment System

A comprehensive, modern full-stack web application built to manage a dental clinic's administrative tasks, patient records, and appointment scheduling.

## 🏗️ Architecture & Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **State Management**: TanStack Query (React Query)
- **UI/Styling**: Tailwind CSS, shadcn/ui, Radix UI primitives
- **Data Fetching**: Server Actions & API Routes

## 📁 Project Structure

The project strictly follows the Next.js App Router architecture:

- `src/app/` - Application routes (grouped into `(public)`, `admin`, `portal`, `api`)
- `src/components/` - Reusable UI components (organized by domain: `admin`, `portal`, `ui`)
- `src/lib/` - Core business logic, Prisma client, server actions, authentication utilities
- `src/hooks/` - Custom React hooks and TanStack Query wrappers
- `prisma/` - Database schema and migration files

## 🗄️ Database Schema & Relationships

The database is built on PostgreSQL via Prisma. The core entities include:

- **`User`**: Represents anyone who logs into the system (Staff, Admins, Doctors, Portal Users).
- **`Patient`**: The central medical record. A Patient can exist *without* a User account (e.g., if they are manually added by a receptionist).
- **`Appointment`**: Linked to a `Patient` and optionally assigned to a `User` (Doctor).
- **`Session`**: Tracks active authenticated sessions.
- **`Role` & `Permission`**: Manages RBAC.

### Key Architectural Decision: The User-Patient Relationship
A critical design decision is the separation of **Users** and **Patients**:
- The `Patient` model represents the clinical entity (health records, demographics, history).
- The `User` model represents the authentication entity.
- **Portal Accounts**: If a patient wishes to log in, a `User` account is created and uniquely linked to their `Patient` record via `userId`. This allows the system to seamlessly track medical records whether the patient books as a guest, is added by an admin, or uses the authenticated portal.

## 🔐 Authentication & RBAC

The system utilizes a highly secure, custom dual-token architecture (Access + Refresh tokens) stored in `HttpOnly` cookies.

- **Short-Lived Access Tokens**: Valid for 15 minutes to minimize exposure.
- **Silent Refresh**: A client-side hook (`useSessionRefresh`) silently requests a new token pair in the background every 12 minutes to keep active users logged in without interruption.
- **Strict Inactivity**: If a user is inactive for 15 minutes across all browser tabs (monitored via DOM events and `localStorage`), the system triggers a hard logout and revokes the session in the database.
- **RBAC (Role-Based Access Control)**: Users are assigned `Roles` (e.g., Admin, Receptionist, Patient) containing specific `Permissions`. Middleware and Server Actions strictly guard routes and data mutations based on these cached permissions.

## 📅 Appointment Workflow & Deduplication

The system handles appointments through a bifurcated approach to prevent duplicate patient records:

### 1. Authenticated Portal Booking
Portal users book directly through their dashboard. The system inherently knows their identity via the `patientId` attached to their user session, guaranteeing 1:1 data integrity without requiring them to re-enter demographic details.

### 2. Public Guest Booking
Guests book anonymously on the public-facing site. The `createGuestAppointment` Server Action intercepts the request and runs a structured, 3-tier fallback matching system to safely identify existing patients:
1. **Email Match** (High Confidence)
2. **Phone Match** (High Confidence)
3. **Fuzzy Name Match** (Fallback)

If a match is found, the appointment is attached to the existing `Patient` record. If no match is found, a new `Patient` is created (defaulting the gender to `UNKNOWN` until the profile is completed).

## ⚡ Data Fetching, Caching & State Management

The application employs a hybrid caching strategy, leveraging both Next.js Server Cache and TanStack Query client-side state.

### Server Actions (Data Layer)
- **Mutations**: All database writes (create, update, delete) are handled strictly through Next.js Server Actions.
- **Invalidation**: Upon successful mutation, Server Actions call `updateTag("tag-name")` to instantly purge the Next.js server-side cache.

### TanStack Query (Client Layer)
- **Hooks**: Server Action read queries are wrapped in TanStack Query hooks (e.g., `usePatients`, `usePortalAppointments`).
- **Synchronization**: TanStack Query acts as the client-side state manager, handling background refetching and caching (`staleTime: 5 minutes`).
- **Optimistic Updates & Refresh**: After a client-side mutation succeeds, the component immediately triggers `queryClient.invalidateQueries()`, ensuring the UI perfectly reflects the backend state without a hard page reload.

By combining Next.js `cacheTag` invalidation with React Query's real-time client state, the application achieves instantaneous perceived performance while ensuring the server always serves the freshest data.
