import { NextRequest, NextResponse } from 'next/server';
import { askAegisVoiceCompanion } from '@/lib/gemini';
import { Medication, ElderlyProfile } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, medications, profile } = body as {
      query: string;
      medications: Medication[];
      profile: ElderlyProfile;
    };

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      );
    }

    const response = await askAegisVoiceCompanion(query, medications || [], profile);

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Error in /api/gemini/voice-companion:', error);
    return NextResponse.json(
      { success: false, error: 'Voice companion processing error' },
      { status: 500 }
    );
  }
}
