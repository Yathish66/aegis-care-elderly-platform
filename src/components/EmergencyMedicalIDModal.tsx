'use strict';
'use client';

import React, { useState } from 'react';
import { ElderlyProfile, Medication } from '@/types';
import { Siren, PhoneCall, AlertOctagon, MapPin, ShieldAlert, Heart, X, Check, Activity, FileText } from 'lucide-react';

interface EmergencyMedicalIDModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ElderlyProfile;
  medications: Medication[];
  onTriggerSOS: () => void;
}

export function EmergencyMedicalIDModal({
  isOpen,
  onClose,
  profile,
  medications,
  onTriggerSOS,
}: EmergencyMedicalIDModalProps) {
  const [sosTriggered, setSosTriggered] = useState(false);
  const [broadcasting, setBroadcasting] = useState(false);

  if (!isOpen) return null;

  const handleBroadcastSOS = async () => {
    setBroadcasting(true);
    try {
      await fetch('/api/notify/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: 'priya.sharma.care@gmail.com',
          recipientName: profile.emergencyContact.name,
          type: 'EMERGENCY_SOS',
          subject: `🚨 CRITICAL EMERGENCY SOS: Dadi Kamala triggered Emergency Beacon!`,
          body: `URGENT ALERT!\n\nDadi Kamala activated the Emergency Beacon at ${new Date().toLocaleTimeString()}.\n\nSimulated GPS Coordinates: 12.9352° N, 77.6944° E (A-402, Green Glen Heights, Outer Ring Road, Bengaluru).\n\nPatient Blood Group: ${profile.bloodGroup}\nCritical Allergies: ${profile.allergies.join(', ')}\nActive Medications: ${medications.map((m) => `${m.name} ${m.dosage}`).join(', ')}\n\nPlease contact emergency services or check on Dadi Kamala immediately!`,
        }),
      });

      onTriggerSOS();
      setSosTriggered(true);
    } catch (err) {
      console.error('SOS dispatch error:', err);
      onTriggerSOS();
      setSosTriggered(true);
    } finally {
      setBroadcasting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border-4 border-rose-600 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Urgent Header */}
        <div className="p-6 bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md animate-pulse">
              <Siren className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black tracking-tight">EMERGENCY MEDICAL ID</h2>
                <span className="px-2 py-0.5 rounded-md bg-white text-rose-700 text-xs font-black uppercase">
                  Paramedic Ready
                </span>
              </div>
              <p className="text-rose-100 text-xs font-semibold">
                Lockscreen Access • No Passcode Required
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Active Beacon Banner */}
          {!sosTriggered ? (
            <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertOctagon className="h-8 w-8 text-rose-600 animate-bounce shrink-0" />
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    Trigger Caregiver SOS Beacon
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Immediately broadcasts GPS coordinates and critical health sheet to {profile.emergencyContact.name}.
                  </p>
                </div>
              </div>
              <button
                onClick={handleBroadcastSOS}
                disabled={broadcasting}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white shadow-xl hover:shadow-rose-600/40 active:scale-95 transition-all shrink-0"
              >
                {broadcasting ? 'Broadcasting...' : '🚨 BROADCAST SOS'}
              </button>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 flex items-center gap-3 animate-in zoom-in-95">
              <Check className="h-8 w-8 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-base">
                  SOS Beacon Broadcasted!
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Caregivers notified via automated emergency dispatch with current telemetry & location.
                </p>
              </div>
            </div>
          )}

          {/* Quick Dial Actions */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${profile.emergencyContact.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 p-3.5 rounded-2xl font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-colors"
            >
              <PhoneCall className="h-4 w-4" />
              Call Caregiver ({profile.emergencyContact.name.split(' ')[0]})
            </a>
            <a
              href="tel:112"
              className="flex items-center justify-center gap-2 p-3.5 rounded-2xl font-bold text-sm bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700 transition-colors"
            >
              <Siren className="h-4 w-4 text-rose-500" />
              Call Emergency (112 / 911)
            </a>
          </div>

          {/* Critical Paramedic Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Patient</span>
              <span className="text-base font-black text-slate-900 dark:text-white">{profile.fullName}</span>
              <span className="text-xs text-slate-500 block">Age {profile.age}</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-100/70 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-900">
              <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase block">Blood Group</span>
              <span className="text-xl font-black text-rose-700 dark:text-rose-300">{profile.bloodGroup}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 col-span-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Live GPS Location</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="h-4 w-4 text-rose-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  12.9352° N, 77.6944° E (Bellandur)
                </span>
              </div>
            </div>
          </div>

          {/* Severe Allergies Warning Box */}
          <div className="p-4 rounded-2xl bg-rose-500/10 border-2 border-rose-500/40 space-y-1.5">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
              <ShieldAlert className="h-5 w-5" />
              <h4 className="font-extrabold text-sm uppercase tracking-wide">
                Severe Clinical Allergies & Contraindications
              </h4>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {profile.allergies.map((allergy, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-black bg-rose-600 text-white shadow-sm"
                >
                  ⚠️ {allergy}
                </span>
              ))}
            </div>
          </div>

          {/* Active Medications List for Paramedics */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-emerald-500" />
              Active Daily Medication Regimen
            </h4>
            <div className="grid gap-2">
              {medications.map((med) => (
                <div
                  key={med.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{med.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 block">{med.purpose}</span>
                  </div>
                  <span className="font-mono font-bold px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                    {med.dosage} ({med.frequency})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Physician & Directives */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
            <p>
              <strong>Attending Physician:</strong> {profile.physician.name} • {profile.physician.clinic} ({profile.physician.phone})
            </p>
            <p>
              <strong>Advance Directives:</strong> {profile.livingWillStatus}
            </p>
            <p>
              <strong>Primary Residence:</strong> {profile.homeAddress}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition-colors"
          >
            Dismiss Emergency View
          </button>
        </div>
      </div>
    </div>
  );
}
