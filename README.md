# MAAC campaign landing

Next.js landing page with lead capture stored in MongoDB and a hidden admin dashboard.

## Getting Started

1. Copy env values:

```bash
cp .env.example .env.local
```

2. Set `MONGODB_URI`, `ADMIN_ID`, `ADMIN_PASSWORD`, and `SESSION_SECRET` in `.env.local`.

3. Run the app:

```bash
pnpm install
pnpm dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin login (not linked from the public UI): [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Default local admin credentials are in `.env.local` (`ADMIN_ID` / `ADMIN_PASSWORD`). Change them before production.
