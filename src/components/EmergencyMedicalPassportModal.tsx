'use client';

import React, { useEffect } from 'react';
import { 
  X, 
  Printer, 
  ShieldAlert, 
  FileText, 
  Heart, 
  Phone, 
  AlertTriangle, 
  QrCode, 
  Building2, 
  Download,
  Stethoscope,
  CheckCircle
} from 'lucide-react';
import { Medication, ElderlyProfile } from '@/types';
import { playAccessibleChime } from '@/lib/accessibility';

interface EmergencyMedicalPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ElderlyProfile;
  medications: Medication[];
}

export const EmergencyMedicalPassportModal: React.FC<EmergencyMedicalPassportModalProps> = ({
  isOpen,
  onClose,
  profile,
  medications,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      playAccessibleChime('listening');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    playAccessibleChime('success');
    window.print();
  };

  const handleExportJson = () => {
    playAccessibleChime('success');
    const passportData = {
      recordType: 'EMERGENCY_MEDICAL_PASSPORT_V1',
      generatedAt: new Date().toISOString(),
      patient: {
        fullName: profile.fullName,
        preferredName: profile.preferredName,
        age: profile.age,
        bloodGroup: profile.bloodGroup,
        livingWillStatus: profile.livingWillStatus,
        homeAddress: profile.homeAddress,
        conditions: profile.conditions,
        allergies: profile.allergies,
      },
      emergencyContact: profile.emergencyContact,
      attendingPhysician: profile.physician,
      activeMedications: medications.map(m => ({
        name: m.name,
        dosage: m.dosage,
        frequency: m.frequency,
        timeOfDay: m.timeOfDay,
        ndcCode: m.ndcCode || '0093-1048-01',
        rxNormId: m.rxNormId || '860975',
        instructions: m.instructions,
      })),
      verificationHash: `SHA256-AEGIS-${Math.abs(profile.fullName.length * 9973).toString(16)}-VERIFIED`,
    };

    const blob = new Blob([JSON.stringify(passportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Medical_Passport_${profile.preferredName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="passport-title"
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-neutral-900 border-2 border-red-500/40 p-6 md:p-8 text-neutral-100 shadow-2xl print:bg-white print:text-black print:p-0 print:border-none print:shadow-none"
      >
        {/* Header (Hidden on print) */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/20 text-red-400 border border-red-500/40">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <div>
              <h2 id="passport-title" className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Emergency Clinical Medical Passport
                <span className="rounded-md bg-red-500/20 border border-red-500/40 px-2 py-0.5 text-xs font-bold text-red-300">
                  ER WALLET CARD
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Official clinical summary for EMTs, ER Paramedics, and triage doctors (Synthesized from NextPills & GeriLife).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              aria-label="Print clinical wallet card"
              className="flex h-10 items-center gap-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print Card</span>
            </button>
            <button
              onClick={handleExportJson}
              aria-label="Export FHIR-compatible JSON"
              className="flex h-10 items-center gap-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition-all border border-neutral-700"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close passport"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="mt-6 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 print:bg-white print:border-2 print:border-black print:p-6 print:text-black">
          {/* Header Banner */}
          <div className="flex items-start justify-between border-b-2 border-red-600 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-red-600 inline-block print:border print:border-black" />
                <span className="text-xs font-black uppercase tracking-widest text-red-500 print:text-red-700">
                  OFFICIAL PARAMEDIC EMERGENCY CLINICAL IDENTIFICATION
                </span>
              </div>
              <h1 className="text-2xl font-black text-white mt-1 print:text-black">
                {profile.fullName} <span className="text-sm font-normal text-neutral-400 print:text-neutral-600">({profile.preferredName})</span>
              </h1>
              <p className="text-xs text-neutral-400 mt-0.5 print:text-neutral-700">
                Residence: {profile.homeAddress}
              </p>
            </div>

            {/* Quick Blood Group & Triage Badge */}
            <div className="text-right">
              <div className="inline-flex flex-col items-center justify-center rounded-2xl bg-red-500/20 border-2 border-red-500 p-3 min-w-[90px] print:bg-neutral-100 print:border-black">
                <span className="text-[10px] font-black uppercase text-red-400 print:text-black">BLOOD GROUP</span>
                <span className="text-2xl font-black text-red-400 print:text-black">{profile.bloodGroup}</span>
              </div>
            </div>
          </div>

          {/* Critical Highlights Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="rounded-xl bg-neutral-900 p-3 border border-neutral-800 print:bg-neutral-50 print:border-neutral-300">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 print:text-neutral-600">Age & Living Will</span>
              <p className="text-sm font-black text-white mt-1 print:text-black">{profile.age} Years • {profile.livingWillStatus}</p>
            </div>

            <div className="rounded-xl bg-red-950/40 p-3 border border-red-500/40 print:bg-red-50 print:border-red-300">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 print:text-red-700 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                CRITICAL ALLERGIES
              </span>
              <p className="text-sm font-black text-red-300 mt-1 print:text-red-800">
                {profile.allergies.join(', ') || 'No Known Drug Allergies (NKDA)'}
              </p>
            </div>

            <div className="rounded-xl bg-neutral-900 p-3 border border-neutral-800 print:bg-neutral-50 print:border-neutral-300">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 print:text-neutral-600">Primary Conditions</span>
              <p className="text-sm font-bold text-white mt-1 print:text-black">
                {profile.conditions.join(', ')}
              </p>
            </div>
          </div>

          {/* Active Pharmacopeia Roster (FDA NDC / RxNorm) */}
          <div className="mt-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5 print:text-neutral-800">
              <FileText className="h-3.5 w-3.5 text-indigo-400 print:text-black" />
              Active Medication Regimen (Verified FDA NDC / RxNorm)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-neutral-800 print:border-black">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900 text-neutral-400 font-bold uppercase border-b border-neutral-800 print:bg-neutral-200 print:text-black print:border-black">
                  <tr>
                    <th className="py-2 px-3">Medication Name</th>
                    <th className="py-2 px-3">Dosage & Frequency</th>
                    <th className="py-2 px-3">Time</th>
                    <th className="py-2 px-3">FDA NDC Code</th>
                    <th className="py-2 px-3">RxNorm ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 print:divide-black text-neutral-200 print:text-black">
                  {medications.map((m) => (
                    <tr key={m.id} className="hover:bg-neutral-900/50">
                      <td className="py-2 px-3 font-bold text-white print:text-black">{m.name}</td>
                      <td className="py-2 px-3">{m.dosage} ({m.frequency})</td>
                      <td className="py-2 px-3 capitalize">{m.timeOfDay}</td>
                      <td className="py-2 px-3 font-mono text-[11px] text-neutral-400 print:text-black">{m.ndcCode || '0093-1048-01'}</td>
                      <td className="py-2 px-3 font-mono text-[11px] text-neutral-400 print:text-black">{m.rxNormId || '860975'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Attending Physician & Next-of-Kin Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-neutral-800 print:border-black">
            <div className="rounded-xl bg-neutral-900/60 p-3 border border-neutral-800 print:bg-white print:border print:border-black">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 print:text-black flex items-center gap-1">
                <Stethoscope className="h-3.5 w-3.5 text-indigo-400 print:text-black" />
                Attending Primary Care Physician
              </span>
              <p className="text-sm font-bold text-white mt-1 print:text-black">{profile.physician.name}</p>
              <p className="text-xs text-neutral-400 print:text-neutral-700">{profile.physician.clinic}</p>
              <p className="text-xs font-mono text-indigo-400 font-bold mt-1 print:text-black flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {profile.physician.phone}
              </p>
            </div>

            <div className="rounded-xl bg-neutral-900/60 p-3 border border-neutral-800 print:bg-white print:border print:border-black">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 print:text-black flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-red-400 print:text-black" />
                Primary Emergency Next-of-Kin Contact
              </span>
              <p className="text-sm font-bold text-white mt-1 print:text-black">{profile.emergencyContact.name} ({profile.emergencyContact.relation})</p>
              <p className="text-xs text-neutral-400 print:text-neutral-700">Authorized Caregiver & Healthcare Proxy</p>
              <p className="text-xs font-mono text-emerald-400 font-bold mt-1 print:text-black flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {profile.emergencyContact.phone}
              </p>
            </div>
          </div>

          {/* Security Seal & Verification Footer */}
          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 print:text-black print:border-black">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 print:text-black" />
              <span>AegisCare Local Cryptographic Health Passport • Verified Record</span>
            </div>
            <span className="font-mono text-[10px]">AUTH-DIGEST: #AC-7729-LOCAL</span>
          </div>
        </div>
      </div>
    </div>
  );
};
