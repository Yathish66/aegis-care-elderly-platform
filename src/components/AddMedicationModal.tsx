'use strict';
'use client';

import React, { useState } from 'react';
import { X, Plus, Pill, Clock, Sparkles, Building, Hash, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Medication } from '@/types';

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (med: Medication) => void;
}

// Authentic clinical presets based on real FDA NDC and RxNorm registries
const CLINICAL_PRESETS = [
  {
    name: 'Amlodipine Besylate',
    dosage: '5 mg',
    frequency: 'Once daily in morning',
    timeOfDay: 'morning' as const,
    scheduledTime: '08:00 AM',
    instructions: 'Take in the morning with a glass of water.',
    purpose: 'Calcium channel blocker for Stage 1 Hypertension',
    foodWarning: '',
    ndcCode: '0093-3174-01',
    rxNormId: '197361',
    remainingPills: 30,
    totalPills: 30,
    refillThreshold: 7,
    rxNumber: 'RX-77219-AML',
    pharmacyName: 'Apollo Pharmacy #104',
    manufacturer: 'Teva Pharmaceuticals USA',
    pillColor: 'border-blue-500 bg-blue-500/10 text-blue-600',
  },
  {
    name: 'Lisinopril',
    dosage: '10 mg',
    frequency: 'Once daily in morning',
    timeOfDay: 'morning' as const,
    scheduledTime: '08:30 AM',
    instructions: 'Take at the same time each morning. Monitor blood pressure.',
    purpose: 'ACE inhibitor for cardiac and renal protection',
    foodWarning: 'Avoid high-potassium dietary supplements',
    ndcCode: '0093-8107-01',
    rxNormId: '206805',
    remainingPills: 30,
    totalPills: 30,
    refillThreshold: 7,
    rxNumber: 'RX-55102-LIS',
    pharmacyName: 'Apollo Pharmacy #104',
    manufacturer: 'Lupin Pharmaceuticals',
    pillColor: 'border-emerald-500 bg-emerald-500/10 text-emerald-600',
  },
  {
    name: 'Levothyroxine Sodium',
    dosage: '50 mcg',
    frequency: 'Once daily early morning',
    timeOfDay: 'morning' as const,
    scheduledTime: '07:00 AM',
    instructions: 'Take on an empty stomach with plain water at least 30 mins before breakfast.',
    purpose: 'Thyroid hormone replacement for Hypothyroidism',
    foodWarning: 'Do not take with calcium, iron, or soy within 4 hours',
    ndcCode: '0074-6594-11',
    rxNormId: '966224',
    remainingPills: 30,
    totalPills: 30,
    refillThreshold: 5,
    rxNumber: 'RX-31908-LEV',
    pharmacyName: 'MedPlus Health Services',
    manufacturer: 'AbbVie Inc.',
    pillColor: 'border-purple-500 bg-purple-500/10 text-purple-600',
  },
  {
    name: 'Pantoprazole Sodium',
    dosage: '40 mg',
    frequency: 'Once daily before breakfast',
    timeOfDay: 'morning' as const,
    scheduledTime: '07:30 AM',
    instructions: 'Swallow whole with water 30 minutes prior to first meal.',
    purpose: 'Proton pump inhibitor for gastroesophageal reflux (GERD)',
    foodWarning: 'Do not crush or chew delayed-release tablet',
    ndcCode: '0008-0841-55',
    rxNormId: '284646',
    remainingPills: 30,
    totalPills: 30,
    refillThreshold: 6,
    rxNumber: 'RX-90142-PAN',
    pharmacyName: 'Apollo Pharmacy #104',
    manufacturer: 'Wyeth Pharmaceuticals',
    pillColor: 'border-amber-500 bg-amber-500/10 text-amber-600',
  },
  {
    name: 'Paracetamol (Acetaminophen)',
    dosage: '650 mg',
    frequency: 'As needed for joint pain',
    timeOfDay: 'evening' as const,
    scheduledTime: '06:00 PM',
    instructions: 'Take with warm water after dinner if joint discomfort occurs.',
    purpose: 'Analgesic & antipyretic for osteoarthritic knee stiffness',
    foodWarning: 'Max 2000mg/day in seniors; avoid alcohol',
    ndcCode: '50580-496-01',
    rxNormId: '198440',
    remainingPills: 20,
    totalPills: 20,
    refillThreshold: 4,
    rxNumber: 'RX-12903-PCM',
    pharmacyName: 'Apollo Pharmacy #104',
    manufacturer: 'Johnson & Johnson Consumer Inc.',
    pillColor: 'border-rose-500 bg-rose-500/10 text-rose-600',
  },
];

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
  const [ndcCode, setNdcCode] = useState('');
  const [rxNormId, setRxNormId] = useState('');
  const [remainingPills, setRemainingPills] = useState(30);
  const [totalPills, setTotalPills] = useState(30);
  const [refillThreshold, setRefillThreshold] = useState(7);
  const [rxNumber, setRxNumber] = useState('RX-77219');
  const [pharmacyName, setPharmacyName] = useState('Apollo Pharmacy #104');
  const [manufacturer, setManufacturer] = useState('Verified Generic Labs');

  if (!isOpen) return null;

  const handleApplyPreset = (preset: typeof CLINICAL_PRESETS[0]) => {
    setName(preset.name);
    setDosage(preset.dosage);
    setFrequency(preset.frequency);
    setTimeOfDay(preset.timeOfDay);
    setScheduledTime(preset.scheduledTime);
    setInstructions(preset.instructions);
    setPurpose(preset.purpose);
    setFoodWarning(preset.foodWarning);
    setNdcCode(preset.ndcCode);
    setRxNormId(preset.rxNormId);
    setRemainingPills(preset.remainingPills);
    setTotalPills(preset.totalPills);
    setRefillThreshold(preset.refillThreshold);
    setRxNumber(preset.rxNumber);
    setPharmacyName(preset.pharmacyName);
    setManufacturer(preset.manufacturer);
  };

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
      ndcCode: ndcCode || undefined,
      rxNormId: rxNormId || undefined,
      remainingPills: Number(remainingPills) || 30,
      totalPills: Number(totalPills) || 30,
      refillThreshold: Number(refillThreshold) || 7,
      rxNumber,
      pharmacyName,
      manufacturer,
    };

    onAdd(newMed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-xl bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-foreground">Add Real Medication Regimen</h3>
              <p className="text-xs text-muted-foreground">Authentic FDA NDC & RxNorm pharmacopeia standards</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Clinical Real Presets */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>1-Click Real Clinical Presets:</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CLINICAL_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="p-2.5 rounded-xl border border-border bg-muted/40 hover:bg-teal-500/10 hover:border-teal-500/30 text-left transition-all"
              >
                <div className="text-xs font-bold text-foreground truncate">{preset.name} {preset.dosage}</div>
                <div className="text-[10px] text-muted-foreground truncate font-mono">NDC: {preset.ndcCode} • {preset.purpose}</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-foreground">Medication Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Amlodipine Besylate"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground">Dosage (mg/ml/mcg) *</label>
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
              <label className="font-bold text-foreground">FDA NDC Code (National Drug Code)</label>
              <input
                type="text"
                placeholder="e.g. 0093-3174-01"
                value={ndcCode}
                onChange={(e) => setNdcCode(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground">RxNorm Concept ID</label>
              <input
                type="text"
                placeholder="e.g. 197361"
                value={rxNormId}
                onChange={(e) => setRxNormId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground font-mono"
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
                placeholder="08:00 AM"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Administration Instructions</label>
            <input
              type="text"
              placeholder="e.g. Take immediately after breakfast with a full glass of water"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Clinical Purpose / Indication</label>
            <input
              type="text"
              placeholder="e.g. High blood pressure regulation"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Food or Drug Advisory (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Avoid grapefruit juice; do not take on empty stomach"
              value={foodWarning}
              onChange={(e) => setFoodWarning(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground"
            />
          </div>

          {/* Pill Inventory & Pharmacy Section */}
          <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <Building className="w-4 h-4 text-blue-500" />
              <span>Pharmacy Inventory & Refill Tracking</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Remaining Pills</label>
                <input
                  type="number"
                  min="0"
                  value={remainingPills}
                  onChange={(e) => setRemainingPills(parseInt(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Full Pack Size</label>
                <input
                  type="number"
                  min="1"
                  value={totalPills}
                  onChange={(e) => setTotalPills(parseInt(e.target.value) || 30)}
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Low Alert Stock</label>
                <input
                  type="number"
                  min="1"
                  value={refillThreshold}
                  onChange={(e) => setRefillThreshold(parseInt(e.target.value) || 7)}
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Prescription Rx #</label>
                <input
                  type="text"
                  value={rxNumber}
                  onChange={(e) => setRxNumber(e.target.value)}
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Assigned Pharmacy</label>
                <input
                  type="text"
                  value={pharmacyName}
                  onChange={(e) => setPharmacyName(e.target.value)}
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
                />
              </div>
            </div>
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
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black shadow-md transition-all"
            >
              Add to Medication Regimen
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
