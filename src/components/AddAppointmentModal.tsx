'use client';

import React, { useState } from 'react';
import { X, Calendar, UserCheck } from 'lucide-react';
import { DoctorAppointment } from '@/types';

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (apt: DoctorAppointment) => void;
}

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5">
        
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-foreground">Schedule Doctor Consultation</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-foreground">Doctor Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Anand Verma"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground">Specialty</label>
              <input
                type="text"
                placeholder="e.g. Neurologist"
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
              placeholder="e.g. Apollo Clinic"
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-foreground">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground">Time</label>
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
            <label className="font-bold text-foreground">Consultation Purpose</label>
            <input
              type="text"
              placeholder="e.g. Review blood pressure and dosage adjust"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Patient Prep Instructions</label>
            <input
              type="text"
              placeholder="e.g. Fast for 8 hours prior"
              value={prepInstructions}
              onChange={(e) => setPrepInstructions(e.target.value)}
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
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md"
            >
              Save Appointment
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
