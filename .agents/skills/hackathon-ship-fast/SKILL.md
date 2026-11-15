---
name: hackathon-ship-fast
description: >-
  Rapid execution runbook for hackathons: instant scaffolding with modern full-stack
  (Next.js 15, Tailwind, Lucide), one-command Vercel production deployment, automated
  GitHub repo publishing with GitHub CLI, and compliant LinkedIn post generation.
---

# Hackathon Ship-Fast Runbook

A high-velocity operational guide to build, deploy, and submit a winning hackathon project
within the 7-hour sprint (9:30 AM - 4:30 PM).

## Phase 1: Rapid Scaffolding (9:30 AM - 10:00 AM)

### Recommended Stack
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + `lucide-react` icons + `clsx` + `tailwind-merge`
- **UI Components**: Radix UI / Shadcn UI patterns
- **AI Engine**: Google Gemini API via `@google/genai` or `google-genai` Python backend
- **Validation**: Zod (for runtime validation and LLM structured outputs)
- **Deployment**: Vercel (Production serverless) + GitHub

### Rapid Project Bootstrap
```bash
# Initialize Next.js project with TypeScript, Tailwind, ESLint, App Router
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --yes

# Install essential UI & AI packages
pnpm add lucide-react clsx tailwind-merge @google/genai zod
```

---

## Phase 2: Building Core & Generative UI (10:00 AM - 2:30 PM)

1. **Focus on the "Wow Factor"**: Build the 1 core killer feature first that makes the solution distinctive.
2. **Generative UI over Raw Text**: Rather than standard text generation, parse Gemini JSON outputs into rich visual cards, progress bars, interactive charts, and actionable tags.
3. **Pre-populate Realistic Sample Data**: Ensure judges can test every feature instantly without needing an external API key or tedious setup.

---

## Phase 3: Instant Deployment & Testing (2:30 PM - 3:30 PM)

### 1. Vercel Deployment
Deploy directly from terminal:
```powershell
vercel --prod --yes
```
- Set environment variables via Vercel dashboard or CLI: `vercel env add GEMINI_API_KEY`
- Verify production URL works in an incognito window.

### 2. GitHub Repository Creation
Publish fresh repository directly:
```powershell
git init
git add .
git commit -m "feat: complete production prototype for Catalyst hackathon"
gh repo create catalyst-project --public --source=. --remote=origin --push
```

---

## Phase 4: Submission Preparation (3:30 PM - 4:30 PM)

### Mandatory Deliverables Checklist:
1. **GitHub Repository Link**:
   - Fresh public repository.
   - Comprehensive README with badges, problem-solution narrative, architecture diagram, and setup instructions.
   - Open source LICENSE and GitHub Actions CI workflow.
2. **Deployed Project Link**:
   - Fast, live production URL (e.g., `https://project-name.vercel.app`).
   - Health check verified.
3. **LinkedIn Post**:
   - Formatted to Hack2Skill / MnM template specifications.
   - Highlights Problem, Solution, Tech Stack, and Distinctiveness.
   - Includes GitHub and Live Demo links.
