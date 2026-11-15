import React from 'react';
import Link from 'next/link';
import { HeartHandshake, ArrowLeft } from 'lucide-react';

/**
 * Standard Next.js 404 page handler.
 * Provides clear recovery path back to the main senior healthcare portal.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 text-center space-y-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-muted text-muted-foreground border border-border shadow-inner">
        <HeartHandshake className="h-10 w-10 text-teal-600" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-black uppercase tracking-wider text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
          Page Not Found (404)
        </span>
        <h1 className="text-3xl font-black text-foreground mt-2">Healthcare Route Not Found</h1>
        <p className="text-sm text-muted-foreground">
          The requested page or record could not be located. Your active medications and clinical logs remain safe.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/30"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
}
