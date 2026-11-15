# Catalyst Hackathon Engineering Rules

You are participating in the **Catalyst Solo Hackathon** powered by **Google for Developers** & **Hack2Skill**.
The competition runs non-stop, evaluated in two rounds:
- **Round 1 (AI Evaluation)**: Evaluates the GitHub repository on idea uniqueness, relevance to problem statement, UI, repository structure, code quality, and scalability.
- **Round 2 (Manual Jury Review)**: IIT Kharagpur and partner judges review the live deployed web application.

## Strict Guidelines to Follow During Development:

1. **Production-Ready Code Only**:
   - Always use TypeScript with strict typing. Never leave unhandled promise rejections or raw `any` types.
   - All API endpoints must return proper HTTP status codes and structured JSON with `{ success: boolean, data?: ..., error?: string }`.
   - Implement graceful fallbacks for external APIs (e.g. Gemini API) so live demo testers never encounter a blank screen or 500 error if keys are missing or rate limits occur.

2. **Visual & UI Excellence**:
   - The UI must look modern, polished, and distinctive: subtle glassmorphism, clean typography, dark/light theme support, micro-animations, and responsive mobile/desktop layouts.
   - Never output raw JSON or plain markdown in core user flows; render interactive cards, badges, statistics cards, and visual feedback.
   - Include loading skeletons for asynchronous actions and toast notifications for user interactions.

3. **Repository Architecture Standards**:
   - Maintain a pristine folder layout: `app/` (routes), `components/ui/` (primitives), `components/features/` (domain-specific components), `lib/` (utilities, clients), `types/` (TypeScript definitions).
   - Maintain standard files: `README.md` with interactive Mermaid architecture diagram, `.gitignore`, `LICENSE`, `Dockerfile`, `.github/workflows/ci.yml`, and `.env.example`.

4. **Zero-Friction Deployment**:
   - Keep the project configured for instant deployment to Vercel (`vercel --prod`) with all build scripts validated.
   - Verify every build locally before committing.
