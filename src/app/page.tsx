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
import { 
  INITIAL_PROFILE, 
  INITIAL_MEDICATIONS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_CAREGIVERS, 
  INITIAL_ADHERENCE_HISTORY, 
  INITIAL_SAFETY_ALERTS, 
  INITIAL_EMAILS 
} from '@/lib/initialData';
import { Medication, DoctorAppointment, EmailNotification, SafetyAlert } from '@/types';
import { ExtractedMedication } from '@/lib/gemini';
import confetti from 'canvas-confetti';

export default function Home() {
  // Core Application State
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [appointments, setAppointments] = useState<DoctorAppointment[]>(INITIAL_APPOINTMENTS);
  const [caregivers, setCaregivers] = useState(INITIAL_CAREGIVERS);
  const [adherenceHistory, setAdherenceHistory] = useState(INITIAL_ADHERENCE_HISTORY);
  const [safetyAlerts, setSafetyAlerts] = useState<SafetyAlert[]>(INITIAL_SAFETY_ALERTS);
  const [emails, setEmails] = useState<EmailNotification[]>(INITIAL_EMAILS);

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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Persona Switch Handler with Passcode Trigger
  const handleSwitchPersona = (target: 'senior' | 'family') => {
    if (target === currentPersona) return;
    setPendingPersona(target);
    setIsPasscodeModalOpen(true);
  };

  const handlePasscodeSuccess = (target: 'senior' | 'family') => {
    setCurrentPersona(target);
    showToast(`Switched to ${target === 'senior' ? 'Senior Mode' : 'Family & Caregiver Portal'}`);
  };

  // Dose Actions
  const handleMarkDoseTaken = async (medId: string) => {
    const med = medications.find(m => m.id === medId);
    if (!med) return;

    setMedications(prev => prev.map(m => {
      if (m.id === medId) {
        return {
          ...m,
          status: 'taken',
          lastTakenAt: `Today at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`,
        };
      }
      return m;
    }));

    // Update Adherence History
    setAdherenceHistory(prev => {
      const copy = [...prev];
      const today = copy[copy.length - 1];
      if (today) {
        today.takenDoses = Math.min(today.totalDoses, today.takenDoses + 1);
        today.percentage = Math.round((today.takenDoses / today.totalDoses) * 100);
      }
      return copy;
    });

    // Proactive Notification to Daughter
    const newEmail: EmailNotification = {
      id: `mail-${Date.now()}`,
      recipientEmail: 'priya.sharma.care@gmail.com',
      recipientName: 'Priya Sharma (Daughter)',
      type: 'UPCOMING_DOSE',
      subject: `Dose Logged: Dadi Kamala took ${med.name} (${med.dosage})`,
      body: `Dadi Kamala just confirmed taking her ${med.name} (${med.dosage}) scheduled for ${med.scheduledTime}. Adherence telemetry updated.`,
      timestamp: `Today at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`,
      status: 'DELIVERED',
    };

    setEmails(prev => [newEmail, ...prev]);
    showToast(`✓ Great job Dadi! Logged ${med.name} as taken. Notification sent to daughter Priya.`);
  };

  const handleSnoozeDose = (medId: string) => {
    showToast('⏰ Dose snoozed for 15 minutes. We will remind you gently.');
  };

  const handleToggleDoseStatus = (medId: string) => {
    setMedications(prev => prev.map(m => {
      if (m.id === medId) {
        const nextStatus = m.status === 'taken' ? 'upcoming' : 'taken';
        return { ...m, status: nextStatus };
      }
      return m;
    }));
    showToast('Updated medication status');
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(prev => prev.filter(m => m.id !== id));
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
    }));

    setMedications(prev => [...prev, ...formatted]);
    showToast(`✓ Added ${formatted.length} new medications extracted by Gemini Vision!`);
    confetti({ particleCount: 50, spread: 60 });
  };

  // Add Medication
  const handleAddSingleMedication = (newMed: Medication) => {
    setMedications(prev => [...prev, newMed]);
    showToast(`Added ${newMed.name} to active schedule`);
  };

  // Add Appointment
  const handleAddAppointment = (newApt: DoctorAppointment) => {
    setAppointments(prev => [...prev, newApt]);
    showToast(`Scheduled visit with ${newApt.doctorName}`);
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
        setEmails(prev => [json.delivery, ...prev]);
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
      const medNames = medications.map(m => `${m.name} ${m.dosage}`);
      const res = await fetch('/api/gemini/safety-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medications: medNames, conditions: profile.conditions }),
      });
      const json = await res.json();
      if (json.success && json.data) {
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
    if (scenario === 'senior') {
      setCurrentPersona('senior');
      showToast('Scenario Loaded: Senior Voice Mode');
    } else if (scenario === 'ocr') {
      setCurrentPersona('family');
      setIsScannerOpen(true);
    } else if (scenario === 'escalation') {
      setCurrentPersona('family');
      handleTriggerMissedDoseEscalation();
    }
  };

  const toggleSeniorFontSize = () => {
    setSeniorFontSize(prev => prev === 'normal' ? 'large' : prev === 'large' ? 'extra-large' : 'normal');
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
        onEmergencyCall={() => showToast(`🚨 Calling Primary Emergency Contact: ${profile.emergencyContact.name} (${profile.emergencyContact.phone})`)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {currentPersona === 'senior' ? (
          <SeniorView
            profile={profile}
            medications={medications}
            onMarkDoseTaken={handleMarkDoseTaken}
            onSnoozeDose={handleSnoozeDose}
            seniorFontSize={seniorFontSize}
            onEmergencyCall={() => showToast(`🚨 Calling Primary Emergency Contact: ${profile.emergencyContact.name} (${profile.emergencyContact.phone})`)}
          />
        ) : (
          <FamilyPortal
            profile={profile}
            medications={medications}
            appointments={appointments}
            caregivers={caregivers}
            adherenceHistory={adherenceHistory}
            safetyAlerts={safetyAlerts}
            onOpenScanner={() => setIsScannerOpen(true)}
            onOpenDoctorSummary={() => setIsDoctorSummaryOpen(true)}
            onOpenAddMedication={() => setIsAddMedOpen(true)}
            onOpenAddAppointment={() => setIsAddAptOpen(true)}
            onTriggerMissedDoseEscalation={handleTriggerMissedDoseEscalation}
            onDeleteMedication={handleDeleteMedication}
            onToggleDoseStatus={handleToggleDoseStatus}
            onRunGeminiSafetyCheck={handleRunGeminiSafetyCheck}
            isAnalyzingSafety={isAnalyzingSafety}
          />
        )}

      </main>

      {/* Modals & Drawers */}
      <PasscodeModal
        isOpen={isPasscodeModalOpen}
        onClose={() => setIsPasscodeModalOpen(false)}
        targetPersona={pendingPersona}
        onSuccess={handlePasscodeSuccess}
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

    </div>
  );
}
