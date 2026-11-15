import React from 'react';
import { HeartHandshake } from 'lucide-react';

/**
 * Standard Next.js Suspense loading component.
 * Displays accessible healthcare branded skeleton while client components hydrate.
 */
export default function Loading() {
  return (
    <div 
      role="status" 
      aria-label="Loading AegisCare Healthcare Platform"
      className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground space-y-4"
    >
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 text-white shadow-xl shadow-teal-500/30 animate-pulse">
        <HeartHandshake className="h-10 w-10 animate-bounce" />
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-lg font-black text-foreground">AegisCare AI</h2>
        <p className="text-xs text-muted-foreground">Initializing secure elderly care environment...</p>
      </div>
    </div>
  );
}
