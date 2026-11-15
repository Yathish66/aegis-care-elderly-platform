import { NextResponse } from 'next/server';
import { checkInteractionsWithGemini } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const { medications, conditions } = await req.json();

    const medList = Array.isArray(medications) ? medications : ['Metformin 500mg', 'Telmisartan 40mg', 'Atorvastatin 10mg'];
    const condList = Array.isArray(conditions) ? conditions : ['Type-2 Diabetes', 'Hypertension'];

    const result = await checkInteractionsWithGemini(medList, condList);

    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        provider: 'Google Gemini 2.5 Flash',
        analyzedMedications: medList.length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    console.error('Safety Check Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to perform safety check';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
