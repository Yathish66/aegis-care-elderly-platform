'use strict';
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '@/lib/i18n';

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  compact?: boolean;
}

export function LanguageSelector({
  currentLanguage,
  onSelectLanguage,
  compact = false,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        title="Change Platform Language / भाषा बदलें / ಭಾಷೆ ಬದಲಾಯಿಸಿ"
        className={`flex items-center gap-1.5 rounded-xl border border-border bg-card hover:bg-accent text-xs font-bold transition-all shadow-sm ${
          compact ? 'px-2.5 py-1.5' : 'px-3 py-2'
        }`}
      >
        <span className="text-sm">{activeOption.flag}</span>
        <span className="font-semibold text-foreground">
          {compact ? activeOption.code.toUpperCase() : activeOption.nativeName}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-card border border-border shadow-2xl z-50 p-1.5 animate-in fade-in zoom-in-95">
          <div className="px-2.5 py-1.5 text-[11px] font-black uppercase text-muted-foreground tracking-wider border-b border-border/60 mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>Select Language</span>
            </span>
          </div>

          <div className="space-y-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                    isSelected
                      ? 'bg-teal-500/10 text-teal-700 dark:text-teal-300 font-black'
                      : 'text-foreground hover:bg-muted/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    <div>
                      <div className="leading-tight">{lang.nativeName}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">
                        {lang.label}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-teal-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
