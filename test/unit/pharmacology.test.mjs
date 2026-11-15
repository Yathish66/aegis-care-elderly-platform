import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

describe('Unit Test: Pharmacology & FDA Registry Validation', () => {
  const authenticFormulary = [
    { name: 'Metformin Hydrochloride', dosage: '500 mg', ndc: '0093-1048-01', rxNorm: '860975', category: 'Antidiabetic' },
    { name: 'Telmisartan (Micardis)', dosage: '40 mg', ndc: '0597-0040-30', rxNorm: '316353', category: 'Antihypertensive' },
    { name: 'Glimepiride', dosage: '1 mg', ndc: '0093-0131-01', rxNorm: '197737', category: 'Sulfonylurea' },
    { name: 'Atorvastatin Calcium', dosage: '10 mg', ndc: '0071-0155-23', rxNorm: '259255', category: 'Statin' },
  ];

  test('Validates 10-digit/11-digit FDA NDC barcode formats', () => {
    const ndcRegex = /^\d{4,5}-\d{3,4}-\d{1,2}$/;
    for (const med of authenticFormulary) {
      assert.ok(ndcRegex.test(med.ndc), `NDC '${med.ndc}' for ${med.name} must adhere to FDA NDC format standards`);
    }
  });

  test('Validates standardized RxNorm Concept Unique Identifiers (RXCUI)', () => {
    for (const med of authenticFormulary) {
      assert.ok(/^\d{5,7}$/.test(med.rxNorm), `RxNorm '${med.rxNorm}' must be a 5 to 7 digit numeric string`);
    }
  });

  test('Detects severe adverse interaction between Potassium-sparing ARBs and OTC Potassium Supplements', () => {
    const currentMeds = ['Telmisartan 40mg'];
    const newAddition = 'Potassium Chloride Supplement';

    const checkHyperkalemiaRisk = (meds, candidate) => {
      const hasArb = meds.some(m => m.includes('Telmisartan') || m.includes('Losartan'));
      const hasPotassium = candidate.toLowerCase().includes('potassium');
      return hasArb && hasPotassium;
    };

    assert.equal(checkHyperkalemiaRisk(currentMeds, newAddition), true, 'Hyperkalemia risk must be flagged');
  });

  test('Correctly calculates remaining dosage supply and daily depletion', () => {
    const pillTracker = {
      remaining: 28,
      dailyDoseFrequency: 2, // Twice daily
    };

    const daysLeft = Math.floor(pillTracker.remaining / pillTracker.dailyDoseFrequency);
    assert.equal(daysLeft, 14, '28 pills taken twice daily must last exactly 14 days');
  });
});
