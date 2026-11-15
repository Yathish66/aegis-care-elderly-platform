---
name: catalyst-ai-judge-auditor
description: >-
  Audits, scores, and optimizes hackathon projects against Google for Developers & Hack2Skill
  AI evaluation criteria: idea uniqueness, relevance to problem statement, UI/UX excellence,
  repository structure, code quality, and solution scalability.
---

# Catalyst AI Judge Auditor

This skill provides an automated pre-submission audit designed to maximize scores in the
Google for Developers & Hack2Skill **Round 1 AI Evaluation** and **Round 2 Manual Jury Review**.

## The 6 Evaluation Pillars

### 1. Idea Uniqueness & Distinctiveness
- **Core Value Proposition**: Does the app solve the problem statement in a novel, non-trivial way?
- **AI Integration**: Does it leverage Google Gemini in an advanced manner (multimodal, streaming, tool/function calling, structured reasoning) rather than a trivial chat prompt?
- **Competitive Edge**: Clearly highlight in the README and UI what makes the solution 10x more useful than standard implementations.

### 2. Relevance to Problem Statement
- Directly addresses the core user pain point defined in the hackathon brief.
- Clear user persona and workflow demonstrated from entry to completion.
- Interactive demo data pre-populated so judges can evaluate features in <60 seconds without complex signups.

### 3. UI/UX Polish & Visual Impact
- **Modern Aesthetics**: Tailwind CSS, clean typography, balanced spacing, cohesive color palette (dark mode supported).
- **Feedback & States**:
  - Loading skeletons / animated spinners for async actions.
  - Toast notifications for success/error feedback.
  - Empty states with call-to-action buttons.
  - Zero raw JSON dumps; use generative UI widgets (charts, metrics, badge pills, cards).
- **Responsive Design**: Flawless on both desktop (1920x1080) and mobile (375px+).

### 4. Repository Structure & Documentation
- **Clean Root**: No leftover test files, scratch files, or unnecessary root clutter.
- **Top-Tier README.md**:
  - High-res badges (License, TypeScript, Next.js, Vercel, Tailwind, Gemini).
  - Clear 1-sentence value proposition + Hero screenshot / demo GIF placeholder.
  - Problem Statement vs Solution breakdown.
  - Architecture Diagram using Mermaid (`flowchart TD` or `sequenceDiagram`).
  - Key Features with interactive highlights.
  - Live Demo Link + Quickstart (Run locally in 3 commands).
  - Environment variables documentation (`.env.example`).
- **Standard Open Source Files**:
  - `LICENSE` (MIT or Apache-2.0).
  - `.gitignore` (excludes `.env`, `node_modules`, `.next`, `dist`, logs).
  - `Dockerfile` & `docker-compose.yml` (demonstrating containerization).
  - `.github/workflows/ci.yml` (GitHub Actions CI workflow for build & lint).

### 5. Code Quality & Modularity
- **Strict TypeScript**: `noImplicitAny: true`, zero `any` types where possible, strong interface/type models.
- **Component Architecture**: Atomic design (`components/ui`, `components/features`, `lib/`, `hooks/`).
- **Resilient Error Handling**:
  - React Error Boundaries preventing full white screens.
  - Graceful fallback for API timeouts / rate limits.
  - Zod runtime schema validation for API inputs and LLM JSON outputs.

### 6. Solution Scalability & Cloud Architecture
- **Serverless & Edge**: API routes optimized with caching headers, streaming responses, and minimal bundle size.
- **State & Caching**: Efficient client-side caching (SWR or React Query) or database indexing.
- **Security**: Sanitized inputs, environment variables for API secrets, rate-limiting considerations.

## Audit Checklist Command
Run the audit before 4:00 PM:
1. `git status` -> Verify clean working directory, no secrets committed.
2. `npm run build` or `pnpm build` -> Zero TypeScript errors, zero build warnings.
3. Check live URL -> All routes load, API responds, responsive on mobile.
4. Verify README has Mermaid architecture diagram and Live Demo link.
5. Verify LinkedIn post draft is ready with required tags.
