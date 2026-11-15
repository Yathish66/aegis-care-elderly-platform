'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Camera, 
  HeartHandshake, 
  Mail, 
  Volume2, 
  Users,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface JudgeWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenarioId: string) => void;
}

export function JudgeWalkthroughModal({
  isOpen,
  onClose,
  onSelectScenario,
}: JudgeWalkthroughModalProps) {
  const [activeStep, setActiveStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-foreground">Judge Evaluation Tour</h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  IIT KHARAGPUR & PARTNER JURY
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">Quick 2-minute architectural and feature walkthrough</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
          {[
            { step: 1, label: '1. Problem Fit' },
            { step: 2, label: '2. Architecture' },
            { step: 3, label: '3. Gemini AI' },
            { step: 4, label: '4. Quick Test' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`py-2.5 px-2 rounded-xl transition-all ${
                activeStep === item.step
                  ? 'bg-amber-500 text-white shadow-md font-black'
                  : 'bg-muted/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Step 1: Problem Statement Alignment */}
        {activeStep === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-lg font-black text-foreground">Elderly Care & Medication Management Challenge</h3>
            <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2 text-xs text-muted-foreground leading-relaxed">
              <p className="text-foreground font-semibold">
                <strong>Core Challenge:</strong> Over 50% of elderly patients fail to adhere to complex medication schedules, leading to preventable hospitalizations and constant caregiver anxiety.
              </p>
              <p>
                <strong>Our Solution (AegisCare AI):</strong> A unified ecosystem with <strong>Passcode-based access control</strong> connecting elderly individuals with their family and caregivers in real time.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-foreground">
                <li>Senior View: Zero-confusion, large text, audio voice readouts, 1-tap dose logging.</li>
                <li>Family Portal: Live adherence telemetry, remote schedule management, proactive escalation alerts.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 2: Architecture & Passcode Security */}
        {activeStep === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-lg font-black text-foreground">Dual-Persona Passcode Architecture</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 text-xs">
                <span className="font-black text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-1.5">
                  👵 Senior Mode (PIN: 1234)
                </span>
                <p className="text-muted-foreground">High-contrast, distraction-free interface with text-to-speech audio readout and 1-tap dose confirmation.</p>
              </div>

              <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 space-y-2 text-xs">
                <span className="font-black text-teal-700 dark:text-teal-300 text-sm flex items-center gap-1.5">
                  👨‍👩‍👧 Family Portal (PIN: 5678)
                </span>
                <p className="text-muted-foreground">Full adherence graphs, prescription camera OCR, doctor appointments, and proactive email notification triggers.</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Google Gemini Integration */}
        {activeStep === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-lg font-black text-foreground">How Google Gemini 2.5 Flash Powers AegisCare</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-card border border-border flex items-start gap-3">
                <Camera className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-foreground">1. Multimodal Prescription OCR</h4>
                  <p className="text-muted-foreground">Gemini reads doctor handwriting and Latin clinical sig codes (OD, BD, PC) to extract structured dosage schedules with zero manual typing.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-card border border-border flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-foreground">2. Clinical Drug-Drug & Food Interaction Guardian</h4>
                  <p className="text-muted-foreground">Continuously analyzes multi-drug stacks for adverse interactions (e.g., Atorvastatin + Grapefruit risk) and dietary contraindications.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-card border border-border flex items-start gap-3">
                <Mail className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-foreground">3. Proactive Email Escalation Engine</h4>
                  <p className="text-muted-foreground">Autonomous notification dispatcher alerts daughters and caregivers if doses remain untaken 60 minutes after schedule.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: 1-Click Test Scenarios */}
        {activeStep === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-lg font-black text-foreground">1-Click Live Test Scenarios</h3>
            <p className="text-xs text-muted-foreground">Click any scenario below to immediately experience the platform in action:</p>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  onSelectScenario('senior');
                  onClose();
                }}
                className="w-full p-4 rounded-2xl border border-border bg-muted/40 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-left transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-black text-foreground">Scenario A: Test Senior Mode with Voice Readout</div>
                  <p className="text-[11px] text-muted-foreground">Listen to audio readout & tap "I TOOK THIS" for Dadi Kamala</p>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={() => {
                  onSelectScenario('ocr');
                  onClose();
                }}
                className="w-full p-4 rounded-2xl border border-border bg-muted/40 hover:bg-teal-500/10 hover:border-teal-500/40 text-left transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-black text-foreground">Scenario B: Test Gemini Prescription Vision OCR</div>
                  <p className="text-[11px] text-muted-foreground">Simulate parsing Dr. Ramesh Patel's handwritten cardiology prescription</p>
                </div>
                <ChevronRight className="w-4 h-4 text-teal-600" />
              </button>

              <button
                onClick={() => {
                  onSelectScenario('escalation');
                  onClose();
                }}
                className="w-full p-4 rounded-2xl border border-border bg-muted/40 hover:bg-rose-500/10 hover:border-rose-500/40 text-left transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-black text-foreground">Scenario C: Test Proactive Missed Dose Escalation Email</div>
                  <p className="text-[11px] text-muted-foreground">Trigger automated alert to daughter Priya and inspect email log</p>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-600" />
              </button>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-border">
          {activeStep > 1 ? (
            <button
              onClick={() => setActiveStep(activeStep - 1)}
              className="text-xs font-bold text-muted-foreground hover:text-foreground"
            >
              ← Back
            </button>
          ) : <div />}

          {activeStep < 4 ? (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              className="px-5 py-2.5 rounded-xl bg-foreground text-background font-bold text-xs hover:opacity-90"
            >
              Next Step →
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600"
            >
              Start Exploring App
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
