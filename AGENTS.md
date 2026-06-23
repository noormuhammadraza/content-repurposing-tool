# AGENTS.md - Content Repurposing Tool

## Project Overview
Next.js 14 (App Router) content repurposing tool with TypeScript, Tailwind CSS, and ESLint.

## Quick Start
```bash
npm install
npm run dev          # Dev server on http://localhost:3000
npm run build        # Production build
npm start            # Production server
```

## Commands
| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Start prod | `npm start` |
| Lint | `npm run lint` |
| Typecheck | `npx tsc --noEmit` |

## Architecture
- **Framework**: Next.js 14.2 (App Router, no Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3
- **Linting**: ESLint 8 + eslint-config-next
- **Package Manager**: npm (package-lock.json)

### Entry Points
- `app/layout.tsx` - Root layout (providers, metadata, fonts)
- `app/page.tsx` - Home page
- `app/globals.css` - Tailwind imports + global styles

### Key Directories
- `app/` - App Router pages/layouts (route segments = folders)
- `public/` - Static assets (served at `/`)
- `node_modules/` - Dependencies (gitignored)
- `.next/` - Build output (gitignored)

## Conventions
- **Path alias**: `@/*` maps to project root (e.g., `@/app`, `@/components`)
- **Components**: Place in `app/components/` or `components/` at root
- **Utilities**: Place in `lib/` or `utils/` at root
- **Commits**: Conventional commits (`feat:`, `fix:`, `chore:`)
- **Branches**: `feature/*`, `fix/*`, `chore/*`

## Testing
- Unit: Not configured yet (add Vitest/Jest + React Testing Library)
- E2E: Not configured yet (add Playwright/Cypress)
- Run: `npm test` (once configured)

## Environment
- No required env vars for basic dev
- Add `.env.local` for local secrets (gitignored)
- Use `process.env.VAR` in server components, `NEXT_PUBLIC_VAR` for client

## Gotchas
- **No src/ dir**: Imports use `@/app` not `@/src/app`
- **Turbopack disabled**: Uses webpack (`--no-turbopack` flag)
- **ESLint flat config**: Uses `.eslintrc.json` (legacy) not `eslint.config.mjs`
- **Fonts**: Uses `next/font` (Inter) in layout.tsx - self-hosted, no external requests
- **Images**: Use `next/image` component for optimization
- **Client components**: Add `'use client'` directive at top of file

## Verification
```bash
# Verify build works
npm run build

# Verify types
npx tsc --noEmit

# Verify lint
npm run lint
```