---
name: catalyst-visual-ui-components
description: >-
  Pre-built Generative UI component architectures in React, Tailwind, and Lucide:
  AI thought streaming visualizer, interactive metric KPI cards, real-time status badges,
  and exportable summary cards.
---

# Catalyst Visual UI Components

Generative UI replaces boring markdown text blocks with rich, interactive, and structured visual cards.
This dramatically elevates project perception for both Round 1 AI evaluators and Round 2 human judges.

---

## 1. AI Reasoning / Thought Stream Visualizer

Displays real-time step-by-step "thinking" badges, similar to Google Gemini Deep Research.

```tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'completed';
  detail?: string;
}

export function ReasoningSteps({ steps }: { steps: Step[] }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 mb-4 transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-xs font-semibold text-primary uppercase tracking-wider"
      >
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 animate-pulse text-primary" />
          Autonomous Reasoning Pipeline ({steps.filter(s => s.status === 'completed').length}/{steps.length})
        </span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2 border-t border-primary/10 pt-3">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-foreground font-medium">
                {step.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                {step.status === 'running' && <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />}
                {step.status === 'pending' && <span className="w-3.5 h-3.5 rounded-full border border-muted-foreground/30 inline-block" />}
                {step.title}
              </span>
              {step.detail && <span className="text-muted-foreground font-mono text-[10px]">{step.detail}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 2. Interactive KPI & Stat Cards

```tsx
import { ArrowUpRight, TrendingUp, ShieldCheck } from 'lucide-react';

export function StatCard({ title, value, change, badge }: { title: string; value: string; change?: string; badge?: string }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm shadow-sm hover:border-primary/40 transition-all">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase">{title}</span>
        {badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            {badge}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
      {change && (
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-emerald-500" />
          <span className="text-emerald-500 font-semibold">{change}</span> vs baseline
        </p>
      )}
    </div>
  );
}
```

---

## 3. Micro-Interaction: Confetti Celebration

When an analysis or workflow finishes successfully, trigger lightweight celebration feedback:

```tsx
import confetti from 'canvas-confetti';

export function triggerSuccessCelebration() {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.8 },
    colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'], // Google brand colors!
  });
}
```
