'use client';

import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Users, 
  User, 
  Sparkles, 
  Bell, 
  PhoneCall, 
  Sun, 
  Moon, 
  ZoomIn, 
  ZoomOut,
  Lock
} from 'lucide-react';

interface NavbarProps {
  currentPersona: 'senior' | 'family';
  onSwitchPersona: (persona: 'senior' | 'family') => void;
  onOpenJudgeTour: () => void;
  onOpenNotifications: () => void;
  unreadEmailCount: number;
  seniorFontSize: 'normal' | 'large' | 'extra-large';
  onToggleFontSize: () => void;
  onEmergencyCall: () => void;
}

export function Navbar({
  currentPersona,
  onSwitchPersona,
  onOpenJudgeTour,
  onOpenNotifications,
  unreadEmailCount,
  seniorFontSize,
  onToggleFontSize,
  onEmergencyCall,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  AegisCare AI
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                  <Sparkles className="w-3 h-3 text-teal-500" />
                  Gemini 2.5 Flash
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-medium hidden sm:block">
                Interconnected Elderly Care & Medication Ecosystem
              </p>
            </div>
          </div>

          {/* Persona Switcher (Passcode Protected) */}
          <div className="flex items-center bg-muted/80 p-1.5 rounded-2xl border border-border/80 shadow-inner">
            <button
              onClick={() => onSwitchPersona('senior')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentPersona === 'senior'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Senior View</span>
            </button>

            <button
              onClick={() => onSwitchPersona('family')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentPersona === 'family'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Family & Caregiver</span>
              <Lock className="w-3 h-3 opacity-60" />
            </button>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            
            {/* Font Zoom for Accessibility */}
            {currentPersona === 'senior' && (
              <button
                onClick={onToggleFontSize}
                title="Toggle Large Readable Text"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card hover:bg-accent text-xs font-bold transition-all"
              >
                <ZoomIn className="w-4 h-4 text-emerald-600" />
                <span className="hidden md:inline font-mono">
                  {seniorFontSize === 'normal' ? 'Standard' : seniorFontSize === 'large' ? 'Large 125%' : 'Extra Large 150%'}
                </span>
              </button>
            )}

            {/* Email Notification Drawer Button */}
            <button
              onClick={onOpenNotifications}
              title="Proactive Email Notification Center"
              className="relative p-2.5 rounded-xl border border-border bg-card hover:bg-accent transition-all text-muted-foreground hover:text-foreground"
            >
              <Bell className="w-5 h-5" />
              {unreadEmailCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-black flex items-center justify-center shadow-md animate-pulse">
                  {unreadEmailCount}
                </span>
              )}
            </button>

            {/* IIT Kharagpur Jury Tour Mode */}
            <button
              onClick={onOpenJudgeTour}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm font-black shadow-md shadow-orange-500/20 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Judge Walkthrough</span>
              <span className="sm:hidden">Tour</span>
            </button>

            {/* Emergency SOS Call */}
            <button
              onClick={onEmergencyCall}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs sm:text-sm font-bold transition-all"
            >
              <PhoneCall className="w-4 h-4 text-rose-500 animate-bounce" />
              <span className="hidden lg:inline">SOS Help</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
