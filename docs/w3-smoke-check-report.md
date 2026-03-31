# W3-14 Smoke Check Report

Date: 2026-03-31
Workspace: TechInnovators

## Scope
- Auth flow
- Product detail routing
- Profile/dashboard route protection
- Core routing behavior

## Environment
- OS: Windows
- Package manager: pnpm
- Build target tested: production build and dev server probes
- Limitation: database connection unavailable (Prisma `ECONNREFUSED`)

## Command Checks

### 1) Install dependencies
Command:
- `pnpm install`

Result:
- PASS

### 2) Type check
Command:
- `pnpm exec tsc --noEmit`

Result:
- PASS

### 3) Production build
Command:
- `pnpm build`

Result:
- PASS

Notes:
- Build completed successfully and includes the new `/unauthorized` route.

### 4) Seed execution
Command:
- `pnpm seed`

Result:
- BLOCKED

Observed error:
- Prisma request fails with `ECONNREFUSED` during seed delete/create operations.

Impact:
- Realistic sample data cannot be validated end-to-end until DB connectivity is restored.

## Runtime Route Probes

Server:
- `pnpm dev -- -p 3101`

Probe command:
- PowerShell `Invoke-WebRequest` (no redirect follow) for:
  - `/`
  - `/auth/login`
  - `/profile`
  - `/dashboard`
  - `/product/nonexistent-id`
  - `/unauthorized`

Observed outcomes:
- `/auth/login` -> 200
- `/profile` -> 307 to `/auth/login?callbackUrl=/profile`
- `/dashboard` -> 307 to `/auth/login?callbackUrl=/dashboard`
- `/unauthorized` -> 307 to `/auth/login` (expected for unauthenticated access)
- `/` -> 500 due Prisma `ECONNREFUSED`
- `/product/nonexistent-id` -> request rendered but server logs show Prisma `ECONNREFUSED` before not-found path can be validated

## Issues Logged

### Critical
1. DB connectivity failure prevents data-backed flow validation
- Evidence: Prisma `ECONNREFUSED` in home/product routes and seed script.
- Affected flows: product listing/detail, review paths, seed validation.
- Status: Open

### Medium
2. Production server without auth env secret fails NextAuth configuration
- Evidence: `NO_SECRET` when running `pnpm start` without `NEXTAUTH_SECRET`.
- Affected flows: production smoke checks for auth-protected paths.
- Status: Open (environment configuration)

## W3-12 Verification Notes
- Seller-only dashboard guard implemented server-side.
- Authenticated non-seller users are redirected to dedicated `/unauthorized` page with clear message and safe navigation options.
- Unauthenticated access to dashboard still redirects to login with callback URL.

## W3-05 Verification Notes
- Schema already includes `User`, `Product`, `Category`, `Review`, and `SellerProfile` with expected relationships/constraints.
- Seed script exists and is configured in scripts; Prisma seed config added in package metadata.
- Full seed-data verification remains blocked by DB connectivity.

## Regression Confidence
- Compile/build confidence: High (type-check + build pass)
- Runtime confidence for protected routing: Medium (redirect checks pass)
- Runtime confidence for data-backed flows: Low until DB connectivity is fixed and seed runs successfully
