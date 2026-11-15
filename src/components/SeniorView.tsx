'use strict';
'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Volume2, 
  AlertCircle, 
  Sun, 
  CloudSun, 
  Moon, 
  ShieldAlert, 
  Sparkles,
  PhoneCall,
  Heart,
  Pill,
  Coffee,
  Check,
  Mic,
  Camera,
  Siren,
  HelpCircle
} from 'lucide-react';
import { Medication, ElderlyProfile } from '@/types';
import confetti from 'canvas-confetti';

interface SeniorViewProps {
  profile: ElderlyProfile;
  medications: Medication[];
  onMarkDoseTaken: (medId: string) => void;
  onSnoozeDose: (medId: string) => void;
  seniorFontSize: 'normal' | 'large' | 'extra-large';
  onEmergencyCall: () => void;
  onOpenVoiceAssistant?: () => void;
  onOpenPillIdentifier?: () => void;
  onOpenEmergencyModal?: () => void;
}

export function SeniorView({
  profile,
  medications,
  onMarkDoseTaken,
  onSnoozeDose,
  seniorFontSize,
  onEmergencyCall,
  onOpenVoiceAssistant,
  onOpenPillIdentifier,
  onOpenEmergencyModal,
}: SeniorViewProps) {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening' | 'bedtime'>('all');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filtered medications
  const filteredMeds = selectedTimeFilter === 'all' 
    ? medications 
    : medications.filter(m => m.timeOfDay === selectedTimeFilter);

  const takenCount = medications.filter(m => m.status === 'taken').length;
  const totalCount = medications.length;
  const adherencePercent = Math.round((takenCount / totalCount) * 100);

  // Font size multiplier classes
  const fontStyles = {
    normal: {
      heading: 'text-2xl sm:text-3xl',
      subheading: 'text-base sm:text-lg',
      medName: 'text-xl sm:text-2xl',
      body: 'text-sm sm:text-base',
      btn: 'text-base sm:text-lg py-4 px-6',
    },
    large: {
      heading: 'text-3xl sm:text-4xl',
      subheading: 'text-lg sm:text-xl',
      medName: 'text-2xl sm:text-3xl',
      body: 'text-base sm:text-lg',
      btn: 'text-lg sm:text-xl py-5 px-8',
    },
    'extra-large': {
      heading: 'text-4xl sm:text-5xl',
      subheading: 'text-xl sm:text-2xl',
      medName: 'text-3xl sm:text-4xl',
      body: 'text-lg sm:text-xl font-medium',
      btn: 'text-xl sm:text-2xl py-6 px-10 font-black',
    },
  }[seniorFontSize];

  // Voice speech synthesis for elderly accessibility
  const handleVoiceReadout = () => {
    if (!('speechSynthesis' in window)) {
      alert('Voice readout not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const remainingMeds = medications.filter(m => m.status !== 'taken');
    let speechText = `Namaste ${profile.preferredName}. Today you have taken ${takenCount} out of ${totalCount} medications. `;

    if (remainingMeds.length > 0) {
      speechText += `Your next upcoming medicine is ${remainingMeds[0].name}, dosage ${remainingMeds[0].dosage}, scheduled for ${remainingMeds[0].scheduledTime}. ${remainingMeds[0].instructions}.`;
    } else {
      speechText += 'Wonderful job! You have taken all your scheduled medications for today.';
    }

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleTakeMedication = (id: string) => {
    onMarkDoseTaken(id);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#059669', '#10B981', '#34D399', '#6EE7B7'],
    });
  };

  return (
    <div className="space-y-6 pb-12">

      {/* Senior Warm Hero Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white shadow-xl shadow-teal-900/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-bold tracking-wide">
              <span>🌸 Dadi's Daily Care Assistant</span>
            </div>
            <h1 className={`${fontStyles.heading} font-black tracking-tight`}>
              Good Day, {profile.preferredName}!
            </h1>
            <p className={`${fontStyles.subheading} text-teal-100 font-medium`}>
              Here are your medicines for today. Stay healthy and smiling.
            </p>
          </div>

          {/* Quick Audio Readout & Adherence Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleVoiceReadout}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
                isSpeaking 
                  ? 'bg-amber-400 text-amber-950 animate-pulse' 
                  : 'bg-white text-teal-900 hover:bg-teal-50'
              }`}
            >
              <Volume2 className="w-6 h-6 text-teal-600" />
              <span className="text-base font-extrabold">
                {isSpeaking ? 'Reading Aloud...' : 'Read Aloud My Medicines'}
              </span>
            </button>

            <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 text-center">
              <div className="text-xs uppercase tracking-wider text-teal-200 font-semibold">Today's Progress</div>
              <div className="text-2xl font-black">{takenCount} / {totalCount} Taken ({adherencePercent}%)</div>
            </div>
          </div>

        </div>
      </div>

      {/* Senior Smart Quick Action Cards (Voice Companion, Pill Identifier, SOS) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Voice Companion Button */}
        <button
          onClick={onOpenVoiceAssistant}
          className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border-2 border-emerald-500/30 hover:border-emerald-500 hover:shadow-lg transition-all text-left flex items-center gap-4 group"
        >
          <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
            <Mic className="h-7 w-7" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Speak to Aegis
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Voice Companion
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Ask &ldquo;Did I take my pill?&rdquo; or any question
            </p>
          </div>
        </button>

        {/* AI Pill Photo Identifier */}
        <button
          onClick={onOpenPillIdentifier}
          className="p-5 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 border-2 border-blue-500/30 hover:border-blue-500 hover:shadow-lg transition-all text-left flex items-center gap-4 group"
        >
          <div className="p-4 rounded-2xl bg-blue-600 text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
            <Camera className="h-7 w-7" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Gemini Vision
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Identify Loose Pill
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Check unknown tablets before swallowing
            </p>
          </div>
        </button>

        {/* Paramedic Emergency Medical ID */}
        <button
          onClick={onOpenEmergencyModal}
          className="p-5 rounded-3xl bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/20 border-2 border-rose-500/40 hover:border-rose-500 hover:shadow-lg transition-all text-left flex items-center gap-4 group"
        >
          <div className="p-4 rounded-2xl bg-rose-600 text-white shadow-md group-hover:scale-105 transition-transform shrink-0 animate-pulse">
            <Siren className="h-7 w-7" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              Paramedic Ready
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Emergency Medical ID
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Allergies, GPS location & 1-tap SOS
            </p>
          </div>
        </button>
      </div>

      {/* Time-of-Day Filter Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-muted/60 p-2 rounded-2xl border border-border">
        <button
          onClick={() => setSelectedTimeFilter('all')}
          className={`py-3 px-4 rounded-xl text-center font-bold text-sm sm:text-base transition-all ${
            selectedTimeFilter === 'all'
              ? 'bg-background text-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          All Medicines ({totalCount})
        </button>

        <button
          onClick={() => setSelectedTimeFilter('morning')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-center font-bold text-sm sm:text-base transition-all ${
            selectedTimeFilter === 'morning'
              ? 'bg-amber-500 text-white shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Sun className="w-4 h-4 text-amber-400" />
          <span>Morning (8-9 AM)</span>
        </button>

        <button
          onClick={() => setSelectedTimeFilter('afternoon')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-center font-bold text-sm sm:text-base transition-all ${
            selectedTimeFilter === 'afternoon'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <CloudSun className="w-4 h-4 text-orange-300" />
          <span>Afternoon (1 PM)</span>
        </button>

        <button
          onClick={() => setSelectedTimeFilter('evening')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-center font-bold text-sm sm:text-base transition-all ${
            selectedTimeFilter === 'evening'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Moon className="w-4 h-4 text-indigo-300" />
          <span>Evening</span>
        </button>

        <button
          onClick={() => setSelectedTimeFilter('bedtime')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-center font-bold text-sm sm:text-base transition-all ${
            selectedTimeFilter === 'bedtime'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Moon className="w-4 h-4 text-purple-300" />
          <span>Bedtime (9:30 PM)</span>
        </button>
      </div>

      {/* Medication Cards List */}
      <div className="grid gap-4">
        {filteredMeds.map((med) => {
          const isTaken = med.status === 'taken';

          return (
            <div
              key={med.id}
              className={`p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 ${
                isTaken
                  ? 'bg-emerald-500/5 border-emerald-500/30 opacity-90'
                  : 'bg-card border-border shadow-lg shadow-black/5 hover:border-teal-500/40'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left: Pill Visual Details */}
                <div className="flex items-start gap-4 sm:gap-6">
                  
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border-2 shadow-inner flex-shrink-0 ${med.pillColor}`}>
                    {isTaken ? (
                      <Check className="w-10 h-10 text-emerald-600" />
                    ) : (
                      <Pill className="w-10 h-10" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-muted text-muted-foreground">
                        {med.scheduledTime} • {med.timeOfDay}
                      </span>
                      {isTaken ? (
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Taken ({med.lastTakenAt || 'Today'})
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/20">
                          Due Today
                        </span>
                      )}
                    </div>

                    <h2 className={`${fontStyles.medName} font-black text-foreground`}>
                      {med.name} <span className="text-muted-foreground font-bold">({med.dosage})</span>
                    </h2>

                    <p className={`${fontStyles.body} text-muted-foreground font-medium flex items-center gap-2`}>
                      <Coffee className="w-4 h-4 text-amber-500" />
                      <span>{med.instructions}</span>
                    </p>

                    <div className="text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-3 py-1.5 rounded-xl inline-block">
                      🎯 Purpose: {med.purpose}
                    </div>

                    {med.foodWarning && (
                      <div className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>Food Advisory: {med.foodWarning}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Giant 1-Tap Take Action Button */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
                  {!isTaken ? (
                    <>
                      <button
                        onClick={() => handleTakeMedication(med.id)}
                        className={`w-full ${fontStyles.btn} rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-3 active:scale-95 transition-all`}
                      >
                        <CheckCircle2 className="w-7 h-7" />
                        <span>I TOOK THIS</span>
                      </button>

                      <button
                        onClick={() => onSnoozeDose(med.id)}
                        className="w-full py-3.5 px-6 rounded-2xl bg-muted hover:bg-muted/80 text-foreground font-bold text-sm sm:text-base border border-border flex items-center justify-center gap-2 transition-all"
                      >
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span>Remind in 15 mins</span>
                      </button>
                    </>
                  ) : (
                    <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
                      <div className="text-emerald-600 dark:text-emerald-400 font-black text-lg flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-6 h-6" />
                        <span>Dose Completed</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Notified daughter Priya on portal
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Emergency Assistance Bottom Banner */}
      <div className="rounded-3xl p-6 bg-rose-500/10 border-2 border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 flex-shrink-0">
            <Heart className="w-7 h-7 fill-white" />
          </div>
          <div>
            <h3 className="text-lg font-black text-foreground">Need Immediate Help or Feeling Unwell?</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Call your primary caregiver: {profile.emergencyContact.name} ({profile.emergencyContact.phone})
            </p>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={onOpenEmergencyModal}
            className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-black text-base shadow-lg shadow-rose-700/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Siren className="w-5 h-5 animate-pulse" />
            <span>Open Emergency Card</span>
          </button>
          <button
            onClick={onEmergencyCall}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-base shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <PhoneCall className="w-5 h-5 animate-bounce" />
            <span>Call Priya</span>
          </button>
        </div>
      </div>

    </div>
  );
}
