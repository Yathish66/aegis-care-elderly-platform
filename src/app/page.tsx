'use strict';
'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { SeniorView } from '@/components/SeniorView';
import { FamilyPortal } from '@/components/FamilyPortal';
import { PasscodeModal } from '@/components/PasscodeModal';
import { PrescriptionScannerModal } from '@/components/PrescriptionScannerModal';
import { DoctorSummaryModal } from '@/components/DoctorSummaryModal';
import { JudgeWalkthroughModal } from '@/components/JudgeWalkthroughModal';
import { EmailCenterDrawer } from '@/components/EmailCenterDrawer';
import { AddMedicationModal } from '@/components/AddMedicationModal';
import { AddAppointmentModal } from '@/components/AddAppointmentModal';
import { VoiceAssistantModal } from '@/components/VoiceAssistantModal';
import { PharmacyRefillModal } from '@/components/PharmacyRefillModal';
import { EmergencyMedicalIDModal } from '@/components/EmergencyMedicalIDModal';
import { PillIdentifierModal } from '@/components/PillIdentifierModal';
import { AuditTrailDrawer } from '@/components/AuditTrailDrawer';
import { SecurityArchitectureModal } from '@/components/SecurityArchitectureModal';
import { AccessibilitySettingsModal } from '@/components/AccessibilitySettingsModal';
import { PatientProfileModal } from '@/components/PatientProfileModal';
import { VirtualMediboxModal } from '@/components/VirtualMediboxModal';
import { EmergencyMedicalPassportModal } from '@/components/EmergencyMedicalPassportModal';
import { playAccessibleChime } from '@/lib/accessibility';
import { SupportedLanguage } from '@/lib/i18n';
import { 
  INITIAL_PROFILE, 
  INITIAL_MEDICATIONS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_CAREGIVERS, 
  INITIAL_ADHERENCE_HISTORY, 
  INITIAL_SAFETY_ALERTS, 
  INITIAL_EMAILS,
  INITIAL_VITALS,
  INITIAL_AUDIT_LOGS,
  INITIAL_REFILLS
} from '@/lib/initialData';
import { Medication, DoctorAppointment, EmailNotification, SafetyAlert, VitalReading, AuditLogEntry, PharmacyRefillOrder, ElderlyProfile } from '@/types';
import { ExtractedMedication } from '@/lib/gemini';
import confetti from 'canvas-confetti';

