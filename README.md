# Dental Clinic Appointment System

A comprehensive, modern full-stack web application built to manage a dental clinic's administrative tasks, patient records, and appointment scheduling.

## 🏗️ Architecture & Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Supabase with PgBouncer connection pooling)
- **ORM**: Prisma
- **State Management**: TanStack Query (React Query)
- **UI/Styling**: Tailwind CSS, shadcn/ui, Radix UI primitives
- **Data Fetching**: Server Actions & API Routes

## 📁 Project Structure

The project strictly follows the Next.js App Router architecture:

- `src/app/` - Application routes organized by domain (`(public)`, `admin`, `portal`, `api`).
- `src/components/` - Reusable UI components grouped by feature area (`admin`, `portal`, `ui`, `skeleton`).
- `src/lib/` - Core business logic, Prisma client, Server Actions, queries, and authentication utilities.
- `src/hooks/` - Custom React hooks and TanStack Query wrappers.
- `prisma/` - Database schema, connection config, and migration files.

## 🗄️ Database Schema & Relationships

The database is built on PostgreSQL via Prisma. Key entities and structural decisions include:

- **`User` vs. `Patient`**: 
  - `User` represents the authentication identity (Staff, Admins, Doctors, Portal Users).
  - `Patient` represents the core medical entity (health records, demographics, vitals, history).
  - A `Patient` can exist independently without a `User` account (e.g., walk-ins). If portal access is granted, a `User` account is uniquely linked to the `Patient` via `userId`.
- **`Appointment`**: Linked exclusively to a `Patient` and optionally assigned to a `User` (Doctor).
- **`DentalHistory` & `MedicalDocument`**: Tied directly to the `Patient` to maintain a unified, longitudinal medical record.
- **RBAC (`Role`, `Permission`, `UserRole`, `RolePermission`)**: Supports a granular, permission-based Role-Based Access Control model.
- **`Session`**: Tracks active authenticated sessions and refresh token families.

### Connection Pooling
The application utilizes connection pooling via **PgBouncer** (provided by Supabase) to handle high concurrency efficiently. Prisma connects to the pool rather than opening direct individual database connections, ensuring stable performance during traffic spikes.

## 🔐 Authentication & Session Management

The system implements a highly secure, custom dual-token architecture (Access + Refresh tokens) utilizing `HttpOnly` cookies.

### Session Rotation & Grace Period
- **Short-Lived Access Tokens**: Valid for 15 minutes.
- **Refresh Token Rotation**: Refresh tokens are rotated dynamically. When a refresh occurs, new tokens are issued.
- **Grace-Period Handling**: To prevent race conditions from concurrent requests (e.g., multiple tabs reloading simultaneously), the system maintains a **15-second grace period**. The `Session` model stores `previousTokenHash` and `previousTokenExpiresAt`, allowing parallel requests using just-rotated tokens to resolve successfully without forcing a logout or triggering a reuse attack.
- **Reuse Detection**: If a previously used refresh token is detected outside the grace period, it triggers an immediate revocation of the entire token family (`familyId`).

## 🛡️ Permission-Based RBAC (Role-Based Access Control)

Access control operates on a granular **Resource:Action** model (e.g., `patient.read`, `appointment.edit`) rather than broad roles.

- **Server-Side Authorization**: Every protected Server Action invokes `requirePermission(action)`, evaluating the user's cached permission set natively stored in the `Session` model.
- **Redirect-Based Protection**: Page layouts and routes use `redirectIfMissingPermission(action, fallbackRoute)` to seamlessly reroute unauthorized users away from restricted views.
- **Super Admins**: Users flagged as `isSuperAdmin` automatically bypass all permission checks.

## ⚡ Data Fetching, State Management & Caching

The system employs a hybrid caching strategy bridging Next.js Server Cache and TanStack Query.

- **Server Actions (Data Layer)**: All database operations strictly go through Server Actions.
- **TanStack Query (Client Layer)**: Read queries are wrapped in TanStack Query hooks. 
- **Query Key & Cache Tag Invalidation**: 
  - After a successful Server Action mutation, the action invalidates the Next.js cache using `revalidateTag('tag-name')` (or `revalidatePath`).
  - On the client side, success callbacks trigger `queryClient.invalidateQueries({ queryKey: [...] })` to instantly synchronize the UI.
  - This ensures instantaneous perceived performance with guaranteed fresh server data.

## ⏳ Loading Strategy (Suspense & Skeletons)

To provide a snappy, premium user experience, the application utilizes a **Component-Level Loading Strategy**:
- Next.js `loading.tsx` and React `<Suspense>` boundaries are used extensively.
- Component-specific **Skeleton loaders** (`src/components/skeleton/...`) act as placeholders for asynchronous data fetching, preventing layout shift and ensuring the UI feels responsive even on slower network connections.

## 📝 Audit Logging & Retention

To meet security and compliance standards, the application implements a structured audit logging system.
- **`AuditLog` Model**: Records critical actions (`CREATE`, `UPDATE`, `DELETE`, `LOGIN`), the affected resource, resource ID, the user's ID, and IP address.
- **Archiving Strategy**: To prevent the main `AuditLog` table from bloating and degrading query performance, older logs are periodically migrated to an `AuditLogArchive` table for long-term retention.
