# RAKSA-TAG (GelangSiaga)

Emergency identification system built around NFC/QR wristbands — adult medical emergencies, lost-child reunification, and elderly cognitive safety.

## Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Backend:** Supabase (PostgreSQL, Auth, RLS)
- **Architecture:** Clean Architecture + SOLID — see [ARCHITECTURE.md](./ARCHITECTURE.md)

## Quick Start

```bash
cp .env.example .env.local
# Fill in Supabase credentials

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest) |

## Database

Apply migrations with Supabase CLI:

```bash
supabase db push
```

Schema: `supabase/migrations/00001_initial_schema.sql`

## Project Layout

```
src/core/domain          → entities, value objects, ports
src/core/application     → use cases, DTOs
src/infrastructure       → Supabase adapters
src/presentation         → UI components
src/app                  → Next.js routes (thin controllers)
```

## Documentation

- [Product spec (ID)](./product.indonesia.md)
- [Product spec (EN)](./product.english.md)
- [Architecture guide](./ARCHITECTURE.md)

## License

Private — competition prototype.
