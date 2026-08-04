# Sacrament Meeting Planner

Next.js App Router planner for viewing and managing sacrament meeting programs.

## Environment Setup

Copy values from [.env.example](.env.example) into your local [.env.local](.env.local) (already gitignored).

Required auth variables:

- `AUTH_SECRET`
- `AUTH_OWNER_EMAIL`
- Either `AUTH_OWNER_PASSWORD` (simple string, easiest for Vercel) or `AUTH_OWNER_PASSWORD_HASH` (bcrypt hash)
- Optional: `AUTH_OWNER_NAME`

Important for local `.env.local`:

- If you use `AUTH_OWNER_PASSWORD_HASH`, escape each `$` as `\$` in local `.env.local` to prevent Next.js env expansion from corrupting the bcrypt hash.
- Example format: `AUTH_OWNER_PASSWORD_HASH=\$2b\$10\$...`
- For Vercel, set the same variables in Project Settings > Environment Variables. No escaping is needed there.

Vercel production checklist:

- Set `DATABASE_URL`
- Set `AUTH_SECRET`
- Set `AUTH_OWNER_EMAIL`
- Set `AUTH_OWNER_PASSWORD=admin123` (or another password)
- Set `NEXT_PUBLIC_SITE_URL=https://your-app-name.vercel.app`

Default local owner test account configured in this workspace:

- Email: `owner@example.com`
- Password: `admin123`

## Run Locally

```bash
npm install
npm run dev
```

## Authentication Coverage

- Login page: `/login`
- Sign-out action/button in the header
- Protected routes (middleware):
	- `/meetings/new`
	- `/meetings/[id]/edit`
- Server-side authorization checks also run inside create, update, and delete server actions.

## Metadata Coverage

- Site-level metadata is defined in [app/layout.tsx](app/layout.tsx).
- Route metadata is defined in:
	- [app/(public)/meetings/page.tsx](app/(public)/meetings/page.tsx)
	- [app/(public)/meetings/[id]/page.tsx](app/(public)/meetings/[id]/page.tsx) via `generateMetadata`
	- [app/login/page.tsx](app/login/page.tsx)
- Open Graph image is provided via file-based metadata at [app/opengraph-image.jpg](app/opengraph-image.jpg).

## Quick Checks

```bash
npm run lint
npm run build
```

Manual verification checklist:

1. Open `/meetings/new` while logged out and confirm redirect to `/login`.
2. Login with owner credentials and verify access to `/meetings/new` and `/meetings/[id]/edit`.
3. Click `Sign Out` and verify protected pages redirect to login again.
4. Inspect page source for title and description meta tags on `/`, `/meetings`, and `/meetings/[id]`.
