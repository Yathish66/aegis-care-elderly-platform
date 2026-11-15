'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  UserCheck, 
  Sparkles, 
  Heart, 
  AlertTriangle, 
  Lock, 
  Building2, 
  MapPin, 
  RotateCcw,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { ElderlyProfile } from '@/types';
import { INITIAL_PROFILE } from '@/lib/initialData';

interface PatientProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: ElderlyProfile;
  onSaveProfile: (updatedProfile: ElderlyProfile) => void;
  onResetToDefault: () => void;
}

// Preset realistic profiles for testing and live onboarding
const PRESET_PROFILES: { label: string; desc: string; data: ElderlyProfile }[] = [
  {
    label: '👵 Dadi Kamala (Default Demo)',
    desc: 'Age 72, Type-2 Diabetes & Hypertension (Bengaluru, India)',
    data: INITIAL_PROFILE,
  },
  {
    label: '👴 Robert Miller (Alternative Cardiac)',
    desc: 'Age 78, Coronary Artery Disease & Hyperlipidemia',
    data: {
      id: 'elderly-002',
      fullName: 'Robert Miller',
      preferredName: 'Grandpa Bob',
      age: 78,
      seniorPasscode: '1234',
      familyPasscode: '5678',
      bloodGroup: 'O+ Positive',
      conditions: ['Coronary Artery Disease', 'Hyperlipidemia', 'Mild Hearing Loss'],
      allergies: ['Aspirin (GI Bleed Sensitivity)', 'Iodinated Radiocontrast'],
      emergencyContact: {
        name: 'David Miller (Son)',
        phone: '+1 (555) 234-8901',
        relation: 'Son / Durable Healthcare Power of Attorney',
      },
      physician: {
        name: 'Dr. Sarah Jenkins, MD (Cardiology)',
        clinic: 'Mount Sinai Heart Health Pavilion',
        phone: '+1 (555) 890-1234',
      },
      livingWillStatus: 'Do Not Resuscitate (DNR) / Living Will on File with David Miller',
      homeAddress: '742 Evergreen Terrace, Springfield, OR 97477',
    },
  },
  {
    label: '✨ Blank / Enter My Own Family Member',
    desc: 'Clear form to input your real parent or grandparent details',
    data: {
      id: 'elderly-custom-profile',
      fullName: '',
      preferredName: '',
      age: 70,
      seniorPasscode: '1234',
      familyPasscode: '5678',
      bloodGroup: 'B+ Positive',
      conditions: [],
      allergies: [],
      emergencyContact: {
        name: '',
        phone: '',
        relation: 'Primary Caregiver / Healthcare Proxy',
      },
      physician: {
        name: '',
        clinic: '',
        phone: '',
      },
      livingWillStatus: 'Standard Healthcare Proxy',
      homeAddress: '',
    },
  },
];

