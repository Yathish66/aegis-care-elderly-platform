'use client';

import React, { useState } from 'react';
import { X, Plus, Pill, Clock } from 'lucide-react';
import { Medication } from '@/types';

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (med: Medication) => void;
}

export function AddMedicationModal({
  isOpen,
  onClose,
  onAdd,
}: AddMedicationModalProps) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Once daily');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'bedtime'>('morning');
  const [scheduledTime, setScheduledTime] = useState('08:00 AM');
  const [instructions, setInstructions] = useState('Take with food and water');
  const [purpose, setPurpose] = useState('Daily health maintenance');
  const [foodWarning, setFoodWarning] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage) return;

    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name,
      dosage,
      frequency,
      timeOfDay,
      scheduledTime,
      instructions,
      purpose,
      pillColor: 'border-teal-500 bg-teal-500/10 text-teal-600',
      status: 'upcoming',
      foodWarning: foodWarning || undefined,
    };

    onAdd(newMed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5">
        
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-foreground">Add New Medication Regimen</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-foreground">Medication Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Amlodipine"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground">Dosage (mg/ml) *</label>
              <input
                type="text"
                required
                placeholder="e.g. 5 mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-foreground">Time of Day</label>
              <select
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              >
                <option value="morning">Morning (8-9 AM)</option>
                <option value="afternoon">Afternoon (1 PM)</option>
                <option value="evening">Evening (7-8 PM)</option>
                <option value="bedtime">Bedtime (9:30 PM)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground">Exact Schedule Time</label>
              <input
                type="text"
                placeholder="09:00 AM"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Patient Instructions</label>
            <input
              type="text"
              placeholder="e.g. Take immediately after breakfast"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Clinical Purpose</label>
            <input
              type="text"
              placeholder="e.g. Blood pressure regulation"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Food or Dietary Advisory (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Avoid grapefruit juice"
              value={foodWarning}
              onChange={(e) => setFoodWarning(e.target.value)}
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
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-md"
            >
              Save Medication
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
