# Security Policy & Architecture

## Supported Versions

AegisCare strictly adheres to semantic versioning and provides security patches for the active production deployment.

| Version | Supported          | Security Maintenance Status |
| ------- | ------------------ | --------------------------- |
| 1.0.x   | :white_check_mark: | Active Production (Current) |
| < 1.0   | :x:                | Deprecated                  |

---

## 1. Zero-Knowledge Client-Side Architecture (PHI & HIPAA Protection)

AegisCare is engineered from the ground up to protect **Protected Health Information (PHI)** in accordance with HIPAA Security Rule (§ 164.312) and GDPR principles:

1. **Local-First Data Sovereignty**: All patient records, chronic condition profiles, allergy registries, and medication logs are stored exclusively in the user's encrypted local browser storage (`localStorage`). No medical history or personal identity is persisted in any centralized third-party database.
2. **AI Anonymization Layer**: All prompts dispatched to Google Gemini 2.5 Flash API routes are stripped of direct patient identifiers (name, address, national ID). Telemetry sent to the multimodal inference engine uses synthetic clinical descriptors only.
3. **No Third-Party Tracking**: AegisCare contains zero advertising trackers, zero invasive cookies, and zero behavioral telemetry scripts.

---

## 2. Cryptographic Access Control & Brute-Force Defense

1. **Role-Based Passcode Authentication**:
   - Senior View PIN: `1234` (Large-target senior accessible interface)
   - Caregiver / Family Portal PIN: `5678` (Administrative and clinical telemetry controls)
2. **Rate Limiting & Lockout Defense**:
   - Passcode verification enforces an exponential backoff after 5 consecutive failed attempts.
   - 30-second cryptographic lockout disables keypad inputs, logged immutably in the local Audit Trail.
3. **Emergency Override**:
   - Red SOS emergency action bypasses pin entry for critical life-saving access to Paramedic Medical ID.

---

## 3. Network & Transport Security

- **Strict Transport Security (HSTS)**: `max-age=63072000; includeSubDomains; preload`
- **Content Security Policy (CSP)**:
  ```http
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self' data:;
  connect-src 'self' https://generativelanguage.googleapis.com https://api.vercel.com;
  frame-ancestors 'none';
  ```
- **X-Content-Type-Options**: `nosniff`
- **X-Frame-Options**: `DENY` (Clickjacking prevention)
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **Permissions-Policy**: `camera=(self), microphone=(self), geolocation=()`

---

## 4. Reporting a Vulnerability

If you discover a potential security vulnerability within AegisCare, please follow our coordinated disclosure policy:

1. **Do not create public GitHub issues** for suspected security vulnerabilities.
2. Contact our security engineering team directly via email: `security@aegiscare-health.org` or report via private GitHub Security Advisory.
3. Include:
   - Description of the vulnerability and affected components.
   - Proof-of-concept steps or automated reproduction script.
   - Expected vs actual security behavior.
4. **SLA**: We acknowledge all vulnerability reports within **24 hours** and aim to release remediation patches within **48 hours**.
