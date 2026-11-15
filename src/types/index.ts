export type DoseStatus = 'upcoming' | 'taken' | 'missed' | 'snoozed';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string; // e.g. "Once daily", "Twice daily"
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'bedtime';
  scheduledTime: string; // "08:00 AM"
  instructions: string; // "Take with warm water after breakfast"
  purpose: string; // "Blood pressure regulation"
  pillColor: string; // Tailwind color accent
  status: DoseStatus;
  lastTakenAt?: string;
  foodWarning?: string; // "Avoid grapefruit juice"
  remainingPills?: number;
  totalPills?: number;
  refillThreshold?: number;
  rxNumber?: string;
  pharmacyName?: string;
  ndcCode?: string;
  rxNormId?: string;
  manufacturer?: string;
}

export interface DoctorAppointment {
  id: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  date: string; // "2026-11-22"
  time: string; // "10:30 AM"
  purpose: string;
  prepInstructions?: string;
  contactNumber: string;
}

export interface Caregiver {
  id: string;
  name: string;
  relationship: string; // "Daughter", "Primary Caregiver", "Son"
  email: string;
  phone: string;
  notifyOnMissedDose: boolean;
  notifyOnDoctorVisit: boolean;
  avatarUrl?: string;
}

export interface AdherenceDay {
  day: string; // "Mon", "Tue", etc.
  percentage: number;
  totalDoses: number;
  takenDoses: number;
}

export interface SafetyAlert {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  medicationsInvolved: string[];
  actionRecommendation: string;
}

export interface EmailNotification {
  id: string;
  recipientEmail: string;
  recipientName: string;
  type: 'UPCOMING_DOSE' | 'MISSED_DOSE_ESCALATION' | 'APPOINTMENT_REMINDER' | 'DAILY_REPORT' | 'EMERGENCY_SOS' | 'PHARMACY_REFILL';
  subject: string;
  body: string;
  timestamp: string;
  status: 'DELIVERED';
}

export interface ElderlyProfile {
  id: string;
  fullName: string;
  preferredName: string;
  age: number;
  seniorPasscode: string; // "1234"
  familyPasscode: string; // "5678"
  bloodGroup: string;
  conditions: string[];
  allergies: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  physician: {
    name: string;
    clinic: string;
    phone: string;
  };
  livingWillStatus: string;
  homeAddress: string;
}

export interface VitalReading {
  id: string;
  timestamp: string;
  dateStr: string;
  bloodPressureSys: number;
  bloodPressureDia: number;
  bloodGlucose: number; // mg/dL
  heartRate: number; // bpm
  oxygenSaturation: number; // %
  notes?: string;
  flag: 'NORMAL' | 'ELEVATED' | 'CRITICAL';
}

export interface VitalCorrelationAnalysis {
  summary: string;
  clinicalObservations: string[];
  adherenceImpact: string;
  recommendations: string[];
  confidenceScore: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: 'SENIOR' | 'CAREGIVER' | 'SYSTEM' | 'PHYSICIAN';
  action: string;
  category: 'MEDICATION' | 'SECURITY' | 'APPOINTMENT' | 'SAFETY' | 'EMERGENCY' | 'TELEMETRY';
  details: string;
}

export interface PharmacyRefillOrder {
  id: string;
  medicationId: string;
  medicationName: string;
  rxNumber: string;
  quantityOrdered: number;
  orderedAt: string;
  status: 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED';
  pharmacyName: string;
  deliveryAddress: string;
}

export interface PillRecognitionResult {
  identified: boolean;
  matchName?: string;
  dosage?: string;
  colorDescription?: string;
  shapeDescription?: string;
  imprintDetected?: string;
  confidenceScore: number;
  clinicalAdvice: string;
  matchesPrescription: boolean;
  scheduledTime?: string;
}
