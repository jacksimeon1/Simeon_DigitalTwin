<#
deploy-to-vercel.ps1

This helper script automates the local steps to prepare and deploy this project to Vercel.
It will:
  - Stage & commit changes (you'll be prompted if no changes)
  - Ensure branch is named 'main'
  - Optionally add/update git remote 'origin' (you'll be prompted to enter the GitHub URL)
  - Push to origin/main (this will require your Git credentials)
  - Install Vercel CLI (if missing)
  - Run `vercel login` (this will open the browser for you to authenticate)
  - Run `vercel --prod` to create/link and deploy (interactive)

IMPORTANT:
  - This script runs interactive commands and will prompt for input where required.
  - I cannot access your Vercel/GitHub account or open your browser from here; running `vercel login` will open a browser window on your machine where you must complete authentication.
  - Make sure your GitHub repo exists (or provide the URL when prompted).

Usage:
  Open PowerShell in this project folder and run:
    powershell -ExecutionPolicy Bypass -File .\deploy-to-vercel.ps1
#>

param()

function Run-Command([string]$cmd) {
    Write-Host "-> $cmd" -ForegroundColor Cyan
    iex $cmd
}

Write-Host "Starting deploy helper for portfolio-twin" -ForegroundColor Green

# 1) Stage & commit
Run-Command "git add -A"

try {
  $status = git status --porcelain
} catch {
  Write-Host "Git does not seem to be initialized in this folder. Please run 'git init' first." -ForegroundColor Yellow
  exit 1
}

if (-not [string]::IsNullOrWhiteSpace($status)) {
  $commitMsg = Read-Host "Enter commit message (or press Enter for default)"
  if ([string]::IsNullOrWhiteSpace($commitMsg)) { $commitMsg = "Prepare portfolio: updates for Vercel deployment" }
  Run-Command "git commit -m \"$commitMsg\""
} else {
  Write-Host "No changes to commit." -ForegroundColor Yellow
}

# 2) Ensure branch main
Run-Command "git branch -M main"

# 3) Remote
$remotes = git remote -v
if ($remotes -match "origin") {
  Write-Host "Remote 'origin' already configured:" -ForegroundColor Green
  Write-Host $remotes
  $useExisting = Read-Host "Use existing origin? (y/n)"
  if ($useExisting -ne 'y') {
    $newUrl = Read-Host "Enter GitHub repo URL to set as origin (e.g. https://github.com/jacksimeon1/portfolio-twin.git)"
    Run-Command "git remote set-url origin $newUrl"
  }
} else {
  $remoteUrl = Read-Host "No origin found. Enter GitHub repo URL to add as origin (or leave blank to skip)"
  if (-not [string]::IsNullOrWhiteSpace($remoteUrl)) {
    Run-Command "git remote add origin $remoteUrl"
  } else {
    Write-Host "Skipping remote add. You can add one later with: git remote add origin <url>" -ForegroundColor Yellow
  }
}

# 4) Push
$push = Read-Host "Push to origin/main now? (y/n)"
if ($push -eq 'y') {
  Run-Command "git push -u origin main"
} else {
  Write-Host "Skipping push. You can push manually later." -ForegroundColor Yellow
}

# 5) Install vercel CLI if missing
$vercelPath = (Get-Command vercel -ErrorAction SilentlyContinue)
if (-not $vercelPath) {
  $install = Read-Host "Vercel CLI not found. Install globally with npm? (y/n)"
  if ($install -eq 'y') {
    Run-Command "npm i -g vercel"
  } else {
    Write-Host "Skipping Vercel CLI install. Make sure to install it before deploying." -ForegroundColor Yellow
  }
} else {
  Write-Host "Vercel CLI found: $vercelPath" -ForegroundColor Green
}

# 6) Vercel login
$login = Read-Host "Run 'vercel login' now to authenticate your account? (y/n)"
if ($login -eq 'y') {
  Run-Command "vercel login"
} else {
  Write-Host "You can run 'vercel login' later. The deploy step needs authentication." -ForegroundColor Yellow
}

# 7) Deploy
$deploy = Read-Host "Run 'vercel --prod' now to deploy? (y/n)"
if ($deploy -eq 'y') {
  Run-Command "vercel --prod"
  Write-Host "If the project is newly created, go to Vercel dashboard -> Project -> Settings -> Environment Variables and add: GROQ_API_KEY (value: your Groq API key)." -ForegroundColor Yellow
  Write-Host "You may also add GROQ_MODEL if you want to override the model." -ForegroundColor Yellow
} else {
  Write-Host "Skipping deploy. Run 'vercel --prod' when ready." -ForegroundColor Yellow
}

Write-Host "Helper script finished. If you didn't push or deploy, do so manually or rerun this script." -ForegroundColor Green
