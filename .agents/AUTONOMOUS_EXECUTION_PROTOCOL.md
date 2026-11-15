# Catalyst Hackathon - Autonomous Execution Protocol

This protocol defines the exact, zero-hesitation execution pipeline triggered the moment
the user uploads the problem statement tomorrow morning (9:00 AM - 9:30 AM).

---

## ⚡ Execution Pipeline (End-to-End Autonomous)

### Step 1: Deep Problem Statement Ingestion & Architecture Definition
1. Parse the problem statement uploaded by the user.
2. Formulate:
   - **Project Name & Tagline**: Professional, catchy, memorable.
   - **Target Persona & Core Problem**: Clear problem-solution mapping.
   - **Distinctive Innovation**: Advanced Google Gemini integration (multimodal reasoning, structured outputs, streaming, or agentic workflow).
   - **Generative UI Architecture**: KPI metrics, interactive charts, and real-time thought stream visualizer.

---

### Step 2: Instant Codebase Scaffolding
1. Bootstrap Next.js 15 App Router with TypeScript & Tailwind CSS using pre-cached local store:
   - Framework: Next.js 15 App Router
   - Styling: Tailwind CSS + Lucide Icons + Framer Motion
   - Packages: `@google/genai`, `zod`, `clsx`, `tailwind-merge`, `canvas-confetti`
2. Implement Core Files:
   - `src/lib/gemini.ts`: Official Google GenAI SDK client with fallback logic.
   - `src/lib/mock-data.ts`: Pre-loaded realistic demo datasets for 3 scenarios.
   - `src/components/features/ScenarioPicker.tsx`: 1-click test scenario presets for judges.
   - `src/components/features/ReasoningSteps.tsx`: Collapsible step-by-step AI thought stream visualizer.
   - `src/components/features/StatCards.tsx`: Generative UI metrics with trend badges.
   - `src/components/features/JudgeTourModal.tsx`: Interactive 3-step walkthrough modal.
   - `src/app/api/analyze/route.ts`: Structured JSON API endpoint with Zod schema validation.
   - `src/app/page.tsx`: Polished, responsive, dark-mode capable dashboard with glassmorphism styling.

---

### Step 3: Verification & Zero-Error Compilation
1. Run local TypeScript typecheck and build validation:
   ```powershell
   pnpm run build
   ```
2. Verify zero TypeScript errors and zero build failures.

---

### Step 4: Instant Production Deployment
1. Deploy to Vercel production edge servers:
   ```powershell
   vercel --prod --yes
   ```
2. Capture the live production URL (e.g. `https://<project-name>.vercel.app`).
3. Verify live URL responds with HTTP 200.

---

### Step 5: Instant GitHub Publication
1. Initialize git and commit all source files:
   ```powershell
   git init
   git add .
   git commit -m "feat: complete production release for Catalyst hackathon"
   ```
2. Publish public repository via GitHub CLI:
   ```powershell
   gh repo create <project-name> --public --source=. --remote=origin --push
   ```
3. Capture the GitHub repository URL.

---

### Step 6: Deliverables Generation
1. Write production `README.md` with:
   - High-res badges (Next.js, TypeScript, Gemini 2.0, Tailwind, Vercel, MIT License).
   - Live Vercel Link & GitHub Link.
   - Problem Statement vs Solution analysis.
   - Mermaid Architecture Diagram (`flowchart TD`).
   - Feature Matrix & Quickstart local run commands.
2. Write `SUBMISSION_LINKEDIN_POST.md`:
   - Exact text ready to publish, pre-populated with live URLs and required tags:
     `#CatalystHackathon #GoogleForDevelopers #Hack2Skill #MnM`.
3. Present the 3 required submission items clearly to the user:
   - **GitHub Repository URL**
   - **Deployed Live URL**
   - **LinkedIn Post Text**