export function PatientProfileModal({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  onResetToDefault,
}: PatientProfileModalProps) {
  const [formData, setFormData] = useState<ElderlyProfile>(currentProfile);
  const [conditionsText, setConditionsText] = useState(currentProfile.conditions.join(', '));
  const [allergiesText, setAllergiesText] = useState(currentProfile.allergies.join(', '));
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(currentProfile);
    setConditionsText(currentProfile.conditions.join(', '));
    setAllergiesText(currentProfile.allergies.join(', '));
  }, [currentProfile, isOpen]);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: ElderlyProfile) => {
    setFormData(preset);
    setConditionsText(preset.conditions.join(', '));
    setAllergiesText(preset.allergies.join(', '));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    const parsedConditions = conditionsText
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const parsedAllergies = allergiesText
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const updated: ElderlyProfile = {
      ...formData,
      preferredName: formData.preferredName.trim() || formData.fullName.split(' ')[0],
      conditions: parsedConditions.length > 0 ? parsedConditions : ['Routine Age-Related Care'],
      allergies: parsedAllergies.length > 0 ? parsedAllergies : ['No Known Drug Allergies (NKDA)'],
    };

    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-500/20">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-foreground">Patient & Family Healthcare Profile</h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  REAL ONBOARDING
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                Personalize details for your real family member or switch between clinical test profiles
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Quick Preset Switcher */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Quick-Load Realistic Profiles:</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PRESET_PROFILES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset.data)}
                className="p-2.5 rounded-xl border border-border bg-muted/40 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-left transition-all"
              >
                <div className="text-xs font-bold text-foreground truncate">{preset.label}</div>
                <div className="text-[10px] text-muted-foreground line-clamp-1">{preset.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Section 1: Senior Identity */}
          <div className="space-y-3 p-4 rounded-2xl bg-muted/30 border border-border">
            <div className="flex items-center gap-2 font-black text-foreground text-sm">
              <Heart className="w-4 h-4 text-emerald-600" />
              <span>1. Senior Person Identity</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-foreground">Senior's Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kamala Sharma or John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Display / Preferred Greeting Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dadi Kamala, Dad, Nana"
                  value={formData.preferredName}
                  onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-foreground">Age</label>
                <input
                  type="number"
                  min="50"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 70 })}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
                >
                  <option value="A+ Positive">A+ Positive</option>
                  <option value="A- Negative">A- Negative</option>
                  <option value="B+ Positive">B+ Positive</option>
                  <option value="B- Negative">B- Negative</option>
                  <option value="O+ Positive">O+ Positive</option>
                  <option value="O- Negative">O- Negative</option>
                  <option value="AB+ Positive">AB+ Positive</option>
                  <option value="AB- Negative">AB- Negative</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>Senior PIN</span>
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={formData.seniorPasscode}
                  onChange={(e) => setFormData({ ...formData, seniorPasscode: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground font-mono text-center tracking-widest font-black"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground flex items-center gap-1">
                  <Lock className="w-3 h-3 text-teal-600" />
                  <span>Caregiver PIN</span>
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={formData.familyPasscode}
                  onChange={(e) => setFormData({ ...formData, familyPasscode: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground font-mono text-center tracking-widest font-black"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Conditions & Allergies */}
          <div className="space-y-3 p-4 rounded-2xl bg-muted/30 border border-border">
            <div className="flex items-center gap-2 font-black text-foreground text-sm">
              <FileCheck className="w-4 h-4 text-teal-600" />
              <span>2. Clinical Conditions & Critical Allergies</span>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground">
                Chronic Health Conditions (Comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Type-2 Diabetes Mellitus, Stage 1 Hypertension, Osteoarthritis"
                value={conditionsText}
                onChange={(e) => setConditionsText(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground flex items-center gap-1 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Critical Drug & Food Allergies (Broadcasted on Emergency SOS)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Penicillin (Anaphylaxis), Sulfa Antibiotics, Peanuts"
                value={allergiesText}
                onChange={(e) => setAllergiesText(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/5 text-foreground"
              />
            </div>
          </div>

          {/* Section 3: Caregiver, Physician & Delivery Address */}
          <div className="space-y-3 p-4 rounded-2xl bg-muted/30 border border-border">
            <div className="flex items-center gap-2 font-black text-foreground text-sm">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span>3. Primary Caregiver, Doctor & Delivery Address</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-foreground">Emergency Contact Name</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma (Daughter)"
                  value={formData.emergencyContact.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: { ...formData.emergencyContact, name: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Emergency Contact Phone</label>
                <input
                  type="text"
                  placeholder="+91 98450 12345"
                  value={formData.emergencyContact.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: { ...formData.emergencyContact, phone: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Relation</label>
                <input
                  type="text"
                  placeholder="e.g. Daughter / Primary Proxy"
                  value={formData.emergencyContact.relation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: { ...formData.emergencyContact, relation: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-foreground">Attending Physician Name</label>
                <input
                  type="text"
                  placeholder="Dr. Ramesh Patel, MD"
                  value={formData.physician.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      physician: { ...formData.physician, name: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Hospital / Clinic</label>
                <input
                  type="text"
                  placeholder="Apex Heart Care Center"
                  value={formData.physician.clinic}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      physician: { ...formData.physician, clinic: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Doctor Contact Phone</label>
                <input
                  type="text"
                  placeholder="+91 80 2345 6789"
                  value={formData.physician.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      physician: { ...formData.physician, phone: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>Home Delivery & Emergency Dispatch Address (Used for Pharmacy Auto-Refills)</span>
              </label>
              <input
                type="text"
                placeholder="Full address for prescription deliveries and paramedics"
                value={formData.homeAddress}
                onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>
          </div>

          {/* Form Actions & Persistence Status */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-border">
            <button
              type="button"
              onClick={onResetToDefault}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-rose-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Default Demo Profile</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-border text-muted-foreground font-bold hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-black shadow-lg transition-all ${
                  savedSuccess
                    ? 'bg-emerald-600'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                }`}
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved & Personalized!</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Save & Apply Real Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
