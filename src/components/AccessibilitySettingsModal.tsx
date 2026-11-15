'use strict';
'use client';

import React from 'react';
import { 
  Eye, 
  Volume2, 
  Keyboard, 
  Sparkles, 
  X, 
  Check, 
  ZoomIn, 
  Sun, 
  Sliders,
  BellRing,
  Globe
} from 'lucide-react';
import { playAccessibleChime } from '@/lib/accessibility';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '@/lib/i18n';

interface AccessibilitySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: 'normal' | 'large' | 'extra-large';
  onSetFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  speechSpeed: number;
  onSetSpeechSpeed: (speed: number) => void;
  language?: SupportedLanguage;
  onSelectLanguage?: (lang: SupportedLanguage) => void;
}

export function AccessibilitySettingsModal({
  isOpen,
  onClose,
  fontSize,
  onSetFontSize,
  isHighContrast,
  onToggleHighContrast,
  speechSpeed,
  onSetSpeechSpeed,
  language = 'en',
  onSelectLanguage,
}: AccessibilitySettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Accessibility & Sensory Hub</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-emerald-800 uppercase">
                  WCAG 2.1 AAA
                </span>
              </div>
              <p className="text-emerald-100 text-xs font-medium">
                Inclusive vision, hearing & motor ergonomics for elderly users
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

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-800 dark:text-slate-200 text-xs">
          
          {/* Section 1: Typography & Text Scale */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ZoomIn className="h-4 w-4 text-emerald-600" />
              <span>1. Large Readable Text Scale</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal', label: 'Standard (100%)', sample: 'Aa' },
                { id: 'large', label: 'Large (125%)', sample: 'Aa' },
                { id: 'extra-large', label: 'Extra (150%)', sample: 'Aa' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    onSetFontSize(opt.id as 'normal' | 'large' | 'extra-large');
                    playAccessibleChime('success');
                  }}
                  className={`p-3 rounded-2xl border text-center font-bold transition-all ${
                    fontSize === opt.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400'
                  }`}
                >
                  <span className={`block font-black mb-1 ${opt.id === 'extra-large' ? 'text-2xl' : opt.id === 'large' ? 'text-xl' : 'text-base'}`}>
                    {opt.sample}
                  </span>
                  <span className="text-[11px] block">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Multilingual & Vernacular Regional Support */}
          {onSelectLanguage && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-teal-600" />
                  <span>2. Language & Vernacular Speech</span>
                </span>
                <span className="text-[10px] text-teal-600 font-bold">5 Regional Languages</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUPPORTED_LANGUAGES.map((l) => {
                  const isSelected = language === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => {
                        onSelectLanguage(l.code);
                        playAccessibleChime('success');
                      }}
                      className={`p-2.5 rounded-2xl border text-left font-bold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 ring-2 ring-teal-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-teal-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{l.flag}</span>
                        <div>
                          <div className="text-xs font-black">{l.nativeName}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{l.label}</div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-teal-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 3: High Contrast Vision Mode */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Sun className="h-4 w-4 text-amber-500" />
                <span>Ultra High-Contrast Vision Mode</span>
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                Enhances borders and maximizes black/yellow contrast for low vision & cataracts.
              </p>
            </div>
            <button
              onClick={() => {
                onToggleHighContrast();
                playAccessibleChime('success');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                isHighContrast
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isHighContrast ? 'Active (AAA)' : 'Enable'}
            </button>
          </div>

          {/* Section 3: Speech Synthesis Speed */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Volume2 className="h-4 w-4 text-teal-600" />
              <span>2. Audio Voice Readout Pace</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { speed: 0.75, label: 'Gentle Slow (0.75x)' },
                { speed: 0.9, label: 'Elderly Paced (0.9x)' },
                { speed: 1.0, label: 'Standard (1.0x)' },
              ].map((opt) => (
                <button
                  key={opt.speed}
                  onClick={() => {
                    onSetSpeechSpeed(opt.speed);
                    playAccessibleChime('success');
                  }}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                    speechSpeed === opt.speed
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 ring-2 ring-teal-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Multisensory Audio Chimes Test */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <BellRing className="h-4 w-4 text-emerald-500" />
                <span>Auditory Confirmation Chimes</span>
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                Plays harmonic tones upon dose confirmation and alerts for low vision.
              </p>
            </div>
            <button
              onClick={() => playAccessibleChime('success')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
            >
              Test Chime 🔔
            </button>
          </div>

          {/* Section 5: Accessible Keyboard Shortcuts */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
            <span className="font-bold text-indigo-950 dark:text-indigo-200 text-xs flex items-center gap-1.5">
              <Keyboard className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Full Keyboard Navigation & Accessible Shortcuts</span>
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-indigo-100 dark:border-indigo-900/40 flex justify-between">
                <span>Senior View:</span>
                <kbd className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Alt + S</kbd>
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-indigo-100 dark:border-indigo-900/40 flex justify-between">
                <span>Caregiver View:</span>
                <kbd className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Alt + F</kbd>
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-indigo-100 dark:border-indigo-900/40 flex justify-between">
                <span>Voice Companion:</span>
                <kbd className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Alt + V</kbd>
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-indigo-100 dark:border-indigo-900/40 flex justify-between">
                <span>Emergency SOS:</span>
                <kbd className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-rose-600">Alt + E</kbd>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors text-sm shadow-md"
          >
            Apply Accessibility Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
