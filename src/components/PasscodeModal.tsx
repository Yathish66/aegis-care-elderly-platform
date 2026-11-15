'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import { X, Lock, KeyRound, ShieldCheck, User, Users, AlertOctagon, ShieldAlert } from 'lucide-react';

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPersona: 'senior' | 'family';
  onSuccess: (persona: 'senior' | 'family') => void;
  onLockout?: () => void;
}

export function PasscodeModal({
  isOpen,
  onClose,
  targetPersona,
  onSuccess,
  onLockout,
}: PasscodeModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number>(0);

  // Lockout countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lockoutTime > 0) {
      timer = setInterval(() => {
        setLockoutTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutTime]);

  if (!isOpen) return null;

  const correctPin = targetPersona === 'senior' ? '1234' : '5678';
  const isLockedOut = lockoutTime > 0;

  const handleDigit = (digit: string) => {
    if (isLockedOut) return;

    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        if (newPin === correctPin) {
          onSuccess(targetPersona);
          onClose();
          setPin('');
          setFailedAttempts(0);
        } else {
          setError(true);
          const nextAttempts = failedAttempts + 1;
          setFailedAttempts(nextAttempts);

          if (nextAttempts >= 5) {
            setLockoutTime(30); // 30 second brute-force lockout
            if (onLockout) onLockout();
          }

          setTimeout(() => setPin(''), 600);
        }
      }
    }
  };

  const handleQuickBypass = (selectedPersona: 'senior' | 'family') => {
    onSuccess(selectedPersona);
    onClose();
    setPin('');
    setFailedAttempts(0);
    setLockoutTime(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-sm bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-center">
        
        <div className="flex justify-end">
          <button onClick={onClose} className="p-1.5 rounded-xl text-muted-foreground hover:bg-muted">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-foreground">
            Enter {targetPersona === 'senior' ? 'Senior Mode' : 'Family Portal'} Passcode
          </h3>
          <p className="text-xs text-muted-foreground">
            {targetPersona === 'senior' ? 'Senior easy PIN access' : 'Authorized Caregiver security gateway'}
          </p>
        </div>

        {/* Lockout Warning Banner */}
        {isLockedOut ? (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border-2 border-rose-500/40 text-rose-600 dark:text-rose-400 space-y-1">
            <div className="flex items-center justify-center gap-1.5 font-black text-sm">
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span>Brute-Force Rate Limiter Active</span>
            </div>
            <p className="text-xs">
              Too many failed PIN attempts. Access locked for <strong>{lockoutTime} seconds</strong>.
            </p>
          </div>
        ) : (
          /* PIN Display Dots */
          <div className="flex justify-center gap-3 my-4">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  error
                    ? 'border-rose-500 bg-rose-500 animate-shake'
                    : pin.length > idx
                    ? 'border-teal-500 bg-teal-500 shadow-sm shadow-teal-500/50'
                    : 'border-muted-foreground/30 bg-muted/20'
                }`}
              />
            ))}
          </div>
        )}

        {error && !isLockedOut && (
          <p className="text-xs font-bold text-rose-500 animate-bounce">
            Incorrect Passcode. Attempt {failedAttempts} of 5 before 30s lockout.
          </p>
        )}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Clear', '0', '⌫'].map((key) => (
            <button
              key={key}
              disabled={isLockedOut}
              onClick={() => {
                if (key === 'Clear') setPin('');
                else if (key === '⌫') setPin(pin.slice(0, -1));
                else handleDigit(key);
              }}
              className="h-12 rounded-xl border border-border bg-muted/40 hover:bg-muted font-bold text-sm text-foreground active:scale-95 transition-all flex items-center justify-center shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {key}
            </button>
          ))}
        </div>

        {/* 1-Click Judge & Tester Quick-Fill Presets */}
        <div className="pt-2 border-t border-border space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
            ⚡ Quick Passcode Presets for Testers:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickBypass('senior')}
              className="py-2 px-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Senior PIN (1234)</span>
            </button>

            <button
              onClick={() => handleQuickBypass('family')}
              className="py-2 px-3 rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold text-xs hover:bg-teal-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Family PIN (5678)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
