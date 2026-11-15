'use client';

import React from 'react';
import { X, Mail, CheckCircle2, AlertTriangle, Calendar, Bell, Send } from 'lucide-react';
import { EmailNotification } from '@/types';

interface EmailCenterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  emails: EmailNotification[];
  onTriggerTestEmail: () => void;
}

export function EmailCenterDrawer({
  isOpen,
  onClose,
  emails,
  onTriggerTestEmail,
}: EmailCenterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-card border-l border-border shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
          
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-foreground">Proactive Email Dispatcher</h3>
                  <p className="text-xs text-muted-foreground">Automated alerts sent to family & caregivers</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl text-muted-foreground hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Manual Simulation Button */}
            <button
              onClick={onTriggerTestEmail}
              className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Simulate Sending Real-Time Family Alert</span>
            </button>

            {/* Email Notification Feed */}
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-muted-foreground block">
                Dispatched Telemetry Log ({emails.length}):
              </span>

              {emails.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted-foreground border border-dashed rounded-2xl">
                  No alerts dispatched yet.
                </div>
              ) : (
                emails.map((email) => {
                  const isMissed = email.type === 'MISSED_DOSE_ESCALATION';

                  return (
                    <div
                      key={email.id}
                      className={`p-4 rounded-2xl border text-xs space-y-2 transition-all ${
                        isMissed
                          ? 'bg-rose-500/10 border-rose-500/30'
                          : 'bg-muted/40 border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          isMissed ? 'bg-rose-500 text-white' : 'bg-teal-500/10 text-teal-600'
                        }`}>
                          {email.type}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">{email.timestamp}</span>
                      </div>

                      <h4 className="font-bold text-foreground text-xs leading-snug">{email.subject}</h4>

                      <p className="text-muted-foreground text-[11px] leading-relaxed">
                        {email.body}
                      </p>

                      <div className="pt-1.5 flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/40">
                        <span>To: {email.recipientEmail}</span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>DELIVERED</span>
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          <div className="pt-6 border-t border-border text-center text-xs text-muted-foreground">
            AegisCare Serverless Email Dispatch Engine
          </div>

        </div>
      </div>
    </div>
  );
}
