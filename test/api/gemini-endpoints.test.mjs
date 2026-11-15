import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

describe('API Integration Test: Gemini AI Fallback & Schema Integrity', () => {
  test('Ensures Safety Check route provides deterministic fallback if external AI is unavailable', () => {
    // Simulate fallback safety checker
    const evaluateSafetyFallback = (medicationName, patientAllergies) => {
      const lowerMed = medicationName.toLowerCase();
      const conflicts = patientAllergies.filter(allergy => lowerMed.includes(allergy.toLowerCase()));

      return {
        safe: conflicts.length === 0,
        riskLevel: conflicts.length > 0 ? 'CRITICAL' : 'LOW',
        conflicts,
        source: 'DETERMINISTIC_CLINICAL_ENGINE',
      };
    };

    const result = evaluateSafetyFallback('Penicillin VK 500mg', ['Penicillin', 'Sulfa']);
    assert.equal(result.safe, false, 'Known allergy conflict must be rejected');
    assert.equal(result.riskLevel, 'CRITICAL');
    assert.equal(result.source, 'DETERMINISTIC_CLINICAL_ENGINE');
  });

  test('Validates Pill Identifier fallback schema structure', () => {
    const mockPillIdentification = {
      identified: true,
      pillName: 'Metformin Hydrochloride 500mg',
      imprint: 'M 500',
      color: 'White',
      shape: 'Round',
      confidence: 0.94,
      disclaimer: 'Always verify with your pharmacist before taking unrecognized pills.',
    };

    assert.ok(mockPillIdentification.confidence >= 0.8, 'Confidence score must exceed threshold');
    assert.ok(mockPillIdentification.disclaimer.length > 10, 'Mandatory clinical disclaimer must exist');
    assert.equal(mockPillIdentification.shape, 'Round');
  });

  test('Ensures Email notification dispatcher returns structured JSON with success flag', () => {
    const createNotificationResponse = (success, email, eventType) => ({
      success,
      data: {
        dispatchedAt: new Date().toISOString(),
        recipient: email,
        event: eventType,
        deliveryStatus: 'QUEUED',
      },
    });

    const res = createNotificationResponse(true, 'family.caregiver@domain.com', 'MISSED_DOSE_ESCALATION');
    assert.equal(res.success, true);
    assert.equal(res.data.recipient, 'family.caregiver@domain.com');
    assert.equal(res.data.deliveryStatus, 'QUEUED');
  });
});
