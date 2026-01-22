WellStack Client Control Tower (internal) — Next.js (App Router) + TypeScript + Tailwind + Supabase.

## Getting Started

1) Create an env file:

```bash
cp .env.example .env.local
```

Fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional (scaffolding): set `NEXT_PUBLIC_DEV_ROLE` to `Admin`, `Standard`, or `ExecViewer`.

2) Install deps and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docs

- Technical plan + folder structure: `docs/technical-plan.md`

