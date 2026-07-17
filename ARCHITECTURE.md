# Architecture — raksa

This project follows **Clean Architecture** (Robert C. Martin) and **SOLID** principles on a **Next.js 15 + Supabase** stack.

## Layer Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  Presentation (src/app, src/presentation)                   │
│  Next.js pages, API routes, React components, error mapping │
└───────────────────────────┬─────────────────────────────────┘
                            │ depends on
┌───────────────────────────▼─────────────────────────────────┐
│  Application (src/core/application)                         │
│  Use cases, DTOs, secondary ports (Auth, Clock, Hasher)     │
└───────────────────────────┬─────────────────────────────────┘
                            │ depends on
┌───────────────────────────▼─────────────────────────────────┐
│  Domain (src/core/domain)                                   │
│  Entities, value objects, domain errors, repository ports   │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ implements (Dependency Inversion)
┌───────────────────────────┴─────────────────────────────────┐
│  Infrastructure (src/infrastructure)                          │
│  Supabase repositories, auth adapter, security, mappers       │
└─────────────────────────────────────────────────────────────┘
```

**Dependency Rule:** source code dependencies point **inward**. Domain knows nothing about Next.js or Supabase.

## Directory Structure

```
src/
├── app/                    # Next.js App Router (thin controllers)
├── core/
│   ├── domain/             # Enterprise business rules
│   │   ├── entities/
│   │   ├── value-objects/
│   │   ├── enums/
│   │   ├── errors/
│   │   └── repositories/   # Port interfaces
│   └── application/        # Application business rules
│       ├── use-cases/
│       ├── dto/
│       └── ports/
├── infrastructure/         # Adapters (Supabase, crypto, auth)
├── presentation/           # UI components, HTTP helpers
└── shared/                 # DI container, config, utilities

supabase/migrations/        # PostgreSQL schema + RLS (future)
tests/
├── unit/                   # Domain & use-case tests
├── integration/            # Repository integration tests
└── e2e/                    # Playwright/Cypress (future)
```

## SOLID Mapping

| Principle | How we apply it |
|-----------|-----------------|
| **S** — Single Responsibility | Each use case handles one workflow; entities enforce their own invariants |
| **O** — Open/Closed | Extend via new use cases and repository implementations, not by modifying domain |
| **L** — Liskov Substitution | `WristbandRepository` can be swapped (Supabase, in-memory for tests) |
| **I** — Interface Segregation | Small repository ports per aggregate (`ScanLogRepository`, `ProfileRepository`, …) |
| **D** — Dependency Inversion | Use cases depend on port interfaces; `createAppContainer()` wires concrete adapters |

## Use Cases (Application Layer)

| Use Case | Responsibility |
|----------|----------------|
| `ClaimWristbandUseCase` | Validate activation code, assign owner |
| `ListFamilyWristbandsUseCase` | List tags for authenticated account holder |
| `GetPublicEmergencyPageUseCase` | Build public emergency view (no auth) |
| `RecordPublicScanUseCase` | Audit scan + optional owner notification |

## Request Flow Example — Public Emergency Page

```
GET /e/[token]
  → EmergencyPage (app router)
  → createAppContainer(supabase)
  → GetPublicEmergencyPageUseCase.execute(token)
  → WristbandRepository.findByPublicToken()
  → EmergencyProfileRepository + EmergencyContactRepository
  → EmergencyPageView (presentation)
```

## Adding a New Feature

1. **Domain** — entity/value object + repository port if needed
2. **Application** — use case + DTO
3. **Infrastructure** — Supabase repository + mapper
4. **DI** — register in `src/shared/di/container.ts`
5. **Presentation** — page or API route (thin — delegate to use case)
6. **Test** — unit test domain rules; integration test repository

## Conventions

- **Entities** are reconstituted from persistence (`reconstitute`), not constructed with invalid state in domain
- **Value objects** validate on creation (`EmergencyId.create()`)
- **Domain errors** map to HTTP in `presentation/http/error-mapper.ts`
- **No business logic** in React components or API route handlers
- **Mappers** live in infrastructure — domain never sees database row shapes

## References

- [Clean Architecture — Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- Product spec: `product.indonesia.md` / `product.english.md`
