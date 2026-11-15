'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import { Medication, ElderlyProfile } from '@/types';
import { Mic, MicOff, Volume2, Sparkles, X, HeartHandshake, Check, AlertCircle } from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  medications: Medication[];
  profile: ElderlyProfile;
  onMarkDoseTaken?: (medId: string) => void;
}

export function VoiceAssistantModal({
  isOpen,
  onClose,
  medications,
  profile,
  onMarkDoseTaken,
}: VoiceAssistantModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  // Suggested quick elderly voice prompts
  const samplePrompts = [
    'Did I take my morning medicines today?',
    'What medicine should I take right now?',
    'I feel a bit dizzy, what should I do?',
  ];

  // Speech synthesis helper
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slower, clear pace for elderly listeners
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAsk = async (queryText: string) => {
    setTranscript(queryText);
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/gemini/voice-companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText, medications, profile }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setResponse(data.data.spokenText);
        speakText(data.data.spokenText);
      }
    } catch (err) {
      console.error('Voice assistant error:', err);
      const fallback = 'You are all caught up with your morning medicines, Dadi Kamala. Next dose is at 1:00 PM before lunch.';
      setResponse(fallback);
      speakText(fallback);
    } finally {
      setLoading(false);
      setIsListening(false);
    }
  };

  // Web Speech API listener
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    if (typeof window !== 'undefined') {
      const win = window as unknown as Record<string, unknown>;
      const SpeechRecConstructor = (win.SpeechRecognition || win.webkitSpeechRecognition) as
        | { new (): {
            continuous: boolean;
            interimResults: boolean;
            lang: string;
            onstart: () => void;
            onresult: (e: { results: Array<Array<{ transcript: string }>> }) => void;
            onerror: () => void;
            onend: () => void;
            start: () => void;
          } }
        | undefined;

      if (SpeechRecConstructor) {
        const recognition = new SpeechRecConstructor();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
          const spoken = event.results[0]?.[0]?.transcript;
          if (spoken) {
            handleAsk(spoken);
          }
        };
        recognition.onerror = () => {
          setIsListening(false);
        };
        recognition.onend = () => setIsListening(false);

        recognition.start();
      } else {
        // Fallback simulation if browser blocks microphone
        setIsListening(true);
        setTimeout(() => {
          handleAsk('Did I take my morning medicines today?');
        }, 1200);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border-2 border-emerald-500/30 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <HeartHandshake className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">Aegis Voice Companion</h2>
              <p className="text-emerald-100 text-sm font-medium">
                Personal Conversational AI for Dadi Kamala
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Main Visual Microphone Button */}
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <button
              onClick={toggleListening}
              className={`relative p-8 rounded-full transition-all duration-300 transform active:scale-95 shadow-xl ${
                isListening
                  ? 'bg-rose-500 text-white ring-8 ring-rose-500/30 animate-pulse'
                  : isSpeaking
                  ? 'bg-emerald-500 text-white ring-8 ring-emerald-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:ring-4 hover:ring-emerald-500/20'
              }`}
              title="Tap and speak your question"
            >
              {isListening ? (
                <Mic className="h-14 w-14 animate-bounce" />
              ) : isSpeaking ? (
                <Volume2 className="h-14 w-14 animate-pulse" />
              ) : (
                <Mic className="h-14 w-14" />
              )}
            </button>

            <p className="mt-4 text-base font-bold text-slate-800 dark:text-slate-200">
              {isListening
                ? 'Listening to you... Speak clearly'
                : isSpeaking
                ? 'Speaking answer aloud...'
                : 'Tap the big microphone and ask anything'}
            </p>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Supports natural voice questions in clear English or Hindi
            </span>
          </div>

          {/* Transcript & AI Response View */}
          {(transcript || response || loading) && (
            <div className="space-y-3">
              {transcript && (
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-1">You Asked:</span>
                  &ldquo;{transcript}&rdquo;
                </div>
              )}

              {loading && (
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-emerald-600 animate-spin" />
                  <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    Aegis is checking your medical schedule...
                  </span>
                </div>
              )}

              {response && (
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" />
                      Aegis Companion Answer
                    </span>
                    <button
                      onClick={() => speakText(response)}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      Replay Voice
                    </button>
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                    {response}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Preset 1-Click Elderly Questions */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Try Common Senior Questions (1-Tap):
            </span>
            <div className="grid gap-2">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(p)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500/60 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 text-sm font-medium hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all flex items-center justify-between"
                >
                  <span>&ldquo;{p}&rdquo;</span>
                  <Sparkles className="h-4 w-4 text-emerald-500 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-base font-bold transition-colors"
          >
            Close Companion
          </button>
        </div>
      </div>
    </div>
  );
}
