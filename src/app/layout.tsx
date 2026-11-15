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
        {children}
      </body>
    </html>
  );
}
