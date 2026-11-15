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
  Check
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
}

export function SeniorView({
  profile,
  medications,
  onMarkDoseTaken,
  onSnoozeDose,
  seniorFontSize,
  onEmergencyCall,
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
    utterance.rate = 0.9; // Speak slightly slower and clearer for seniors
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleTakeMedication = (id: string, name: string) => {
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
          <Coffee className="w-4 h-4 text-indigo-300" />
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
      <div className="grid grid-cols-1 gap-6">
        {filteredMeds.map((med) => {
          const isTaken = med.status === 'taken';

          return (
            <div
              key={med.id}
              className={`rounded-3xl border-2 transition-all p-6 sm:p-8 ${
                isTaken
                  ? 'bg-emerald-500/5 border-emerald-500/30 dark:bg-emerald-950/20'
                  : 'bg-card border-border shadow-lg shadow-black/5 hover:border-emerald-500/50'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Medicine Identity & Instructions */}
                <div className="space-y-3 flex-1">
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-extrabold bg-muted text-foreground border border-border">
                      <Clock className="w-4 h-4 text-teal-600" />
                      {med.scheduledTime}
                    </span>

                    <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                      {med.timeOfDay}
                    </span>

                    {isTaken ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        TAKEN TODAY ({med.lastTakenAt || 'Recorded'})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                        <Clock className="w-4 h-4 text-amber-500" />
                        PENDING DOSE
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className={`${fontStyles.medName} font-black text-foreground flex items-center gap-2`}>
                      <Pill className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      <span>{med.name}</span>
                      <span className="text-muted-foreground font-mono text-lg font-bold">({med.dosage})</span>
                    </h2>
                    <p className="text-sm font-semibold text-muted-foreground mt-0.5">
                      For: {med.purpose}
                    </p>
                  </div>

                  {/* Clear Patient Instructions */}
                  <div className="p-4 rounded-2xl bg-muted/60 border border-border/80">
                    <p className={`${fontStyles.body} text-foreground font-semibold`}>
                      💡 <span className="font-bold underline">Instructions:</span> {med.instructions}
                    </p>
                    {med.foodWarning && (
                      <p className="mt-2 text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Food Advisory: {med.foodWarning}</span>
                      </p>
                    )}
                  </div>

                </div>

                {/* Big Action Buttons for Elderly Ease of Use */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[260px] justify-center">
                  {!isTaken ? (
                    <>
                      <button
                        onClick={() => handleTakeMedication(med.id, med.name)}
                        className={`w-full ${fontStyles.btn} rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-3 transition-all`}
                      >
                        <Check className="w-7 h-7 stroke-[3]" />
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

        <button
          onClick={onEmergencyCall}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-base shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <PhoneCall className="w-5 h-5 animate-bounce" />
          <span>Call Priya Sharma</span>
        </button>
      </div>

    </div>
  );
}
