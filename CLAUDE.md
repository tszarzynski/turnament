# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start all dev servers (web on :3000, Storybook on :9009)
pnpm test         # Run all tests across workspaces
pnpm lint         # Lint and auto-fix all packages via Biome
pnpm build        # Build all packages
pnpm serve        # Serve the built web app locally
pnpm deploy       # Build and deploy to GitHub Pages
```

Per-package commands (run from package dir or with `--filter`):
```bash
pnpm --filter turnament-web test:watch       # Vitest in watch mode
pnpm --filter turnament-components plop      # Generate new component via PLOP template
pnpm --filter turnament-web build:native     # Build with base=/ for Capacitor
```

## Monorepo Structure

pnpm workspaces with Turbo as the task runner. Five packages:

- **`turnament-scheduler`** — pure pairing engine, no sport or scoring knowledge. Implements four tournament formats via a `Scheduler` interface.
- **`turnament-ranking`** — ranking logic and scoring rules. Owns tiebreakers (OMV, Buchholz Cut-1, NPS), sport-aware sort orders, match completion logic, and score encoding. Depends on `turnament-scheduler` types.
- **`turnament-components`** — shared React component library with Storybook. Uses PLOP for code generation. Browser-based component tests via Vitest + Playwright.
- **`turnament-web`** — React 19 SPA (Vite). Consumes all packages above. Contains only UI and state management — no domain logic.
- **`turnament-native`** — Capacitor wrapper for iOS/Android. Built from `turnament-web` with `build:native`.

Shared dependency versions are pinned in `pnpm-workspace.yaml` catalog (React 19, Vite 6, Vitest 3, TypeScript 5.8, Tailwind 4, Biome 1.9).

## Architecture

## Tournament Logic Documentation

**Always refer to `docs/tournament-logic.md` when discussing or modifying tournament pairing, ranking, tiebreakers, scoring rules, or match completion logic.** It contains the authoritative description of all algorithms, formulas, sport-specific rules, and the rationale behind design decisions.

## Architecture

### Scheduler (`turnament-scheduler`)

The `Scheduler` interface (`src/types.ts`) requires `makeRound`, `roundsNeeded`, and `type`. Four implementations live under `src/tournament/`: `swiss/`, `roundrobin/`, `elimination/`, `amalfi/`. Swiss pairing uses the `edmonds-blossom` algorithm. `Eliminator` is a secondary interface for formats that eliminate players between rounds. The scheduler is sport-agnostic — it knows nothing about backgammon or chess.

### Ranking (`turnament-ranking`)

Owns all sport-aware logic: tiebreaker calculations (`omv.ts`, `buchholz.ts`, `nps.ts`), sport-specific ranking sort orders (`rank.ts`), and scoring rules (`scoring.ts` — match completion, scoring divisor, default configs). Imports `Player`, `Match`, `PlayerWithResults` from the scheduler; adds `PlayerWithStats` and `SportType`.

### State Management (`turnament-web`)

Zustand store with `immer` + `persist` (localStorage key: `"turnament-store"`). The store is composed from two slices: `PlayersSlice` and `RoundsSlice`, found in `src/features/players/` and `src/features/round/`. `createSelectors` wraps the store to generate per-key hooks (e.g. `store.use.players()`).

### Routing (`turnament-web`)

`type-route` with five routes: `home → type → players → rounds → ranking`. The base path is `/turnament` for web and empty for Capacitor (detected via `import.meta.env.BASE_URL`). Page components live in `src/features/{players,round,ranking,type}/`.

### Component Library (`turnament-components`)

Components are developed in Storybook. Use `pnpm plop` inside the package to scaffold new components from a template. Components export from `src/index.ts`; Tailwind CSS is exported as a separate entrypoint (`turnament-components/tailwind.css`).
