# raksa

<p align="center">
  <img src="docs/raksa-hero.png" alt="raksa — emergency band for family safety" width="800" />
</p>

<p align="center">
  <em>by Taufiq Hidayah · Muh. Alfian Lolo P</em>
</p>

NFC/QR emergency identification band. Anyone nearby can tap, scan, or look up an Emergency ID to see critical information and call family — no login required.

One account manages multiple bands: yourself, a child, or an elderly parent.

---

## Key features

| Mode | Scenario | Public page priority |
|------|----------|----------------------|
| **Adult emergency** (`adult_emergency`) | Unconscious / unable to communicate | Medical info + emergency contacts |
| **Child guardian** (`child_guardian`) | Child separated in a crowded place | Call parent / guardian |
| **Elderly dependent** (`elderly_dependent`) | Confused, lost, or living with dementia | Call family + medical context |

**Public access (no login):** NFC · QR · manual Emergency ID lookup

**Owner dashboard:** claim a band, set up a profile, manage the family, review scan history, disable a band

---

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Backend | Supabase (PostgreSQL, Auth, RLS) |
| Validation | Zod |
| Tests | Vitest |
| Architecture | Clean Architecture + SOLID — see [ARCHITECTURE.md](./ARCHITECTURE.md) |

**Node.js** ≥ 20

---

## Quick start

### 1. Clone & install

```bash
git clone <repo-url>
cd RAKSA
npm install
```

### 2. Environment

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key (safe for the client) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (**server only**) |
| `NEXT_PUBLIC_APP_URL` | App URL, e.g. `http://localhost:3000` |
| `SUPERADMIN_USER_ID` | Superadmin user UUID (optional) |
| `SUPERADMIN_DISPLAY_NAME` | Display name in the admin dashboard (optional) |

### 3. Database

Apply migrations with the [Supabase CLI](https://supabase.com/docs/guides/cli):

```bash
supabase db push
```

Migrations live in `supabase/migrations/`:

- `00001_initial_schema` — core schema
- `00002_rls_policies` — Row Level Security
- `00003_add_device_type` — device type (bracelet / necklace / keychain)

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Run production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest) |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:coverage` | Coverage report |

---

## Project structure

```
src/
├── app/                    # Next.js App Router (thin controllers)
│   ├── (marketing)/        # Landing page
│   ├── (public)/           # Public emergency page + lookup
│   ├── (auth)/             # Login & setup
│   ├── (dashboard)/        # Family dashboard
│   ├── (admin)/            # Superadmin panel
│   └── api/                # API routes
├── core/
│   ├── domain/             # Entities, value objects, ports, errors
│   └── application/        # Use cases & DTOs
├── infrastructure/         # Supabase adapters, auth, mappers
├── presentation/           # UI components & HTTP helpers
└── shared/                 # DI container, config, utilities

supabase/migrations/        # PostgreSQL + RLS
tests/
├── unit/
├── integration/
└── e2e/
```

**Dependency rule:** dependencies point inward. The domain does not know about Next.js or Supabase.

---

## Quick flow

```
Tap NFC / Scan QR / Lookup Emergency ID
        │
        ▼
  Public emergency page  (/[emergencyId] or /lookup)
        │
        ├── Minimum info for the band’s mode
        ├── Call / WhatsApp buttons
        └── Log the scan (+ notify the owner for dependents)
```

Account holder: **Login** → **Claim** (Activation Code) → **Profile setup** → band active on the dashboard.

---

## Documentation

| Document | Contents |
|----------|----------|
| [product.indonesia.md](./product.indonesia.md) | Product specification (ID) |
| [product.english.md](./product.english.md) | Product specification (EN) |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Clean Architecture, SOLID, use cases |

---

## License

Private — competition prototype.
