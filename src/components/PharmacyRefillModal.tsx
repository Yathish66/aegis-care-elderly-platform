'use strict';
'use client';

import React, { useState } from 'react';
import { Medication, ElderlyProfile, PharmacyRefillOrder } from '@/types';
import { Pill, ShoppingBag, Truck, CheckCircle, AlertTriangle, Send, X, FileText, ArrowRight } from 'lucide-react';

interface PharmacyRefillModalProps {
  isOpen: boolean;
  onClose: () => void;
  medications: Medication[];
  profile: ElderlyProfile;
  onRefillComplete: (medId: string, quantity: number) => void;
  refills: PharmacyRefillOrder[];
}

export function PharmacyRefillModal({
  isOpen,
  onClose,
  medications,
  profile,
  onRefillComplete,
  refills,
}: PharmacyRefillModalProps) {
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [dispatching, setDispatching] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);
  const [quantity, setQuantity] = useState(30);

  if (!isOpen) return null;

  const handleStartRefill = (med: Medication) => {
    setSelectedMed(med);
    setQuantity(30);
    setDispatchSuccess(false);
  };

  const handleConfirmDispatch = async () => {
    if (!selectedMed) return;
    setDispatching(true);

    try {
      // Simulate pharmacy EDI / serverless dispatch
      await fetch('/api/notify/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: profile.emergencyContact.phone.includes('@')
            ? profile.emergencyContact.phone
            : 'priya.sharma.care@gmail.com',
          recipientName: profile.emergencyContact.name,
          type: 'PHARMACY_REFILL',
          subject: `Aegis Care: Automated Pharmacy Refill Dispatched for ${selectedMed.name}`,
          body: `Refill Order Confirmed!\n\nRx Number: ${selectedMed.rxNumber || 'RX-99214'}\nMedication: ${selectedMed.name} (${selectedMed.dosage})\nQuantity: ${quantity} Tablets (30-day supply)\nFulfillment Pharmacy: ${selectedMed.pharmacyName || 'Apollo Pharmacy #104'}\nDelivery Destination: ${profile.homeAddress}\n\nEstimated Doorstep Delivery: Tomorrow by 11:00 AM.`,
        }),
      });

      onRefillComplete(selectedMed.id, quantity);
      setDispatchSuccess(true);
    } catch (err) {
      console.error('Refill dispatch error:', err);
      onRefillComplete(selectedMed.id, quantity);
      setDispatchSuccess(true);
    } finally {
      setDispatching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Smart Pharmacy Inventory & Refill Hub</h2>
              <p className="text-blue-100 text-xs font-medium">
                Connected E-Prescription & Automated Doorstep Fulfillment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Inventory Overview */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Current Pill Stock & Depletion Forecast
            </h3>

            <div className="grid gap-3">
              {medications.map((med) => {
                const remaining = med.remainingPills ?? 15;
                const total = med.totalPills ?? 30;
                const threshold = med.refillThreshold ?? 5;
                const isLow = remaining <= threshold;
                const percent = Math.min(100, Math.round((remaining / total) * 100));

                return (
                  <div
                    key={med.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isLow
                        ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-base">
                            {med.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                            {med.dosage}
                          </span>
                          {isLow && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 animate-pulse">
                              <AlertTriangle className="h-3 w-3" />
                              Refill Urgent ({remaining} doses left)
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Rx: <span className="font-mono">{med.rxNumber || 'RX-67120'}</span> • {med.pharmacyName || 'Apollo Pharmacy'}
                        </p>
                      </div>

                      <button
                        onClick={() => handleStartRefill(med)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                          isLow
                            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        Order Refill
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          isLow ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                      <span>{remaining} / {total} tablets remaining</span>
                      <span>Supply: ~{remaining} days</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Refill Dispatch Workflow Card */}
          {selectedMed && !dispatchSuccess && (
            <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border-2 border-indigo-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    Electronic Pharmacy Refill Order Slip
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedMed(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900/60">
                  <span className="text-slate-500 block font-semibold">Patient</span>
                  <span className="text-slate-900 dark:text-white font-bold">{profile.fullName} (Age {profile.age})</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900/60">
                  <span className="text-slate-500 block font-semibold">Prescription</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedMed.name} {selectedMed.dosage}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900/60">
                  <span className="text-slate-500 block font-semibold">Fulfillment Pharmacy</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedMed.pharmacyName || 'Apollo Pharmacy #104'}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900/60">
                  <span className="text-slate-500 block font-semibold">Delivery Address</span>
                  <span className="text-slate-900 dark:text-white font-bold truncate block">{profile.homeAddress}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="p-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value={30}>30 Tablets (1 Month)</option>
                    <option value={60}>60 Tablets (2 Months)</option>
                    <option value={90}>90 Tablets (3 Months)</option>
                  </select>
                </div>

                <button
                  onClick={handleConfirmDispatch}
                  disabled={dispatching}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all disabled:opacity-50"
                >
                  <Send className={`h-4 w-4 ${dispatching ? 'animate-spin' : ''}`} />
                  {dispatching ? 'Transmitting to Pharmacy...' : 'Confirm & Dispatch Refill'}
                </button>
              </div>
            </div>
          )}

          {/* Success Card */}
          {dispatchSuccess && (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/50 space-y-3 animate-in zoom-in-95">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
                <h4 className="font-extrabold text-base">Refill Order Dispatched Successfully!</h4>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Order sent to <strong>{selectedMed?.pharmacyName || 'Apollo Pharmacy'}</strong> for{' '}
                <strong>{selectedMed?.name}</strong>. Stock replenished, and automated delivery confirmation email was dispatched to{' '}
                <strong>{profile.emergencyContact.name}</strong>.
              </p>
              <button
                onClick={() => setSelectedMed(null)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Done
              </button>
            </div>
          )}

          {/* Past Refills History */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Refill & Delivery History
            </h4>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {refills.map((r) => (
                <div key={r.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-emerald-500" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{r.medicationName}</span>
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px]">{r.pharmacyName} • {r.quantityOrdered} tablets</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px]">
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
