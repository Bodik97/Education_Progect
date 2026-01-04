# Education LMS (Next.js App Router)

A simple, kid-friendly LMS MVP built with Next.js App Router. Students log in, view courses, read lessons, and submit homework in text form. Authentication stays lightweight and uses a free key-value database (Upstash/Vercel KV) when configured, with a safe in-memory fallback for local sandboxes.

## Local development
1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Quality checks
- Lint: `npm run lint`
- Production build (matches Vercel deploy step): `npm run build`

## Free database (Upstash / Vercel KV)
- Create a free Upstash Redis database (available directly inside the Vercel dashboard or at [upstash.com](https://upstash.com)).
- Copy the REST URL and token, then set these environment variables:
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
- Without these keys the app falls back to an in-memory store so it remains runnable locally, but data will reset on refresh.

## Vercel deployment
This project is ready for zero-config deployment on Vercel. Two common options:

### Deploy via Vercel dashboard (no CLI)
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework is auto-detected as **Next.js**. Keep defaults: Node 18+, build command `npm run build`, output `.next`.
4. Add the environment variables `KV_REST_API_URL` and `KV_REST_API_TOKEN` for the free database (optional locally but required for persistent data online).
5. Click **Deploy**. After the first build, Vercel will set up preview deployments for every branch and production deploys on your main branch.

### Deploy via Vercel CLI
1. Install the CLI: `npm i -g vercel`
2. Log in: `vercel login`
3. From the project root, run: `vercel` (creates a preview)
4. Promote to production when ready: `vercel --prod`

### Notes
- The included `vercel.json` pins the framework to Next.js and uses the standard `npm run build` step used by Vercel.
- If you change package managers, update the build command in `vercel.json` to match.