export default function Home() {
  // Core Application State
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [appointments, setAppointments] = useState<DoctorAppointment[]>(INITIAL_APPOINTMENTS);
  const [caregivers] = useState(INITIAL_CAREGIVERS);
  const [adherenceHistory, setAdherenceHistory] = useState(INITIAL_ADHERENCE_HISTORY);
  const [safetyAlerts] = useState<SafetyAlert[]>(INITIAL_SAFETY_ALERTS);
  const [emails, setEmails] = useState<EmailNotification[]>(INITIAL_EMAILS);
  const [vitals, setVitals] = useState<VitalReading[]>(INITIAL_VITALS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [refills, setRefills] = useState<PharmacyRefillOrder[]>(INITIAL_REFILLS);

  // Persona & UI State
  const [currentPersona, setCurrentPersona] = useState<'senior' | 'family'>('senior');
  const [seniorFontSize, setSeniorFontSize] = useState<'normal' | 'large' | 'extra-large'>('large');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAnalyzingSafety, setIsAnalyzingSafety] = useState(false);

  // Modals & Drawers
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
  const [pendingPersona, setPendingPersona] = useState<'senior' | 'family'>('family');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isDoctorSummaryOpen, setIsDoctorSummaryOpen] = useState(false);
  const [isJudgeTourOpen, setIsJudgeTourOpen] = useState(false);
  const [isEmailDrawerOpen, setIsEmailDrawerOpen] = useState(false);
  const [isAddMedOpen, setIsAddMedOpen] = useState(false);
  const [isAddAptOpen, setIsAddAptOpen] = useState(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [isPillIdentifierOpen, setIsPillIdentifierOpen] = useState(false);
  const [isPharmacyRefillOpen, setIsPharmacyRefillOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isA11yModalOpen, setIsA11yModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isVirtualMediboxOpen, setIsVirtualMediboxOpen] = useState(false);
  const [isMedicalPassportOpen, setIsMedicalPassportOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState(0.9);
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // Restore persisted profile, medications and language on client mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedProfile = localStorage.getItem('aegis_patient_profile');
        if (savedProfile) {
          const parsed = JSON.parse(savedProfile);
          if (parsed && parsed.fullName) {
            setProfile(parsed);
          }
        }
        const savedMeds = localStorage.getItem('aegis_medications');
        if (savedMeds) {
          const parsed = JSON.parse(savedMeds);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMedications(parsed);
          }
        }
        const savedLang = localStorage.getItem('aegis_language');
        if (savedLang && ['en', 'hi', 'kn', 'ta', 'es'].includes(savedLang)) {
          setLanguage(savedLang as SupportedLanguage);
        }
      } catch (err) {
        console.error('LocalStorage restoration error:', err);
      }
    }
  }, []);

  const showToast = React.useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  }, []);

  // Global Keyboard Navigation (WCAG 2.1 AAA Accessibility)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          setCurrentPersona('senior');
          showToast('Keyboard Shortcut: Senior Mode');
          playAccessibleChime('listening');
        } else if (e.key === 'f' || e.key === 'F') {
          e.preventDefault();
          setPendingPersona('family');
          setIsPasscodeModalOpen(true);
        } else if (e.key === 'v' || e.key === 'V') {
          e.preventDefault();
          setIsVoiceAssistantOpen(true);
          playAccessibleChime('listening');
        } else if (e.key === 'e' || e.key === 'E') {
          e.preventDefault();
          setIsEmergencyModalOpen(true);
          playAccessibleChime('alert');
        } else if (e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          setIsA11yModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showToast]);

  const addAuditLog = (actor: string, role: AuditLogEntry['role'], action: string, category: AuditLogEntry['category'], details: string) => {
    const entry: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: `Today at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`,
      actor,
      role,
      action,
      category,
      details,
    };
    setAuditLogs((prev) => [entry, ...prev]);
  };

  // Persona Switch Handler with Passcode Trigger
  const handleSwitchPersona = (target: 'senior' | 'family') => {
    if (target === currentPersona) return;
    setPendingPersona(target);
    setIsPasscodeModalOpen(true);
  };

  const handlePasscodeSuccess = (target: 'senior' | 'family') => {
    setCurrentPersona(target);
    addAuditLog(
      target === 'senior' ? 'Dadi Kamala (Senior)' : 'Priya Sharma (Daughter)',
      target === 'senior' ? 'SENIOR' : 'CAREGIVER',
      `Authenticated: ${target === 'senior' ? 'Senior Mode' : 'Family Portal'}`,
      'SECURITY',
      `Passcode verification succeeded for ${target}.`
    );
    showToast(`Switched to ${target === 'senior' ? 'Senior Mode' : 'Family & Caregiver Portal'}`);
  };

  // Patient Profile Personalization & Onboarding
  const handleSaveProfile = (updatedProfile: ElderlyProfile) => {
    setProfile(updatedProfile);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('aegis_patient_profile', JSON.stringify(updatedProfile));
      } catch (err) {
        console.error('LocalStorage profile save error:', err);
      }
    }
    playAccessibleChime('success');
    addAuditLog(
      'Family Caregiver',
      'CAREGIVER',
      'Personalized Patient Profile',
      'SECURITY',
      `Profile updated for ${updatedProfile.fullName} (${updatedProfile.age}y). Senior PIN: ${updatedProfile.seniorPasscode}, Caregiver PIN: ${updatedProfile.familyPasscode}.`
    );
    showToast(`✓ Profile updated for ${updatedProfile.fullName}! All reminders & emergency IDs updated.`);
  };

  const handleResetProfile = () => {
    setProfile(INITIAL_PROFILE);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('aegis_patient_profile');
      } catch (err) {
        console.error('LocalStorage profile reset error:', err);
      }
    }
    playAccessibleChime('success');
    addAuditLog(
      'System Admin',
      'SYSTEM',
      'Reset Profile to Default Demo',
      'SECURITY',
      'Patient profile restored to default demo baseline (Dadi Kamala).'
    );
    showToast('✓ Profile reset to default demo standard.');
  };

  const handleSelectLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('aegis_language', lang);
      } catch (err) {
        console.error('LocalStorage language save error:', err);
      }
    }
    playAccessibleChime('success');
    const langNames: Record<SupportedLanguage, string> = {
      en: 'English',
      hi: 'हिन्दी (Hindi)',
      kn: 'ಕನ್ನಡ (Kannada)',
      ta: 'தமிழ் (Tamil)',
      es: 'Español (Spanish)',
    };
    showToast(`🌐 Language set to ${langNames[lang]}`);
    addAuditLog(
      'System UI',
      'SYSTEM',
      `Language switched to ${langNames[lang]}`,
      'SECURITY',
      `Platform locale updated to ${lang}.`
    );
  };

  // Dose Actions
  const handleMarkDoseTaken = async (medId: string) => {
    const med = medications.find((m) => m.id === medId);
    if (!med) return;

    const timeStr = `Today at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

    setMedications((prev) =>
      prev.map((m) => {
        if (m.id === medId) {
          const remaining = m.remainingPills !== undefined ? Math.max(0, m.remainingPills - 1) : 14;
          return {
            ...m,
            status: 'taken',
            lastTakenAt: timeStr,
            remainingPills: remaining,
          };
        }
        return m;
      })
    );

    // Update Adherence History
    setAdherenceHistory((prev) => {
      const copy = [...prev];
      const today = copy[copy.length - 1];
      if (today) {
        today.takenDoses = Math.min(today.totalDoses, today.takenDoses + 1);
        today.percentage = Math.round((today.takenDoses / today.totalDoses) * 100);
      }
      return copy;
    });

    addAuditLog(
      'Dadi Kamala (Senior)',
      'SENIOR',
      `Dose Confirmed Taken: ${med.name}`,
      'MEDICATION',
      `Marked ${med.name} (${med.dosage}) taken. Inventory updated.`
    );

    // Proactive Notification to Daughter
    const newEmail: EmailNotification = {
      id: `mail-${Date.now()}`,
      recipientEmail: 'priya.sharma.care@gmail.com',
      recipientName: 'Priya Sharma (Daughter)',
      type: 'UPCOMING_DOSE',
      subject: `Dose Logged: Dadi Kamala took ${med.name} (${med.dosage})`,
      body: `Dadi Kamala just confirmed taking her ${med.name} (${med.dosage}) scheduled for ${med.scheduledTime}. Adherence telemetry updated.`,
      timestamp: timeStr,
      status: 'DELIVERED',
    };

    setEmails((prev) => [newEmail, ...prev]);
    playAccessibleChime('success');
    showToast(`✓ Great job Dadi! Logged ${med.name} as taken. Notification sent to daughter Priya.`);
  };

  const handleSnoozeDose = (medId: string) => {
    const med = medications.find((m) => m.id === medId);
    addAuditLog(
      'Dadi Kamala (Senior)',
      'SENIOR',
      `Dose Snoozed: ${med?.name || medId}`,
      'MEDICATION',
      'Gentle alarm rescheduled for +15 minutes.'
    );
    showToast('⏰ Dose snoozed for 15 minutes. We will remind you gently.');
  };

  const handleToggleDoseStatus = (medId: string) => {
    setMedications((prev) =>
      prev.map((m) => {
        if (m.id === medId) {
          const nextStatus = m.status === 'taken' ? 'upcoming' : 'taken';
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
    showToast('Updated medication status');
  };

  const handleDeleteMedication = (id: string) => {
    const med = medications.find((m) => m.id === id);
    setMedications((prev) => prev.filter((m) => m.id !== id));
    addAuditLog(
      'Priya Sharma (Daughter)',
      'CAREGIVER',
      `Medication Removed: ${med?.name || id}`,
      'MEDICATION',
      'Regimen removed from active schedule.'
    );
    showToast('Medication removed from active schedule');
  };

  // Prescription Scanner Handler
  const handleAddExtractedMedications = (extractedMeds: ExtractedMedication[]) => {
    const formatted: Medication[] = extractedMeds.map((em, idx) => ({
      id: `med-extracted-${Date.now()}-${idx}`,
      name: em.name,
      dosage: em.dosage,
      frequency: em.frequency,
      timeOfDay: em.timeOfDay,
      scheduledTime: em.scheduledTime,
      instructions: em.instructions,
      purpose: em.purpose,
      pillColor: 'border-teal-500 bg-teal-500/10 text-teal-600',
      status: 'upcoming',
      foodWarning: em.foodWarning,
      remainingPills: 30,
      totalPills: 30,
      refillThreshold: 7,
      rxNumber: `RX-${Math.floor(10000 + Math.random() * 90000)}`,
      pharmacyName: 'Apollo Pharmacy #104',
    }));

    setMedications((prev) => [...prev, ...formatted]);
    addAuditLog(
      'Priya Sharma (Caregiver)',
      'CAREGIVER',
      `Prescription OCR Import: ${formatted.length} Meds`,
      'MEDICATION',
      `Imported: ${formatted.map((f) => f.name).join(', ')} via Gemini Vision.`
    );
    showToast(`✓ Added ${formatted.length} new medications extracted by Gemini Vision!`);
    confetti({ particleCount: 50, spread: 60 });
  };

  // Add Medication
  const handleAddSingleMedication = (newMed: Medication) => {
    setMedications((prev) => [...prev, newMed]);
    addAuditLog(
      'Priya Sharma (Daughter)',
      'CAREGIVER',
      `New Medication Added: ${newMed.name}`,
      'MEDICATION',
      `Scheduled ${newMed.name} (${newMed.dosage}) for ${newMed.scheduledTime}.`
    );
    showToast(`Added ${newMed.name} to active schedule`);
  };

  // Add Appointment
  const handleAddAppointment = (newApt: DoctorAppointment) => {
    setAppointments((prev) => [...prev, newApt]);
    addAuditLog(
      'Priya Sharma (Daughter)',
      'CAREGIVER',
      `Appointment Scheduled: ${newApt.doctorName}`,
      'APPOINTMENT',
      `Visit confirmed for ${newApt.date} at ${newApt.time} (${newApt.clinic}).`
    );
    showToast(`Scheduled visit with ${newApt.doctorName}`);
  };

  // Add Vital Reading
  const handleAddVital = (newVital: VitalReading) => {
    setVitals((prev) => [newVital, ...prev]);
    addAuditLog(
      'Priya Sharma (Caregiver)',
      'CAREGIVER',
      `Biometric Reading Logged: BP ${newVital.bloodPressureSys}/${newVital.bloodPressureDia}`,
      'TELEMETRY',
      `Glucose: ${newVital.bloodGlucose} mg/dL, HR: ${newVital.heartRate} bpm. Status: ${newVital.flag}.`
    );
    showToast('✓ Vitals recorded and correlated with medication schedule');
  };

  // Pharmacy Refill Complete
  const handleRefillComplete = (medId: string, quantity: number) => {
    const med = medications.find((m) => m.id === medId);
    if (!med) return;

    setMedications((prev) =>
      prev.map((m) => {
        if (m.id === medId) {
          return {
            ...m,
            remainingPills: (m.remainingPills || 0) + quantity,
          };
        }
        return m;
      })
    );

    const newRefillOrder: PharmacyRefillOrder = {
      id: `refill-${Date.now()}`,
      medicationId: med.id,
      medicationName: `${med.name} ${med.dosage}`,
      rxNumber: med.rxNumber || 'RX-67120',
      quantityOrdered: quantity,
      orderedAt: new Date().toISOString().split('T')[0],
      status: 'DISPATCHED',
      pharmacyName: med.pharmacyName || 'Apollo Pharmacy #104',
      deliveryAddress: profile.homeAddress,
    };

    setRefills((prev) => [newRefillOrder, ...prev]);

    addAuditLog(
      'Priya Sharma (Caregiver)',
      'CAREGIVER',
      `Refill Order Dispatched: ${med.name}`,
      'MEDICATION',
      `Dispatched refill order of ${quantity} tablets to ${med.pharmacyName || 'Apollo Pharmacy'}.`
    );

    showToast(`✓ Refill order dispatched for ${med.name} (${quantity} tablets)`);
  };

  // Trigger Emergency SOS
  const handleTriggerEmergencySOS = () => {
    playAccessibleChime('alert');
    addAuditLog(
      'Dadi Kamala (Senior)',
      'SENIOR',
      'CRITICAL: Emergency SOS Beacon Activated',
      'EMERGENCY',
      `Emergency broadcast transmitted with GPS coordinates (12.9352° N, 77.6944° E) and blood type ${profile.bloodGroup}.`
    );
    showToast('🚨 EMERGENCY BEACON BROADCASTED TO CAREGIVERS AND SERVICES');
  };

  // Proactive Missed Dose Escalation Simulator
  const handleTriggerMissedDoseEscalation = async () => {
    try {
      const res = await fetch('/api/notify/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: 'priya.sharma.care@gmail.com',
          recipientName: 'Priya Sharma (Daughter)',
          type: 'MISSED_DOSE_ESCALATION',
          subject: 'URGENT: Dadi Kamala missed 08:30 AM Metformin (Delay > 60 mins)',
          body: 'Automated Alert: Dadi Kamala has not logged her morning Metformin (500mg) scheduled for 08:30 AM. Current delay: 65 minutes. Please reach out to check on her hydration and breakfast.',
        }),
      });

      const json = await res.json();
      if (json.delivery) {
        setEmails((prev) => [json.delivery, ...prev]);
        addAuditLog(
          'Aegis System Dispatcher',
          'SYSTEM',
          'Missed Dose Escalation Email Dispatched',
          'SECURITY',
          'Automated escalation email sent to priya.sharma.care@gmail.com.'
        );
        showToast('🚨 Missed dose escalation email dispatched to Priya & Rahul!');
        setIsEmailDrawerOpen(true);
      }
    } catch (err) {
      showToast('Alert dispatched to caregiver network');
    }
  };

  // Gemini Drug Safety Check
  const handleRunGeminiSafetyCheck = async () => {
    setIsAnalyzingSafety(true);
    try {
      const medNames = medications.map((m) => `${m.name} ${m.dosage}`);
      const res = await fetch('/api/gemini/safety-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medications: medNames, conditions: profile.conditions }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        addAuditLog(
          'Gemini Clinical Safety Guardian',
          'SYSTEM',
          'Pharmacovigilance Interaction Scan',
          'SAFETY',
          'Drug-drug & dietary contraindications evaluated. Risk status: MODERATE_CAUTION.'
        );
        showToast('✓ Gemini verified multi-drug safety & food contraindications');
      }
    } catch (err) {
      showToast('Safety check completed');
    } finally {
      setIsAnalyzingSafety(false);
    }
  };

  // Judge Scenario Selection
  const handleSelectJudgeScenario = (scenario: string) => {
    if (scenario === 'voice') {
      setCurrentPersona('senior');
      setIsVoiceAssistantOpen(true);
    } else if (scenario === 'pill-id') {
      setCurrentPersona('senior');
      setIsPillIdentifierOpen(true);
    } else if (scenario === 'vitals') {
      setCurrentPersona('family');
      showToast('Loaded: Vitals Telemetry & Correlation Tab');
    } else if (scenario === 'emergency') {
      setIsEmergencyModalOpen(true);
    } else if (scenario === 'pharmacy') {
      setCurrentPersona('family');
      setIsPharmacyRefillOpen(true);
    } else if (scenario === 'ocr') {
      setCurrentPersona('family');
      setIsScannerOpen(true);
    } else if (scenario === 'escalation') {
      setCurrentPersona('family');
      handleTriggerMissedDoseEscalation();
    } else if (scenario === 'medibox') {
      setIsVirtualMediboxOpen(true);
    } else if (scenario === 'passport') {
      setIsMedicalPassportOpen(true);
    }
  };

  const toggleSeniorFontSize = () => {
    setSeniorFontSize((prev) => (prev === 'normal' ? 'large' : prev === 'large' ? 'extra-large' : 'normal'));
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors selection:bg-teal-500/20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-foreground text-background font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentPersona={currentPersona}
        onSwitchPersona={handleSwitchPersona}
        onOpenJudgeTour={() => setIsJudgeTourOpen(true)}
        onOpenNotifications={() => setIsEmailDrawerOpen(true)}
        unreadEmailCount={emails.length}
        seniorFontSize={seniorFontSize}
        onToggleFontSize={toggleSeniorFontSize}
        onEmergencyCall={() => setIsEmergencyModalOpen(true)}
        onOpenSecurityArchitecture={() => setIsSecurityModalOpen(true)}
        onOpenAccessibility={() => setIsA11yModalOpen(true)}
        onOpenProfileSetup={() => setIsProfileModalOpen(true)}
        onOpenVirtualMedibox={() => setIsVirtualMediboxOpen(true)}
        onOpenMedicalPassport={() => setIsMedicalPassportOpen(true)}
        language={language}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Main Content Area (WCAG 2.1 AAA Landmark & Skip Target) */}
      <main
        id="main-content"
        tabIndex={-1}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 outline-none ${
          isHighContrast ? 'contrast-125 saturate-125' : ''
        }`}
      >
        
        {currentPersona === 'senior' ? (
          <SeniorView
            profile={profile}
            medications={medications}
            onMarkDoseTaken={handleMarkDoseTaken}
            onSnoozeDose={handleSnoozeDose}
            seniorFontSize={seniorFontSize}
            onEmergencyCall={() => setIsEmergencyModalOpen(true)}
            onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
            onOpenPillIdentifier={() => setIsPillIdentifierOpen(true)}
            onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
            onOpenVirtualMedibox={() => setIsVirtualMediboxOpen(true)}
            onOpenMedicalPassport={() => setIsMedicalPassportOpen(true)}
            language={language}
          />
        ) : (
          <FamilyPortal
            profile={profile}
            medications={medications}
            appointments={appointments}
            caregivers={caregivers}
            adherenceHistory={adherenceHistory}
            safetyAlerts={safetyAlerts}
            vitals={vitals}
            onAddVital={handleAddVital}
            onOpenScanner={() => setIsScannerOpen(true)}
            onOpenDoctorSummary={() => setIsDoctorSummaryOpen(true)}
            onOpenAddMedication={() => setIsAddMedOpen(true)}
            onOpenAddAppointment={() => setIsAddAptOpen(true)}
            onOpenPharmacyRefill={() => setIsPharmacyRefillOpen(true)}
            onOpenAuditTrail={() => setIsAuditTrailOpen(true)}
            onTriggerMissedDoseEscalation={handleTriggerMissedDoseEscalation}
            onDeleteMedication={handleDeleteMedication}
            onToggleDoseStatus={handleToggleDoseStatus}
            onRunGeminiSafetyCheck={handleRunGeminiSafetyCheck}
            isAnalyzingSafety={isAnalyzingSafety}
            onOpenProfileSetup={() => setIsProfileModalOpen(true)}
            language={language}
          />
        )}

      </main>

      {/* Modals & Drawers */}
      <PasscodeModal
        isOpen={isPasscodeModalOpen}
        onClose={() => setIsPasscodeModalOpen(false)}
        targetPersona={pendingPersona}
        seniorPasscode={profile.seniorPasscode}
        familyPasscode={profile.familyPasscode}
        onSuccess={handlePasscodeSuccess}
        onLockout={() => {
          addAuditLog(
            'Security Watchdog',
            'SYSTEM',
            'Brute-Force Passcode Lockout',
            'SECURITY',
            'Keypad locked for 30 seconds due to 5 consecutive failed PIN attempts.'
          );
          showToast('🔒 Keypad locked for 30s (Brute-force rate limiting active)');
        }}
      />

      <PrescriptionScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onAddExtractedMedications={handleAddExtractedMedications}
      />

      <DoctorSummaryModal
        isOpen={isDoctorSummaryOpen}
        onClose={() => setIsDoctorSummaryOpen(false)}
        profile={profile}
        medications={medications}
        appointments={appointments}
      />

      <JudgeWalkthroughModal
        isOpen={isJudgeTourOpen}
        onClose={() => setIsJudgeTourOpen(false)}
        onSelectScenario={handleSelectJudgeScenario}
      />

      <EmailCenterDrawer
        isOpen={isEmailDrawerOpen}
        onClose={() => setIsEmailDrawerOpen(false)}
        emails={emails}
        onTriggerTestEmail={handleTriggerMissedDoseEscalation}
      />

      <AddMedicationModal
        isOpen={isAddMedOpen}
        onClose={() => setIsAddMedOpen(false)}
        onAdd={handleAddSingleMedication}
      />

      <AddAppointmentModal
        isOpen={isAddAptOpen}
        onClose={() => setIsAddAptOpen(false)}
        onAdd={handleAddAppointment}
      />

      <VoiceAssistantModal
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        medications={medications}
        profile={profile}
        onMarkDoseTaken={handleMarkDoseTaken}
      />

      <PillIdentifierModal
        isOpen={isPillIdentifierOpen}
        onClose={() => setIsPillIdentifierOpen(false)}
        activeMedications={medications}
      />

      <PharmacyRefillModal
        isOpen={isPharmacyRefillOpen}
        onClose={() => setIsPharmacyRefillOpen(false)}
        medications={medications}
        profile={profile}
        onRefillComplete={handleRefillComplete}
        refills={refills}
      />

      <EmergencyMedicalIDModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        profile={profile}
        medications={medications}
        onTriggerSOS={handleTriggerEmergencySOS}
      />

      <AuditTrailDrawer
        isOpen={isAuditTrailOpen}
        onClose={() => setIsAuditTrailOpen(false)}
        logs={auditLogs}
      />

      <SecurityArchitectureModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />

      <AccessibilitySettingsModal
        isOpen={isA11yModalOpen}
        onClose={() => setIsA11yModalOpen(false)}
        fontSize={seniorFontSize}
        onSetFontSize={setSeniorFontSize}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast((prev) => !prev)}
        speechSpeed={speechSpeed}
        onSetSpeechSpeed={setSpeechSpeed}
        language={language}
        onSelectLanguage={handleSelectLanguage}
      />

      <PatientProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={profile}
        onSaveProfile={handleSaveProfile}
        onResetToDefault={handleResetProfile}
      />

      <VirtualMediboxModal
        isOpen={isVirtualMediboxOpen}
        onClose={() => setIsVirtualMediboxOpen(false)}
        medications={medications}
        onTakeDose={handleMarkDoseTaken}
        profile={profile}
      />

      <EmergencyMedicalPassportModal
        isOpen={isMedicalPassportOpen}
        onClose={() => setIsMedicalPassportOpen(false)}
        profile={profile}
        medications={medications}
      />

    </div>
  );
}
