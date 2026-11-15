'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Pill, 
  ShieldAlert, 
  Camera, 
  Plus, 
  FileText, 
  Mail, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  Users,
  Send,
  Trash2,
  Edit,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Medication, DoctorAppointment, Caregiver, AdherenceDay, SafetyAlert, ElderlyProfile } from '@/types';

interface FamilyPortalProps {
  profile: ElderlyProfile;
  medications: Medication[];
  appointments: DoctorAppointment[];
  caregivers: Caregiver[];
  adherenceHistory: AdherenceDay[];
  safetyAlerts: SafetyAlert[];
  onOpenScanner: () => void;
  onOpenDoctorSummary: () => void;
  onOpenAddMedication: () => void;
  onOpenAddAppointment: () => void;
  onTriggerMissedDoseEscalation: () => void;
  onDeleteMedication: (id: string) => void;
  onToggleDoseStatus: (id: string) => void;
  onRunGeminiSafetyCheck: () => void;
  isAnalyzingSafety: boolean;
}

export function FamilyPortal({
  profile,
  medications,
  appointments,
  caregivers,
  adherenceHistory,
  safetyAlerts,
  onOpenScanner,
  onOpenDoctorSummary,
  onOpenAddMedication,
  onOpenAddAppointment,
  onTriggerMissedDoseEscalation,
  onDeleteMedication,
  onToggleDoseStatus,
  onRunGeminiSafetyCheck,
  isAnalyzingSafety,
}: FamilyPortalProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'schedule' | 'appointments' | 'escalation'>('analytics');

  // Adherence calculations
  const totalWeeklyDoses = adherenceHistory.reduce((acc, d) => acc + d.totalDoses, 0);
  const totalTakenDoses = adherenceHistory.reduce((acc, d) => acc + d.takenDoses, 0);
  const weeklyAdherenceScore = Math.round((totalTakenDoses / totalWeeklyDoses) * 100);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Family Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white border border-teal-500/20 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Passcode Verified Caregiver Ecosystem</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Caregiver Portal for {profile.fullName} (Age {profile.age})
            </h1>
            <p className="text-slate-300 text-sm font-medium">
              Real-time adherence monitoring, remote schedule updates, and proactive escalation alerts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenScanner}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-700/30 transition-all active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Prescription (Gemini OCR)</span>
            </button>

            <button
              onClick={onOpenDoctorSummary}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold text-xs sm:text-sm transition-all"
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Doctor Visit Summary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Portal Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 bg-muted/60 p-1.5 rounded-2xl border border-border">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
            activeTab === 'analytics'
              ? 'bg-background text-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-teal-600" />
          <span>Adherence & Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
            activeTab === 'schedule'
              ? 'bg-background text-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Pill className="w-4 h-4 text-teal-600" />
          <span>Medication Schedule ({medications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
            activeTab === 'appointments'
              ? 'bg-background text-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Calendar className="w-4 h-4 text-teal-600" />
          <span>Doctor Appointments ({appointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('escalation')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
            activeTab === 'escalation'
              ? 'bg-background text-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Mail className="w-4 h-4 text-teal-600" />
          <span>Escalation & Email Alerts</span>
        </button>
      </div>

      {/* TAB 1: ANALYTICS & OVERVIEW */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">

          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-muted-foreground uppercase">Weekly Adherence</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  OPTIMAL
                </span>
              </div>
              <div className="text-3xl font-black text-foreground">{weeklyAdherenceScore}%</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>25 of 26 doses taken on schedule</span>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-muted-foreground uppercase">Current Streak</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  EXCELLENT
                </span>
              </div>
              <div className="text-3xl font-black text-foreground">12 Days</div>
              <p className="text-xs text-muted-foreground mt-1 font-semibold">
                Zero missed doses in past 48 hours
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-muted-foreground uppercase">Active Prescriptions</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
                  VERIFIED
                </span>
              </div>
              <div className="text-3xl font-black text-foreground">{medications.length} Regimens</div>
              <p className="text-xs text-muted-foreground mt-1 font-semibold">
                Covering Diabetes, BP & Statin
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-muted-foreground uppercase">Next Doctor Visit</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20">
                  IN 5 DAYS
                </span>
              </div>
              <div className="text-xl font-black text-foreground truncate">Dr. Ramesh Patel</div>
              <p className="text-xs text-muted-foreground mt-1 font-semibold">
                Nov 20 · 10:30 AM (Apex Heart Care)
              </p>
            </div>

          </div>

          {/* 7-Day Adherence Timeline Chart */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-foreground">7-Day Dose Compliance Trend</h3>
                <p className="text-xs text-muted-foreground font-medium">Daily adherence records logged across senior and family access</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/20">
                Weekly Target: 90%+
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-4">
              {adherenceHistory.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="w-full bg-muted/60 h-32 rounded-2xl relative flex items-end p-1.5 overflow-hidden">
                    <div 
                      className={`w-full rounded-xl transition-all duration-500 ${
                        day.percentage === 100 
                          ? 'bg-emerald-500' 
                          : day.percentage >= 75 
                          ? 'bg-amber-500' 
                          : 'bg-rose-500'
                      }`}
                      style={{ height: `${day.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-foreground">{day.day}</span>
                  <span className="text-[10px] font-bold text-muted-foreground">{day.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gemini AI Drug-Drug Interaction Guardian */}
          <div className="p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-foreground flex items-center gap-2">
                    <span>Google Gemini Clinical Safety Guardian</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-white">AI EVALUATED</span>
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    Continuous monitoring of multi-drug regimens and dietary contraindications
                  </p>
                </div>
              </div>

              <button
                onClick={onRunGeminiSafetyCheck}
                disabled={isAnalyzingSafety}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnalyzingSafety ? 'Gemini Reasoning...' : 'Re-verify Drug Safety'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {safetyAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-2xl bg-card border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      {alert.title}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    {alert.description}
                  </p>
                  <p className="text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-500/10 p-2 rounded-xl border border-teal-500/20">
                    💡 Action: {alert.actionRecommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MEDICATION SCHEDULE MANAGER */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-foreground">Current Active Medication Regimens</h2>
              <p className="text-xs text-muted-foreground">Authorized caretakers can add, edit, or adjust dose timings with immediate sync to Senior View.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenScanner}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>Scan Rx (Gemini Vision)</span>
              </button>

              <button
                onClick={onOpenAddMedication}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Medication</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medications.map((med) => (
              <div key={med.id} className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                      {med.timeOfDay} · {med.scheduledTime}
                    </span>
                    <h3 className="text-lg font-black text-foreground">{med.name}</h3>
                    <p className="text-xs font-bold text-teal-600 dark:text-teal-400">Dosage: {med.dosage} ({med.frequency})</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onToggleDoseStatus(med.id)}
                      title="Toggle Taken/Pending"
                      className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                        med.status === 'taken' 
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' 
                          : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                      }`}
                    >
                      {med.status === 'taken' ? '✓ Taken' : 'Pending'}
                    </button>
                    <button
                      onClick={() => onDeleteMedication(med.id)}
                      title="Remove Medication"
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground bg-muted/40 p-3 rounded-xl border border-border/60">
                  <p className="font-semibold text-foreground">Instructions: {med.instructions}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Clinical Goal: {med.purpose}</p>
                  {med.foodWarning && (
                    <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 mt-1">⚠️ Advisory: {med.foodWarning}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DOCTOR APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-foreground">Scheduled Doctor Consultations</h2>
              <p className="text-xs text-muted-foreground">Keep doctor routines synchronized; proactive reminders are automatically dispatched to family members.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenDoctorSummary}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Clinical Summary Sheet</span>
              </button>

              <button
                onClick={onOpenAddAppointment}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Appointment</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20">
                      {apt.specialty}
                    </span>
                    <h3 className="text-lg font-black text-foreground">{apt.doctorName}</h3>
                    <p className="text-xs font-medium text-muted-foreground">{apt.clinic}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-teal-600">{apt.date}</div>
                    <div className="text-xs text-muted-foreground font-bold">{apt.time}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-muted/60 border border-border text-xs space-y-1.5">
                  <p className="font-bold text-foreground">Purpose: {apt.purpose}</p>
                  {apt.prepInstructions && (
                    <p className="text-muted-foreground font-medium">📋 Prep: {apt.prepInstructions}</p>
                  )}
                  <p className="text-[11px] text-teal-600 font-mono font-semibold">📞 Clinic: {apt.contactNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ESCALATION & PROACTIVE EMAIL ALERTS */}
      {activeTab === 'escalation' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-foreground">Proactive Caregiver Notification Ecosystem</h2>
              <p className="text-xs text-muted-foreground">Automated multi-channel alerts keep designated family members notified of missed doses and appointments.</p>
            </div>

            <button
              onClick={onTriggerMissedDoseEscalation}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Simulate Missed Dose Escalation Email</span>
            </button>
          </div>

          {/* Linked Family Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caregivers.map((cg) => (
              <div key={cg.id} className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-foreground">{cg.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/20">
                      {cg.relationship}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">{cg.email}</p>
                  <p className="text-xs text-muted-foreground">{cg.phone}</p>
                </div>

                <div className="text-right space-y-1 text-[11px] font-bold text-emerald-600">
                  <div>✓ Missed Dose Alerts: Active</div>
                  <div>✓ Appointment Sync: Active</div>
                </div>
              </div>
            ))}
          </div>

          {/* Escalation Policy Explainer */}
          <div className="p-6 rounded-3xl bg-muted/40 border border-border space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-600" />
              <span>How AegisCare Proactive Escalation Works</span>
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-5 font-medium leading-relaxed">
              <li><strong>T-15 Minutes:</strong> Senior View displays visual gentle reminder and plays voice audio readout if activated.</li>
              <li><strong>Scheduled Time:</strong> Dose status changes to pending. Dadi can tap "I TOOK THIS" in 1 click.</li>
              <li><strong>T+60 Minutes (Missed Dose Trigger):</strong> If dose is neither taken nor snoozed, the serverless notification engine automatically dispatches high-priority email alerts to <strong>Priya Sharma</strong> and <strong>Rahul Sharma</strong>.</li>
              <li><strong>T-24 Hours Before Doctor Visit:</strong> Caretakers receive the pre-compiled clinical summary sheet with medication logs ready for the consultation.</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}
