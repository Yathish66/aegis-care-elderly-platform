import { NextRequest, NextResponse } from 'next/server';
import { identifyPillWithGemini } from '@/lib/gemini';
import { Medication } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, presetId, activeMedications } = body as {
      imageBase64?: string;
      presetId?: string;
      activeMedications?: Medication[];
    };

    const result = await identifyPillWithGemini(imageBase64, presetId, activeMedications || []);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in /api/gemini/identify-pill:', error);
    return NextResponse.json(
      { success: false, error: 'Internal pill identification error' },
      { status: 500 }
    );
  }
}
