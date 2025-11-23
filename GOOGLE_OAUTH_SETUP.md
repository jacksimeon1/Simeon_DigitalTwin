# Google Sign-In Setup Guide 🔐

Your portfolio now has **Google authentication** protecting the AI Chat feature!

## What's New

✅ Users must sign in with Google to access the AI Chat
✅ Smooth authentication flow with protected routes
✅ Session management with secure tokens
✅ Login/Logout buttons in Navigation

## Setup Instructions (5 minutes)

### Step 1: Create Google OAuth Credentials

1. Go to **Google Cloud Console**: https://console.cloud.google.com/
2. Click on your project or create a new one
3. Go to **APIs & Services** → **Credentials**
4. Click **+ Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Add authorized redirect URIs:
   - For localhost: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.vercel.app/api/auth/callback/google`
7. Copy your **Client ID** and **Client Secret**

### Step 2: Add Environment Variables

**For Local Development:**

Create/update `.env.local`:
```
GOOGLE_ID=your_client_id_here
GOOGLE_SECRET=your_client_secret_here
NEXTAUTH_SECRET=generate_with_$(openssl rand -base64 32)
```

Generate NEXTAUTH_SECRET:
```powershell
# PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### Step 3: Add to Vercel

1. Go to your Vercel project settings
2. Add **Environment Variables**:
   - `GOOGLE_ID` = your Google Client ID
   - `GOOGLE_SECRET` = your Google Client Secret  
   - `NEXTAUTH_SECRET` = your generated secret
   - `NEXTAUTH_URL` = https://yourdomain.vercel.app

### Step 4: Deploy!

Push your changes to GitHub:
```powershell
git add -A
git commit -m "Configure Google OAuth"
git push origin main
```

Vercel will automatically deploy!

---

## How It Works

### Public Pages (No Sign-In Needed)
- Home Hero section
- Projects showcase
- Skills section
- About information

### Protected Pages (Sign-In Required)
- AI Chat Assistant
- Chat API endpoints

### User Flow

```
Anonymous User
    ↓
Scrolls to Chat Section
    ↓
Sees "Sign In to Access Chat" prompt
    ↓
Clicks "Sign in with Google"
    ↓
Redirected to Google login
    ↓
Returns with session
    ↓
Access to full AI Chat features!
```

---

## Navigation Features

### When Not Signed In
- **Navigation** shows "Sign In" button
- **Chat Section** shows lock icon with login prompt

### When Signed In
- **Navigation** shows user avatar and "Sign Out" button
- **Chat Section** fully unlocked and operational

---

## Testing Locally

```powershell
# 1. Set environment variables in .env.local
# 2. Run dev server
npm run dev

# 3. Visit http://localhost:3000
# 4. Scroll to chat section
# 5. Click "Sign in with Google"
# 6. Use a test Google account
```

---

## Troubleshooting

### "Invalid OAuth Client"
- Check that redirect URI exactly matches in Google Cloud Console
- URLs are case-sensitive and must include protocol (http/https)

### "NEXTAUTH_SECRET not configured"
- Add NEXTAUTH_SECRET to `.env.local` and Vercel environment variables
- Generate a new secret: `openssl rand -base64 32`

### "Session not persisting"
- Ensure NEXTAUTH_URL is set in production (Vercel env vars)
- Check that cookies are not blocked by browser settings

### "Redirect URI mismatch"
- For Vercel: Ensure production URL matches (e.g., `yourdomain.vercel.app`)
- Add both localhost and production URIs in Google Cloud Console

---

## Security Best Practices

✅ **Never commit secrets** - Use environment variables
✅ **NEXTAUTH_SECRET** - Generated secret for signing tokens
✅ **Google credentials** - Only sent server-side, never exposed to client
✅ **Session tokens** - Secure HTTP-only cookies

---

## What's Protected

The AI Chat feature now:
- Requires Google authentication
- Validates user sessions on each request  
- Displays user information (name, avatar) when authenticated
- Allows seamless logout

---

## Next Steps

1. ✅ Set up Google OAuth credentials
2. ✅ Add environment variables to `.env.local`
3. ✅ Test locally with `npm run dev`
4. ✅ Add variables to Vercel dashboard
5. ✅ Deploy and test in production

Your portfolio now has **enterprise-grade authentication**! 🚀
