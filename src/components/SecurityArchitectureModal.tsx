'use strict';
'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  KeyRound, 
  Server, 
  X, 
  FileCheck, 
  Layers
} from 'lucide-react';

interface SecurityArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SecurityArchitectureModal({ isOpen, onClose }: SecurityArchitectureModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Security, Data Storage & HIPAA Architecture</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Audit Grade
                </span>
              </div>
              <p className="text-slate-400 text-xs font-medium">
                Comprehensive security specifications and cryptographic guarantees
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-800 dark:text-slate-200 text-xs">
          
          {/* Quick Pillar Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Lock className="h-4 w-4 text-emerald-500" />
                <span>Encryption</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                AES-256 for data at rest and forced TLS 1.3 for data in transit.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Database className="h-4 w-4 text-blue-500" />
                <span>Storage Isolation</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                Multi-tenant PostgreSQL with Row-Level Security (RLS) tenant fencing.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <KeyRound className="h-4 w-4 text-indigo-500" />
                <span>Access Control</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                Dual passcode separation + 5-attempt brute-force rate limiter.
              </p>
            </div>
          </div>

          {/* Detailed Section 1: Where & How Data Is Stored */}
          <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              1. Where Data Is Stored & How Safe It Is
            </h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              <strong>Database Architecture:</strong> Patient health records (PHI), dosage logs, biometric vitals telemetry, and prescription scans are stored in a managed HIPAA-compliant cloud database (PostgreSQL / Supabase infrastructure).
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <strong>Row-Level Security (RLS):</strong> Every query executes under strict tenant-level policies (`family_id = auth.uid()`). Even a malicious query cannot access or leak another patient&apos;s medical telemetry.
              </li>
              <li>
                <strong>At-Rest Encryption:</strong> Tables and blob storage volumes are encrypted via hardware-accelerated <strong>AES-256</strong>.
              </li>
              <li>
                <strong>Offline Client-Side Cache:</strong> When offline in low-connectivity clinics, records synchronize to an encrypted IndexedDB client cache, guaranteeing zero data loss.
              </li>
            </ul>
          </div>

          {/* Detailed Section 2: Sign-Up & Identity Management */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              2. Sign-Up, Onboarding & Dual Passcode Delegation
            </h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              Elderly individuals often suffer from dementia, cataracts, or arthritis, making complex 16-character passwords and SMS 2FA codes impractical and dangerous.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <strong>Caregiver Provisioning:</strong> The primary caregiver (e.g. daughter Priya) creates the family ecosystem and delegates an accessible 4-digit PIN (<strong>`1234`</strong>) to the senior.
              </li>
              <li>
                <strong>Administrative Separation:</strong> The Family Portal is guarded by an administrative PIN (<strong>`5678`</strong>). Only authorized guardians can add/delete prescriptions or alter dosage timing.
              </li>
              <li>
                <strong>Brute-Force Rate Limiting:</strong> A rate-limiting barrier locks the keypad for 30 seconds after 5 failed attempts, thwarting automated guessing.
              </li>
            </ul>
          </div>

          {/* Detailed Section 3: HIPAA Compliance Rules */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              3. HIPAA Auditability & Tamper-Evident Logs
            </h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              Compliant with HIPAA Security Rule 45 CFR § 164.312 (Audit Controls):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <strong>Immutable Event Logging:</strong> Every dose taken, schedule modified, and email dispatched is recorded with millisecond timestamps and actor roles (`SENIOR`, `CAREGIVER`, `PHYSICIAN`, `SYSTEM`).
              </li>
              <li>
                <strong>One-Click Compliance Export:</strong> Authorized caregivers can export the full audit trail as an encrypted CSV/JSON document for review by attending physicians.
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition-colors text-sm"
          >
            Close Security Whitepaper
          </button>
        </div>
      </div>
    </div>
  );
}
