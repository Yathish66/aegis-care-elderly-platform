# AegisCare Patient Privacy & Data Protection Charter

## Commitment to Elderly Healthcare Privacy

AegisCare is designed with privacy-by-design principles for senior citizens, their families, and clinical caregivers. We prioritize autonomy, transparency, and data sovereignty.

---

## 1. Protected Health Information (PHI) & HIPAA Alignment

Under the Health Insurance Portability and Accountability Act (HIPAA), Protected Health Information (PHI) requires strict physical, technical, and administrative safeguards. AegisCare implements these safeguards via a **Zero-Knowledge Architecture**:

- **No Remote Database Requirement**: AegisCare does not transmit patient health records to any external cloud database. All patient data (medications, biometric measurements, clinical notes) resides strictly in the client-side device storage.
- **Client-Side Encryption**: Patient profile updates, emergency contacts, and vital logs use modern client-side storage sandboxed by the browser's origin security model.
- **Data Export & Portability**: Users can export their complete health profile, audit trail, and medication records as standard JSON or printable Clinical Medical Passports at any time.
- **Instant Data Erasure (Right to be Forgotten)**: Clearing the browser application cache or clicking "Reset Profile" permanently wipes all health information with zero server residue.

---

## 2. Artificial Intelligence & Google Gemini API Privacy

When users utilize AI-driven features (e.g., Gemini Prescription OCR, Multimodal Pill Identification, Safety Checks, or Voice Companion):

1. **Payload Minimization**: Only the specific image or clinical query is transmitted to the serverless API route. Direct identifying attributes (e.g., patient name, social security number, contact details) are never attached to model prompts.
2. **Stateless AI Processing**: Gemini API requests are executed statelessly (`ephemeral: true`). Google Gemini does not retain customer prompt data for foundational model training in production enterprise endpoints.
3. **Graceful Fallbacks**: If internet connectivity is lost or AI keys are unavailable, AegisCare gracefully falls back to deterministic local rule engines without interrupting patient medication reminders.

---

## 3. Pre-Loaded Demo Data Transparency

To facilitate zero-friction evaluation by judges and medical auditors, the live demo loads an initial synthetic clinical patient profile (*Dadi Kamala Sharma*, Age 78, Type-2 Diabetes & Hypertension). 

- All pre-loaded medical records, prescription IDs, and physician numbers are **synthetic test data** conforming to authentic clinical standards (FDA NDC codes and RxNorm identifiers).
- Real families can overwrite this profile with their authentic details at any time via the **Patient Profile Modal**.

---

## 4. Contact & Compliance Office

For inquiries regarding privacy practices or clinical data handling:
- **Compliance Officer**: `privacy@aegiscare-health.org`
- **Data Protection Officer**: `dpo@aegiscare-health.org`
