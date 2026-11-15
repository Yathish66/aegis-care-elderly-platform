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
  } catch (error: any) {
    console.error('Prescription OCR Route Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to analyze prescription' },
      { status: 500 }
    );
  }
}
