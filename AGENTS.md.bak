# Content Repurposing Tool — Project Rules

## Project overview

A full-stack AI web app that repurposes long-form content into platform-specific
social media posts. Users paste text, select platforms and tone, and GPT-4o
generates tailored output for each platform.

## Tech stack

- Framework: Next.js 14.2 (App Router, NOT Pages Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS 3.4
- Database + Auth: Supabase (@supabase/ssr for cookie-based auth)
- AI: OpenAI GPT-4o via openai npm package
- Package manager: npm

## Project conventions

### File structure rules

- All source files live inside app/, components/, lib/, or types/
- API routes live at app/api/[route]/route.ts
- Client components must have 'use client' as the very first line
- Server components never import from 'use client' files directly
- lib/supabase.ts exports two functions: createSupabaseBrowserClient and createSupabaseServerClient
- lib/openai.ts exports a single named const: openai

### TypeScript rules

- Never use `any` type
- Always type function return values explicitly
- All DB types come from types/index.ts — never inline them

### Supabase rules

- Always use createSupabaseServerClient() in Server Components and API routes
- Always use createSupabaseBrowserClient() in Client Components
- createSupabaseServerClient is async — always await it
- Never expose SUPABASE_SERVICE_ROLE_KEY to the client

### API route rules

- Every API route must check auth first and return 401 if no session
- Return JSON with { error: string } shape on all error responses
- Return JSON with { data: ... } shape on all success responses
- Wrap all logic in try/catch

### Tailwind rules

- No custom CSS files beyond globals.css
- No inline style= attributes unless absolutely necessary
- Use neutral-_ scale for grays, violet-_ for brand color

### Code quality rules

- No commented-out code
- No console.log in production code (use console.error for caught errors only)
- One component per file
- No default exports from lib/ files — named exports only

## Environment variables

These exist in .env.local (never commit this file):

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- OPENAI_API_KEY

## How to run

- Dev server: npm run dev
- Build check: npm run build
- Lint: npm run lint

## What NOT to do

- Do not use the Pages Router — App Router only
- Do not install extra UI libraries (no shadcn, no Radix, no MUI)
- Do not use Prisma — use Supabase client directly
- Do not create .js files — TypeScript only (.ts / .tsx)
- Do not use fetch() to call internal API routes from Server Components — use Supabase directly
- Do not generate multiple files in one response — one file per task
