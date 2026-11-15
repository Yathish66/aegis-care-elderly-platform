import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AegisCare AI - Elderly Care & Medication Management Platform',
  description: 'Smart interconnected healthcare ecosystem connecting elderly individuals, family members, and caretakers with Google Gemini prescription vision, adherence telemetry, and proactive escalation alerts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {/* Accessible Skip Link for Screen Readers & Keyboard Navigation (WCAG 2.1 AAA) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:bg-emerald-700 focus:text-white focus:font-black focus:rounded-2xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400"
        >
          Skip to main healthcare content
        </a>
        {children}
      </body>
    </html>
  );
}
