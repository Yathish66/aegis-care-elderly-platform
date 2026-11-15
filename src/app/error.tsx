'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

/**
 * Global Error Boundary component for Next.js App Router.
 * Captures unhandled runtime errors, logs to console, and provides accessible recovery controls.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors for client monitoring
    console.error('AegisCare Runtime Application Error:', error);
  }, [error]);

  return (
    <div 
      role="alert" 
      aria-live="assertive"
      className="min-h-screen flex items-center justify-center bg-background text-foreground p-6"
    >
      <div className="w-full max-w-md p-8 rounded-3xl bg-card border-2 border-rose-500/40 shadow-2xl text-center space-y-6">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-rose-500/20 text-rose-500">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-foreground">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            AegisCare encountered an unexpected issue. Your patient profile and medical data remain securely stored locally.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-muted-foreground/60">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 py-3 px-4 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all border border-border"
          >
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
