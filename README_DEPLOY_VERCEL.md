Deployment to Vercel — quick guide

This file contains step-by-step instructions to deploy this Next.js portfolio to Vercel and set the required environment variables.

Prerequisites
- Git (repo pushed to GitHub, GitLab or Bitbucket) OR local machine with Vercel CLI and an authenticated Vercel account.
- Your GROQ API key (keep it secret). Prefer a server-only variable named `GROQ_API_KEY`.

What I changed for deployment
- `app/api/chat/route.ts` now uses `GROQ_API_KEY` (server-only) with a fallback to `NEXT_PUBLIC_GROQ_API_KEY` for local dev.
- You can optionally set `GROQ_MODEL` to choose the Groq model (defaults to `llama-3.3-70b-versatile`).

Option A — Deploy via Vercel Dashboard (recommended)
1. Commit and push your repo to GitHub (or other supported Git provider).
2. Visit https://vercel.com/new and import your repository.
3. During setup, add the Environment Variable: `GROQ_API_KEY` with your Groq API key. Set it for Preview and Production.
   - (Optional) Add `GROQ_MODEL` if you want to specify a particular model (e.g., `llama-3.3-70b-versatile`).
4. Finish the import and trigger a deploy. Vercel will build and deploy the Next.js app.
5. Open the deployed URL and test the chat.

Option B — Deploy from your machine with Vercel CLI
1. Install Vercel CLI (if not installed):

```powershell
npm i -g vercel
```

2. Login (this opens a browser where you should be already logged in):

```powershell
vercel login
```

3. From the project folder, link/create the project and deploy:

```powershell
cd "C:\Users\Robert Simeon Jr\Desktop\online ojt\portfolio-twin"
vercel --prod
```

4. When prompted to set environment variables, either set them from the dashboard or run:

```powershell
vercel env add GROQ_API_KEY production
# follow prompt to paste the API key
vercel env add GROQ_API_KEY preview
```

5. (Optional) Add the model variable:

```powershell
vercel env add GROQ_MODEL production
vercel env add GROQ_MODEL preview
```

6. Re-deploy (push a commit or run `vercel --prod` again if linked).

Testing & verification
- Open the deployed site and use the chat UI. If you see the fallback response, check Vercel Function logs (Project -> Deployments -> Logs) to see if the Groq request failed (model decommission or auth error).

Security note
- Do not set `NEXT_PUBLIC_GROQ_API_KEY` on production — that will expose the key to browsers. Use `GROQ_API_KEY` only.

If you want, I can:
- Add a tiny `vercel.json` with edge function config (not required for this Next.js app).
- Generate the Git commit messages you can run locally.

If you'd like, I can now provide the exact Git commands for committing and pushing your changes, or the exact Vercel CLI commands to run — tell me whether you want to deploy via the Dashboard or CLI and I’ll give the step-by-step commands to run in your PowerShell terminal.
