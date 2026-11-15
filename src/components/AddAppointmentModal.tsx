'use strict';
'use client';

import React, { useState } from 'react';
import { X, Calendar, UserCheck, Sparkles, Building2, Phone, Stethoscope, Clock } from 'lucide-react';
import { DoctorAppointment } from '@/types';

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (apt: DoctorAppointment) => void;
}

const DOCTOR_PRESETS = [
  {
    doctorName: 'Dr. Ramesh Patel, MD',
    specialty: 'Cardiologist & Vascular Specialist',
    clinic: 'Apex Heart Care & Diagnostic Pavilion',
    date: '2026-11-25',
    time: '11:00 AM',
    purpose: 'Routine ECG, BP trend review & echocardiogram follow-up',
    prepInstructions: 'Fast 4 hours prior; bring recent home BP logbook',
    contactNumber: '+91 80 2345 6789',
  },
  {
    doctorName: 'Dr. Sunita Roy, MD, DM',
    specialty: 'Endocrinologist & Diabetologist',
    clinic: 'Fortis Diabetes Center of Excellence',
    date: '2026-12-02',
    time: '09:30 AM',
    purpose: 'Quarterly HbA1c evaluation & Metformin dose titration',
    prepInstructions: 'Fasting blood draw at 8:00 AM; take morning meds with meal',
    contactNumber: '+91 80 4123 9876',
  },
  {
    doctorName: 'Dr. Anand Verma, MS',
    specialty: 'Orthopedic & Joint Geriatric Specialist',
    clinic: 'Manipal Hospital Joint Reconstruction Wing',
    date: '2026-12-10',
    time: '02:00 PM',
    purpose: 'Bilateral knee osteoarthritis physical therapy assessment',
    prepInstructions: 'Wear loose clothing for joint mobility tests',
    contactNumber: '+91 80 4912 3456',
  },
  {
    doctorName: 'Dr. Meera Swaminathan, MD',
    specialty: 'Senior Geriatrician & Primary Physician',
    clinic: 'Apollo Senior Living Comprehensive Health Clinic',
    date: '2026-12-18',
    time: '10:00 AM',
    purpose: 'Comprehensive annual geriatric assessment & medication reconciliation',
    prepInstructions: 'Bring all current medication pill bottles and supplement containers',
    contactNumber: '+91 80 6789 0123',
  },
];

export function AddAppointmentModal({
  isOpen,
  onClose,
  onAdd,
}: AddAppointmentModalProps) {
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('General Physician & Geriatrician');
  const [clinic, setClinic] = useState('Manipal Hospital & Senior Care');
  const [date, setDate] = useState('2026-11-25');
  const [time, setTime] = useState('11:00 AM');
  const [purpose, setPurpose] = useState('Routine health checkup & vitals review');
  const [prepInstructions, setPrepInstructions] = useState('Bring recent blood sugar logs');
  const [contactNumber, setContactNumber] = useState('+91 80 4912 3456');

  if (!isOpen) return null;

  const handleApplyPreset = (preset: typeof DOCTOR_PRESETS[0]) => {
    setDoctorName(preset.doctorName);
    setSpecialty(preset.specialty);
    setClinic(preset.clinic);
    setDate(preset.date);
    setTime(preset.time);
    setPurpose(preset.purpose);
    setPrepInstructions(preset.prepInstructions);
    setContactNumber(preset.contactNumber);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorName) return;

    const newApt: DoctorAppointment = {
      id: `apt-${Date.now()}`,
      doctorName,
      specialty,
      clinic,
      date,
      time,
      purpose,
      prepInstructions,
      contactNumber,
    };

    onAdd(newApt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-foreground">Schedule Doctor Consultation</h3>
              <p className="text-xs text-muted-foreground">Add appointments with automated caregiver reminders</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Doctor Presets */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>1-Click Real Specialist Consultations:</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DOCTOR_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="p-2.5 rounded-xl border border-border bg-muted/40 hover:bg-purple-500/10 hover:border-purple-500/30 text-left transition-all"
              >
                <div className="text-xs font-bold text-foreground truncate">{preset.doctorName}</div>
                <div className="text-[10px] text-muted-foreground truncate">{preset.specialty}</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-foreground">Doctor Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Ramesh Patel"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground">Specialty</label>
              <input
                type="text"
                placeholder="e.g. Cardiologist"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Hospital / Clinic Name</label>
            <input
              type="text"
              placeholder="e.g. Apex Heart Care Pavilion"
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-foreground">Consultation Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground">Scheduled Time</label>
              <input
                type="text"
                placeholder="10:30 AM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Purpose of Visit</label>
            <input
              type="text"
              placeholder="e.g. Routine 3-month diabetes & blood pressure checkup"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Preparation / Fasting Instructions</label>
            <input
              type="text"
              placeholder="e.g. Fast 8 hours prior to blood draw; bring logbook"
              value={prepInstructions}
              onChange={(e) => setPrepInstructions(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Clinic Contact Phone</label>
            <input
              type="text"
              placeholder="+91 80 2345 6789"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-border text-muted-foreground font-bold hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black shadow-md"
            >
              Schedule Consultation
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
