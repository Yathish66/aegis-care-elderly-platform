import { NextRequest, NextResponse } from 'next/server';
import { correlateVitalsWithGemini } from '@/lib/gemini';
import { VitalReading, Medication, ElderlyProfile } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { vitals, medications, profile } = body as {
      vitals: VitalReading[];
      medications: Medication[];
      profile: ElderlyProfile;
    };

    if (!vitals || !medications || !profile) {
      return NextResponse.json(
        { success: false, error: 'Missing vitals, medications, or profile in payload' },
        { status: 400 }
      );
    }

    const analysis = await correlateVitalsWithGemini(vitals, medications, profile);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('Error in /api/gemini/correlate-vitals:', error);
    return NextResponse.json(
      { success: false, error: 'Internal telemetry correlation error' },
      { status: 500 }
    );
  }
}
