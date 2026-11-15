'use strict';
'use client';

import React, { useState } from 'react';
import { AuditLogEntry } from '@/types';
import { ShieldCheck, History, X, Download, Filter, UserCheck, ShieldAlert, Activity, Pill } from 'lucide-react';

interface AuditTrailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: AuditLogEntry[];
}

export function AuditTrailDrawer({ isOpen, onClose, logs }: AuditTrailDrawerProps) {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  if (!isOpen) return null;

  const filtered = filterCategory === 'ALL'
    ? logs
    : logs.filter((l) => l.category === filterCategory);

  const handleExportCSV = () => {
    const headers = 'ID,Timestamp,Actor,Role,Action,Category,Details\n';
    const rows = logs
      .map(
        (l) =>
          `"${l.id}","${l.timestamp}","${l.actor}","${l.role}","${l.action}","${l.category}","${l.details.replace(/"/g, '""')}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AegisCare_AuditTrail_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">HIPAA Clinical Audit Trail</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Tamper-Evident
                </span>
              </div>
              <p className="text-slate-400 text-xs">
                Immutable, timestamped event log of all patient and caregiver interactions
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

        {/* Filter bar & Export */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {['ALL', 'MEDICATION', 'SECURITY', 'SAFETY', 'EMERGENCY', 'TELEMETRY'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>

        {/* Event List */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {filtered.map((log) => {
            const getIcon = () => {
              switch (log.category) {
                case 'MEDICATION':
                  return <Pill className="h-4 w-4 text-emerald-500" />;
                case 'SECURITY':
                  return <ShieldCheck className="h-4 w-4 text-blue-500" />;
                case 'SAFETY':
                  return <ShieldAlert className="h-4 w-4 text-amber-500" />;
                case 'EMERGENCY':
                  return <ShieldAlert className="h-4 w-4 text-rose-500" />;
                case 'TELEMETRY':
                  return <Activity className="h-4 w-4 text-purple-500" />;
                default:
                  return <History className="h-4 w-4 text-slate-500" />;
              }
            };

            return (
              <div
                key={log.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 font-semibold">{log.timestamp}</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      log.role === 'SENIOR'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : log.role === 'CAREGIVER'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                        : log.role === 'PHYSICIAN'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {log.actor}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-0.5">
                  {getIcon()}
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {log.action}
                  </h4>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {log.details}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total of {logs.length} immutable events recorded for Dadi Kamala
          </p>
        </div>
      </div>
    </div>
  );
}
