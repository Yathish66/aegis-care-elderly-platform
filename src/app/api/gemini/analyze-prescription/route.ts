import { NextResponse } from 'next/server';
import { analyzePrescriptionWithGemini } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const { imageBase64, mimeType } = await req.json();

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: 'No image data provided' },
        { status: 400 }
      );
    }

    const medications = await analyzePrescriptionWithGemini(imageBase64, mimeType || 'image/jpeg');

    return NextResponse.json({
      success: true,
      data: medications,
      meta: {
        provider: 'Google Gemini 2.5 Flash',
        extractedCount: medications.length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    console.error('Prescription OCR Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze prescription';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
