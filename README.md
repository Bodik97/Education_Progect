# Education LMS (Next.js App Router)

A simple, kid-friendly LMS MVP built with Next.js App Router. Students log in with mock credentials, view courses, read lessons, and submit homework in text form. Data is in-memory only; authentication is mocked via `localStorage`.

## Local development
1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Quality checks
- Lint: `npm run lint`
- Production build (matches Vercel deploy step): `npm run build`

## Vercel deployment
This project is ready for zero-config deployment on Vercel. Two common options:

### Deploy via Vercel dashboard (no CLI)
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework is auto-detected as **Next.js**. Keep defaults: Node 18+, build command `npm run build`, output `.next`.
4. Click **Deploy**. After the first build, Vercel will set up preview deployments for every branch and production deploys on your main branch.

### Deploy via Vercel CLI
1. Install the CLI: `npm i -g vercel`
2. Log in: `vercel login`
3. From the project root, run: `vercel` (creates a preview)
4. Promote to production when ready: `vercel --prod`

### Notes
- No environment variables are required.
- The included `vercel.json` pins the framework to Next.js and uses the standard `npm run build` step used by Vercel.
- If you change package managers, update the build command in `vercel.json` to match.
