'use strict';
'use client';

import React, { useState } from 'react';
import { VitalReading, Medication, ElderlyProfile, VitalCorrelationAnalysis } from '@/types';
import { Activity, Heart, Droplets, Wind, Sparkles, AlertTriangle, CheckCircle, TrendingUp, Plus, RefreshCw } from 'lucide-react';

interface VitalsTrackerProps {
  vitals: VitalReading[];
  onAddVital: (vital: VitalReading) => void;
  medications: Medication[];
  profile: ElderlyProfile;
}

export function VitalsTracker({ vitals, onAddVital, medications, profile }: VitalsTrackerProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<VitalCorrelationAnalysis | null>(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [newSys, setNewSys] = useState('120');
  const [newDia, setNewDia] = useState('80');
  const [newGlucose, setNewGlucose] = useState('125');
  const [newHR, setNewHR] = useState('72');
  const [newSpO2, setNewSpO2] = useState('98');
  const [newNotes, setNewNotes] = useState('');

  const latest = vitals[0] || {
    bloodPressureSys: 120,
    bloodPressureDia: 80,
    bloodGlucose: 120,
    heartRate: 72,
    oxygenSaturation: 98,
    flag: 'NORMAL',
  };

  const runCorrelation = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch('/api/gemini/correlate-vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vitals, medications, profile }),
      });
      const data = await res.json();
      if (data.success) {
        setAnalysis(data.data);
      }
    } catch (err) {
      console.error('Vitals correlation error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSimulateSpike = () => {
    const spikeVital: VitalReading = {
      id: `vit-${Date.now()}`,
      timestamp: 'Just now (Simulated)',
      dateStr: new Date().toISOString().split('T')[0],
      bloodPressureSys: 144,
      bloodPressureDia: 92,
      bloodGlucose: 168,
      heartRate: 88,
      oxygenSaturation: 96,
      notes: 'Simulated spike: Missed evening dose and high sodium dinner.',
      flag: 'CRITICAL',
    };
    onAddVital(spikeVital);
  };

  const handleCreateVital = (e: React.FormEvent) => {
    e.preventDefault();
    const sys = parseInt(newSys) || 120;
    const dia = parseInt(newDia) || 80;
    const flag = sys > 140 || dia > 90 ? 'CRITICAL' : sys > 130 || dia > 85 ? 'ELEVATED' : 'NORMAL';

    const newReading: VitalReading = {
      id: `vit-${Date.now()}`,
      timestamp: 'Just now',
      dateStr: new Date().toISOString().split('T')[0],
      bloodPressureSys: sys,
      bloodPressureDia: dia,
      bloodGlucose: parseInt(newGlucose) || 120,
      heartRate: parseInt(newHR) || 72,
      oxygenSaturation: parseInt(newSpO2) || 98,
      notes: newNotes || 'Routine checkup.',
      flag,
    };
    onAddVital(newReading);
    setShowLogModal(false);
    setNewNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            Physiological Vitals & Medication Correlation
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Real-time biometric monitoring correlated with drug dosages using Gemini 2.5 Flash
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowLogModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
          >
            <Plus className="h-4 w-4" />
            Log Reading
          </button>
          <button
            onClick={handleSimulateSpike}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
            title="Inject an elevated BP reading to test clinical escalation"
          >
            <AlertTriangle className="h-4 w-4 text-rose-500" />
            Simulate BP Spike
          </button>
          <button
            onClick={runCorrelation}
            disabled={analyzing}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all disabled:opacity-50"
          >
            <Sparkles className={`h-4 w-4 ${analyzing ? 'animate-spin' : ''}`} />
            {analyzing ? 'Analyzing Biometrics...' : 'Gemini AI Correlation'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Blood Pressure */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Blood Pressure</span>
            <Heart className="h-4 w-4 text-rose-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {latest.bloodPressureSys}/{latest.bloodPressureDia}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">mmHg</span>
          </div>
          <div className="mt-2.5">
            <span
              className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                latest.flag === 'CRITICAL'
                  ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                  : latest.flag === 'ELEVATED'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                  : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
              }`}
            >
              {latest.flag === 'CRITICAL' ? 'Stage 2 Alert' : latest.flag === 'ELEVATED' ? 'Pre-Hypertension' : 'Normal / Ideal'}
            </span>
          </div>
        </div>

        {/* Blood Glucose */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Blood Glucose</span>
            <Droplets className="h-4 w-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {latest.bloodGlucose}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">mg/dL</span>
          </div>
          <div className="mt-2.5">
            <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              Optimal Fasting
            </span>
          </div>
        </div>

        {/* Heart Rate */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Heart Rate</span>
            <Activity className="h-4 w-4 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {latest.heartRate}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">BPM</span>
          </div>
          <div className="mt-2.5">
            <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
              Resting Rhythm
            </span>
          </div>
        </div>

        {/* SpO2 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Oxygen (SpO2)</span>
            <Wind className="h-4 w-4 text-cyan-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {latest.oxygenSaturation}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Sat</span>
          </div>
          <div className="mt-2.5">
            <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300">
              Optimal Lung Cap
            </span>
          </div>
        </div>
      </div>

      {/* Gemini AI Clinical Correlation Box */}
      {analysis && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-slate-50 dark:from-indigo-950/30 dark:via-blue-950/20 dark:to-slate-900 border border-indigo-200 dark:border-indigo-800/60 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Gemini Clinical Correlation Analysis
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Confidence: {Math.round(analysis.confidenceScore * 100)}%
            </span>
          </div>

          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3 bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
            {analysis.summary}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Key Clinical Observations
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {analysis.clinicalObservations.map((obs, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Caregiver & Physician Directives
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {analysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Historical Logs Table */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
          Telemetry Time-Series Log
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="pb-3 font-semibold">Timestamp</th>
                <th className="pb-3 font-semibold">BP (mmHg)</th>
                <th className="pb-3 font-semibold">Glucose (mg/dL)</th>
                <th className="pb-3 font-semibold">Heart Rate</th>
                <th className="pb-3 font-semibold">SpO2</th>
                <th className="pb-3 font-semibold">Clinical Note</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {vitals.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 font-medium text-slate-900 dark:text-white">{v.timestamp}</td>
                  <td className="py-3 font-bold">
                    {v.bloodPressureSys}/{v.bloodPressureDia}
                  </td>
                  <td className="py-3">{v.bloodGlucose}</td>
                  <td className="py-3">{v.heartRate} bpm</td>
                  <td className="py-3">{v.oxygenSaturation}%</td>
                  <td className="py-3 text-xs text-slate-600 dark:text-slate-400 max-w-xs truncate">
                    {v.notes || '—'}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full ${
                        v.flag === 'CRITICAL'
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                          : v.flag === 'ELEVATED'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                      }`}
                    >
                      {v.flag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Entry Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Log Vital Telemetry Reading
            </h3>
            <form onSubmit={handleCreateVital} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Systolic BP</label>
                  <input
                    type="number"
                    value={newSys}
                    onChange={(e) => setNewSys(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold"
                    placeholder="120"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Diastolic BP</label>
                  <input
                    type="number"
                    value={newDia}
                    onChange={(e) => setNewDia(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold"
                    placeholder="80"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Glucose</label>
                  <input
                    type="number"
                    value={newGlucose}
                    onChange={(e) => setNewGlucose(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    placeholder="120"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Pulse (BPM)</label>
                  <input
                    type="number"
                    value={newHR}
                    onChange={(e) => setNewHR(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    placeholder="72"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">SpO2 (%)</label>
                  <input
                    type="number"
                    value={newSpO2}
                    onChange={(e) => setNewSpO2(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    placeholder="98"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Observation Notes</label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  placeholder="e.g. Taken 10 mins after Metformin breakfast"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors"
                >
                  Save Reading
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
