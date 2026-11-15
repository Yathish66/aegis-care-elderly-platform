'use strict';
'use client';

import React, { useState } from 'react';
import { Medication, PillRecognitionResult } from '@/types';
import { Camera, Sparkles, CheckCircle2, AlertOctagon, X, Search, ShieldCheck } from 'lucide-react';

interface PillIdentifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMedications: Medication[];
}

export function PillIdentifierModal({ isOpen, onClose, activeMedications }: PillIdentifierModalProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PillRecognitionResult | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('preset-white-oval');

  if (!isOpen) return null;

  const presets = [
    {
      id: 'preset-white-oval',
      name: 'White Oblong Pill (Imprint: M 500)',
      description: 'Found on kitchen counter near morning breakfast plate',
      badge: 'Matches Morning Metformin',
    },
    {
      id: 'preset-blue-round',
      name: 'Light Blue/White Biconvex Pill (Imprint: 51 H)',
      description: 'Found in weekly pillbox organizer slot',
      badge: 'Matches Telmisartan',
    },
    {
      id: 'preset-unknown-yellow',
      name: 'Unknown Yellow Unmarked Tablet',
      description: 'Unlabeled loose tablet found in living room drawer',
      badge: 'Suspicious / Unknown',
    },
  ];

  const handleAnalyzePreset = async (presetId: string) => {
    setSelectedPreset(presetId);
    setAnalyzing(true);
    setResult(null);

    try {
      const res = await fetch('/api/gemini/identify-pill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetId, activeMedications }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      }
    } catch (err) {
      console.error('Pill identification error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Visual Pill Identifier</h2>
              <p className="text-teal-100 text-xs font-medium">
                Gemini 2.5 Flash Computer Vision Pill Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Instructions */}
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200">
            <p className="font-semibold">
              Found a loose pill and not sure what it is? Choose a sample pill or snap a photo. Our vision AI reads color, shape, and imprints to verify against your active prescriptions.
            </p>
          </div>

          {/* Test Presets for Instant 1-Click Verification */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select Sample Pill to Analyze (1-Click Test):
            </span>
            <div className="grid gap-2">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleAnalyzePreset(p.id)}
                  disabled={analyzing}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    selectedPreset === p.id
                      ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/20 ring-2 ring-teal-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-teal-400 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{p.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.id.includes('unknown')
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        }`}
                      >
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{p.description}</p>
                  </div>
                  <Sparkles className="h-4 w-4 text-teal-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Analysis in Progress */}
          {analyzing && (
            <div className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 flex items-center gap-3 animate-pulse">
              <Sparkles className="h-6 w-6 text-teal-600 animate-spin" />
              <span className="text-sm font-bold text-teal-800 dark:text-teal-300">
                Gemini Vision is inspecting pill geometry, scoring, and imprint...
              </span>
            </div>
          )}

          {/* Identification Results Card */}
          {result && (
            <div
              className={`p-5 rounded-3xl border-2 space-y-4 animate-in zoom-in-95 ${
                result.matchesPrescription
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500/60'
                  : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-500/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {result.matchesPrescription ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  ) : (
                    <AlertOctagon className="h-6 w-6 text-rose-600" />
                  )}
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {result.matchesPrescription
                      ? `IDENTIFIED: ${result.matchName}`
                      : 'ALERT: UNRECOGNIZED PILL'}
                  </h3>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                  Confidence: {Math.round(result.confidenceScore * 100)}%
                </span>
              </div>

              {/* Morphology Data */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block">Shape & Color</span>
                  <span className="font-bold text-slate-900 dark:text-white">{result.shapeDescription || 'Oval'} • {result.colorDescription || 'White'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block">Detected Imprint</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">{result.imprintDetected || 'Unmarked'}</span>
                </div>
              </div>

              {/* Clinical Advice */}
              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  Clinical Advice for Dadi Kamala:
                </span>
                <p className="text-slate-900 dark:text-white font-medium leading-relaxed">
                  {result.clinicalAdvice}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition-colors text-sm"
          >
            Close Pill Identifier
          </button>
        </div>
      </div>
    </div>
  );
}
