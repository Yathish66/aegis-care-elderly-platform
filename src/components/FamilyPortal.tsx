'use strict';
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
  ChevronRight,
  Activity,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { Medication, DoctorAppointment, Caregiver, AdherenceDay, SafetyAlert, ElderlyProfile, VitalReading } from '@/types';
import { VitalsTracker } from '@/components/VitalsTracker';

interface FamilyPortalProps {
  profile: ElderlyProfile;
  medications: Medication[];
  appointments: DoctorAppointment[];
  caregivers: Caregiver[];
  adherenceHistory: AdherenceDay[];
  safetyAlerts: SafetyAlert[];
  vitals: VitalReading[];
  onAddVital: (vital: VitalReading) => void;
  onOpenScanner: () => void;
  onOpenDoctorSummary: () => void;
  onOpenAddMedication: () => void;
  onOpenAddAppointment: () => void;
  onOpenPharmacyRefill: () => void;
  onOpenAuditTrail: () => void;
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
  vitals,
  onAddVital,
  onOpenScanner,
  onOpenDoctorSummary,
  onOpenAddMedication,
  onOpenAddAppointment,
  onOpenPharmacyRefill,
  onOpenAuditTrail,
  onTriggerMissedDoseEscalation,
  onDeleteMedication,
  onToggleDoseStatus,
  onRunGeminiSafetyCheck,
  isAnalyzingSafety,
}: FamilyPortalProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'schedule' | 'vitals' | 'pharmacy' | 'appointments' | 'escalation'>('analytics');

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
              Real-time adherence monitoring, biometrics telemetry, remote pharmacy refills, and proactive escalation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenPharmacyRefill}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-700/30 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pharmacy Hub</span>
            </button>

            <button
              onClick={onOpenAuditTrail}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold text-xs sm:text-sm transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Audit Trail</span>
            </button>

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
          onClick={() => setActiveTab('vitals')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
            activeTab === 'vitals'
              ? 'bg-background text-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>Vitals & Correlation</span>
        </button>

        <button
          onClick={() => setActiveTab('pharmacy')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
            activeTab === 'pharmacy'
              ? 'bg-background text-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-blue-600" />
          <span>Pharmacy & Refills</span>
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
                Under care of Dr. Ramesh Patel
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-muted-foreground uppercase">Next Scheduled Visit</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20">
                  CONFIRMED
                </span>
              </div>
              <div className="text-xl font-black text-foreground truncate">{appointments[0]?.doctorName || 'None'}</div>
              <p className="text-xs text-muted-foreground mt-1 font-semibold">
                {appointments[0]?.date} at {appointments[0]?.time}
              </p>
            </div>

          </div>

          {/* Adherence Chart Bar Visualizer */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-foreground">7-Day Adherence Trajectory</h3>
                <p className="text-xs text-muted-foreground">Historical compliance based on timestamped confirmations</p>
              </div>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Target: 90%+
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 pt-4">
              {adherenceHistory.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="text-xs font-black text-foreground">{day.percentage}%</div>
                  <div className="w-full bg-muted rounded-xl h-36 flex items-end p-1.5 overflow-hidden">
                    <div 
                      className={`w-full rounded-lg transition-all duration-500 ${
                        day.percentage === 100 
                          ? 'bg-gradient-to-t from-emerald-600 to-teal-500 shadow-md shadow-emerald-500/20' 
                          : 'bg-gradient-to-t from-amber-500 to-amber-400'
                      }`}
                      style={{ height: `${day.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">{day.day}</span>
                  <span className="text-[10px] font-medium text-muted-foreground">{day.takenDoses}/{day.totalDoses} doses</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Safety & Drug Interaction Guardian Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/5 via-card to-card border-2 border-amber-500/30 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                    <span>Clinical Drug & Food Interaction Guardian</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400">
                      Gemini 2.5 Flash
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Automated pharmacovigilance scan against senior's active regimen and medical history.
                  </p>
                </div>
              </div>

              <button
                onClick={onRunGeminiSafetyCheck}
                disabled={isAnalyzingSafety}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isAnalyzingSafety ? 'animate-spin' : ''}`} />
                <span>{isAnalyzingSafety ? 'Scanning Regimen...' : 'Re-verify with Gemini'}</span>
              </button>
            </div>

            <div className="grid gap-3 pt-2">
              {safetyAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      {alert.title}
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300">
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    {alert.description}
                  </p>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    💡 Action: {alert.actionRecommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: SCHEDULE MANAGEMENT */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-foreground">Active Medication Regimens</h2>
              <p className="text-xs text-muted-foreground">Authorized caretakers can add, edit, or adjust medication schedules in real-time.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAddMedication}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Medication</span>
              </button>
            </div>
          </div>

          <div className="grid gap-3">
            {medications.map((med) => (
              <div key={med.id} className="p-5 rounded-2xl bg-card border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-foreground">{med.name}</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-muted text-muted-foreground">
                      {med.dosage}
                    </span>
                    <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                      ⏰ {med.scheduledTime} ({med.timeOfDay})
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground font-medium">{med.instructions}</p>
                  <p className="text-[11px] text-teal-600 font-semibold">Purpose: {med.purpose}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleDoseStatus(med.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      med.status === 'taken'
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                  >
                    Status: {med.status === 'taken' ? '✓ Taken' : 'Upcoming'}
                  </button>

                  <button
                    onClick={() => onDeleteMedication(med.id)}
                    className="p-2 rounded-xl text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                    title="Remove Medication"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VITALS & CLINICAL CORRELATION */}
      {activeTab === 'vitals' && (
        <VitalsTracker
          vitals={vitals}
          onAddVital={onAddVital}
          medications={medications}
          profile={profile}
        />
      )}

      {/* TAB 4: PHARMACY & REFILLS */}
      {activeTab === 'pharmacy' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-card border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Pharmacy Inventory & Fulfillment Hub
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Track remaining pill stocks, forecast days of supply, and dispatch 1-click doorstep refill orders.
              </p>
            </div>
            <button
              onClick={onOpenPharmacyRefill}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Launch Refill Center</span>
            </button>
          </div>

          <div className="grid gap-3">
            {medications.map((m) => {
              const remaining = m.remainingPills ?? 15;
              const isLow = remaining <= (m.refillThreshold ?? 5);

              return (
                <div
                  key={m.id}
                  className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
                    isLow
                      ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-base">{m.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">{m.dosage}</span>
                      {isLow && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                          Low Stock: {remaining} left
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Fulfillment: {m.pharmacyName || 'Apollo Pharmacy #104'} • Rx #{m.rxNumber || 'RX-99214'}
                    </p>
                  </div>

                  <button
                    onClick={onOpenPharmacyRefill}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isLow ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm' : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    Order Refill
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: DOCTOR APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-foreground">Upcoming Clinical Consultations</h2>
              <p className="text-xs text-muted-foreground">Keep family members coordinated with prep guidelines and consultation times.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenDoctorSummary}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Print Visit Sheet</span>
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

      {/* TAB 6: ESCALATION & PROACTIVE EMAIL ALERTS */}
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
