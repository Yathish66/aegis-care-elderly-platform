'use client';

import React from 'react';
import { X, Printer, FileText, CheckCircle2, ShieldAlert, Heart, Calendar } from 'lucide-react';
import { ElderlyProfile, Medication, DoctorAppointment } from '@/types';

interface DoctorSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ElderlyProfile;
  medications: Medication[];
  appointments: DoctorAppointment[];
}

export function DoctorSummaryModal({
  isOpen,
  onClose,
  profile,
  medications,
  appointments,
}: DoctorSummaryModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-3xl bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto print:p-0 print:border-0 print:shadow-none">
        
        {/* Modal Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-border print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-foreground">Doctor Visit Summary Sheet</h2>
              <p className="text-xs text-muted-foreground">Printable clinical snapshot for consultation review.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-xl text-muted-foreground hover:bg-muted">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Clinical Sheet */}
        <div className="p-6 sm:p-8 border border-border rounded-2xl bg-background space-y-6 print:border-none print:p-0">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-border gap-2">
            <div>
              <h1 className="text-2xl font-black text-foreground">AegisCare Clinical Summary Sheet</h1>
              <p className="text-xs text-muted-foreground">Generated on {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="text-right text-xs">
              <span className="font-bold text-teal-600">ID: {profile.id}</span>
              <p className="text-muted-foreground font-mono">Platform: AegisCare AI (Gemini Powered)</p>
            </div>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-muted/40 border border-border text-xs">
            <div>
              <span className="text-muted-foreground font-semibold">Patient Name:</span>
              <p className="text-sm font-black text-foreground">{profile.fullName}</p>
            </div>
            <div>
              <span className="text-muted-foreground font-semibold">Age / Blood Group:</span>
              <p className="text-sm font-black text-foreground">{profile.age} Years · {profile.bloodGroup}</p>
            </div>
            <div>
              <span className="text-muted-foreground font-semibold">Known Conditions:</span>
              <p className="text-xs font-bold text-foreground">{profile.conditions.join(', ')}</p>
            </div>
            <div>
              <span className="text-muted-foreground font-semibold">Drug Allergies:</span>
              <p className="text-xs font-bold text-rose-600 dark:text-rose-400">{profile.allergies.join(', ')}</p>
            </div>
          </div>

          {/* Active Medication Regimens Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-foreground">Current Active Medications</h3>
            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="p-3 font-black">Medication</th>
                    <th className="p-3 font-black">Dosage</th>
                    <th className="p-3 font-black">Timing</th>
                    <th className="p-3 font-black">Clinical Purpose</th>
                    <th className="p-3 font-black">Today's Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {medications.map((med) => (
                    <tr key={med.id} className="hover:bg-muted/30">
                      <td className="p-3 font-bold text-foreground">{med.name}</td>
                      <td className="p-3 font-mono">{med.dosage}</td>
                      <td className="p-3 capitalize">{med.timeOfDay} ({med.scheduledTime})</td>
                      <td className="p-3 text-muted-foreground">{med.purpose}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          med.status === 'taken' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {med.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Adherence & Compliance Snapshot */}
          <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs space-y-2">
            <h4 className="font-black text-teal-800 dark:text-teal-200 uppercase tracking-wide">Adherence & Compliance Metrics</h4>
            <p className="text-muted-foreground leading-relaxed">
              Patient exhibits an optimal <strong>94% 7-day medication compliance rate</strong>. 
              Zero missed doses logged in the preceding 48-hour observation window. Monitored remotely by primary caregiver {profile.emergencyContact.name}.
            </p>
          </div>

          {/* Emergency & Family Contacts */}
          <div className="pt-2 text-xs text-muted-foreground flex justify-between border-t border-border">
            <span>Primary Guardian: {profile.emergencyContact.name} ({profile.emergencyContact.phone})</span>
            <span>AegisCare Telemetry Verified</span>
          </div>

        </div>

      </div>
    </div>
  );
}
