# Content Repurposing Tool

Transform long-form content into platform-optimized social media posts using AI.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 3.4
- **Auth & Database**: Supabase (@supabase/ssr)
- **AI**: OpenAI GPT-4o-mini

## Features
- Paste any long-form content (article, blog post, transcript)
- Select target platforms: Twitter/X, LinkedIn, Email, Instagram, YouTube Shorts
- Choose tone: Professional, Casual, Witty
- GPT-4o-mini generates tailored output per platform
- View history of all repurposed content
- Copy individual platform outputs to clipboard

## Project Structure
```
app/              # Next.js App Router pages & API routes
components/       # React components (Navbar, ToneSelector, PlatformSelector, OutputCard)
lib/              # Supabase & OpenAI clients
types/            # TypeScript type definitions
supabase/         # Database migrations
```

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase project
- OpenAI API key

### Environment Variables
Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_SECRET_KEY=your_secret_key
OPENAI_API_KEY=your_openai_key
```

### Install & Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Deployment
- Deploys to Vercel with zero config
- Add environment variables in Vercel project settings
- Ensure Supabase auth redirect URLs include production domain

## Database
Run the migration in `supabase/migrations/001_initial_schema.sql` to create the `repurpose_jobs` table with RLS.