# Vercel Deployment Setup Guide

## 🚀 Real-Time Deployment Instructions

Your portfolio is now set up for **automatic real-time deployment** to Vercel!

### Step 1: Link Your GitHub Repository to Vercel (One-Time Setup)

1. Go to https://vercel.com/dashboard
2. Click **"+ New Project"**
3. Click **"Import Git Repository"**
4. Search for **"Simeon_DigitalTwin"** (your GitHub repo)
5. Click **"Import"**

### Step 2: Configure Environment Variables

In the Vercel project settings, add these environment variables:

```
GROQ_API_KEY = your-groq-api-key-here
GROQ_MODEL = llama-3.3-70b-versatile
```

⚠️ **Important**: The GROQ_API_KEY is already marked as server-only in the code, so it won't leak to the client.

### Step 3: Done! 🎉

Now whenever you:
1. **Make changes locally** → Save files
2. **Run `git add .`** → Stage changes
3. **Run `git commit -m "message"`** → Commit changes
4. **Run `git push origin main`** → Push to GitHub

**Vercel will automatically detect the changes and deploy them within 30-60 seconds!**

---

## 📝 Workflow Example

```powershell
# 1. Make changes to your files (already done!)

# 2. Stage all changes
git add -A

# 3. Commit with a message
git commit -m "Update hero section styling"

# 4. Push to GitHub (this triggers Vercel deployment!)
git push origin main

# 5. Monitor deployment in Vercel dashboard
# Go to https://vercel.com/dashboard to see deployment status
```

---

## ✅ What's Already Set Up

- ✅ GitHub Actions workflow for automated builds
- ✅ Vercel configuration file (vercel.json)
- ✅ Environment variables configured
- ✅ Auto-deployment on every push to main branch
- ✅ Build verification before deployment

---

## 🔍 Verify Deployment Status

1. Visit https://vercel.com/dashboard
2. Select your "Simeon_DigitalTwin" project
3. Check the **"Deployments"** tab
4. You should see your recent deployments with status indicators:
   - 🔵 Building (in progress)
   - ✅ Ready (live)
   - ❌ Failed (check logs)

---

## 🎯 Your Deployment URL

Once deployed, your live portfolio will be at:
```
https://simeon-digitaltwin.vercel.app
```
(or your custom domain if configured)

---

## 💡 Quick Tips

- **Changes go live in ~30-60 seconds** after push
- **No manual deployment needed** - it's all automatic!
- **Every commit = new deployment** (full history available)
- **Rollback easily** by redeploying a previous version from the Vercel dashboard

---

## ❓ Troubleshooting

### Changes not showing up?
1. Clear browser cache (Ctrl+Shift+Delete)
2. Do a hard refresh (Ctrl+Shift+R)
3. Check Vercel dashboard deployment status
4. Verify GitHub push was successful

### API not working?
1. Check GROQ_API_KEY is added in Vercel project settings
2. Verify key is valid and hasn't expired
3. Check deployment logs in Vercel dashboard

### Build failing?
1. Check the build logs in Vercel dashboard
2. Run `npm run build` locally to test
3. Push fix to GitHub to trigger new deployment

---

**Your portfolio is now in continuous deployment! 🚀**
