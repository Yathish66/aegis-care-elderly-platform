import { ElderlyProfile, Medication, DoctorAppointment, Caregiver, AdherenceDay, SafetyAlert, EmailNotification } from '@/types';

export const INITIAL_PROFILE: ElderlyProfile = {
  id: 'elderly-001',
  fullName: 'Kamala Sharma',
  preferredName: 'Dadi Kamala',
  age: 72,
  seniorPasscode: '1234',
  familyPasscode: '5678',
  bloodGroup: 'B+ Positive',
  conditions: ['Type-2 Diabetes', 'Hypertension (High BP)', 'Mild Osteoarthritis'],
  allergies: ['Penicillin', 'Sulfa drugs'],
  emergencyContact: {
    name: 'Priya Sharma (Daughter)',
    phone: '+91 98450 12345',
    relation: 'Daughter / Primary Caregiver',
  },
};

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-1',
    name: 'Metformin Hydrochloride',
    dosage: '500 mg',
    frequency: 'Twice daily',
    timeOfDay: 'morning',
    scheduledTime: '08:30 AM',
    instructions: 'Take immediately after breakfast with a full glass of water.',
    purpose: 'Blood sugar control for Type-2 Diabetes',
    pillColor: 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    status: 'taken',
    lastTakenAt: 'Today at 8:35 AM',
    foodWarning: 'Take with food to avoid stomach upset',
  },
  {
    id: 'med-2',
    name: 'Telmisartan (Micardis)',
    dosage: '40 mg',
    frequency: 'Once daily',
    timeOfDay: 'morning',
    scheduledTime: '09:00 AM',
    instructions: 'Take in the morning with or without food. Maintain regular timing.',
    purpose: 'High blood pressure regulation & heart protection',
    pillColor: 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400',
    status: 'taken',
    lastTakenAt: 'Today at 9:02 AM',
  },
  {
    id: 'med-3',
    name: 'Glimepiride',
    dosage: '1 mg',
    frequency: 'Once daily before lunch',
    timeOfDay: 'afternoon',
    scheduledTime: '01:00 PM',
    instructions: 'Take 15 minutes before lunch. Do not skip the meal after taking.',
    purpose: 'Post-meal glucose management',
    pillColor: 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400',
    status: 'upcoming',
    foodWarning: 'Always eat within 20 mins of taking to prevent hypoglycemia',
  },
  {
    id: 'med-4',
    name: 'Atorvastatin (Lipitor)',
    dosage: '10 mg',
    frequency: 'Once daily at bedtime',
    timeOfDay: 'bedtime',
    scheduledTime: '09:30 PM',
    instructions: 'Take before sleep. Helps cholesterol balance and vascular health.',
    purpose: 'Cholesterol & cardiovascular risk reduction',
    pillColor: 'border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400',
    status: 'upcoming',
    foodWarning: 'Avoid consuming grapefruit or grapefruit juice',
  },
];

export const INITIAL_APPOINTMENTS: DoctorAppointment[] = [
  {
    id: 'apt-1',
    doctorName: 'Dr. Ramesh Patel',
    specialty: 'Cardiologist & Vascular Specialist',
    clinic: 'Apex Heart Care & Diagnostic Center',
    date: '2026-11-20',
    time: '10:30 AM',
    purpose: 'Quarterly Blood Pressure Check & ECG Review',
    prepInstructions: 'Fast for 2 hours before the visit. Bring current medication chart.',
    contactNumber: '+91 80 2345 6789',
  },
  {
    id: 'apt-2',
    doctorName: 'Dr. Sunita Rao',
    specialty: 'Endocrinologist & Diabetes Specialist',
    clinic: 'Apollo Sugar & Endocrine Clinic',
    date: '2026-11-28',
    time: '04:00 PM',
    purpose: 'HbA1c 3-Month Follow-Up & Dosage Adjustment',
    prepInstructions: 'Collect fasting and post-prandial blood reports 2 days prior.',
    contactNumber: '+91 80 4123 9876',
  },
];

export const INITIAL_CAREGIVERS: Caregiver[] = [
  {
    id: 'cg-1',
    name: 'Priya Sharma',
    relationship: 'Daughter (Primary Guardian)',
    email: 'priya.sharma.care@gmail.com',
    phone: '+91 98450 12345',
    notifyOnMissedDose: true,
    notifyOnDoctorVisit: true,
  },
  {
    id: 'cg-2',
    name: 'Rahul Sharma',
    relationship: 'Son (Secondary Emergency Contact)',
    email: 'rahul.sharma.blr@gmail.com',
    phone: '+91 99001 54321',
    notifyOnMissedDose: true,
    notifyOnDoctorVisit: false,
  },
];

export const INITIAL_ADHERENCE_HISTORY: AdherenceDay[] = [
  { day: 'Mon', percentage: 100, totalDoses: 4, takenDoses: 4 },
  { day: 'Tue', percentage: 100, totalDoses: 4, takenDoses: 4 },
  { day: 'Wed', percentage: 75, totalDoses: 4, takenDoses: 3 },
  { day: 'Thu', percentage: 100, totalDoses: 4, takenDoses: 4 },
  { day: 'Fri', percentage: 100, totalDoses: 4, takenDoses: 4 },
  { day: 'Sat', percentage: 100, totalDoses: 4, takenDoses: 4 },
  { day: 'Sun (Today)', percentage: 100, totalDoses: 2, takenDoses: 2 },
];

export const INITIAL_SAFETY_ALERTS: SafetyAlert[] = [
  {
    id: 'alert-1',
    severity: 'WARNING',
    title: 'Food Interaction: Atorvastatin & Grapefruit',
    description: 'Grapefruit and its juice significantly inhibit CYP3A4 enzymes, raising blood concentrations of Atorvastatin and increasing risk of muscle toxicity.',
    medicationsInvolved: ['Atorvastatin 10 mg'],
    actionRecommendation: 'Substitute grapefruit with oranges or sweet lime in daily diet.',
  },
  {
    id: 'alert-2',
    severity: 'INFO',
    title: 'Hydration Advisory with Telmisartan',
    description: 'Ensure adequate fluid intake throughout the day to avoid lightheadedness during posture changes in warm weather.',
    medicationsInvolved: ['Telmisartan 40 mg'],
    actionRecommendation: 'Drink at least 1.5 to 2 Liters of water daily unless restricted by nephrologist.',
  },
];

export const INITIAL_EMAILS: EmailNotification[] = [
  {
    id: 'email-1',
    recipientEmail: 'priya.sharma.care@gmail.com',
    recipientName: 'Priya Sharma (Daughter)',
    type: 'UPCOMING_DOSE',
    subject: 'AegisCare Reminder: Morning Medications Taken for Dadi Kamala',
    body: 'Good morning Priya! Dadi Kamala successfully took her Metformin (500mg) and Telmisartan (40mg) on schedule at 8:35 AM today. Weekly adherence is at a healthy 94%.',
    timestamp: 'Today at 08:36 AM',
    status: 'DELIVERED',
  },
  {
    id: 'email-2',
    recipientEmail: 'priya.sharma.care@gmail.com',
    recipientName: 'Priya Sharma (Daughter)',
    type: 'APPOINTMENT_REMINDER',
    subject: 'Upcoming Doctor Appointment: Dr. Ramesh Patel (Cardiologist) in 5 Days',
    body: 'Reminder for Dr. Ramesh Patel on Friday, Nov 20 at 10:30 AM at Apex Heart Care. Prep instructions: 2-hour fasting. Medication summary sheet has been prepared and ready to print.',
    timestamp: 'Yesterday at 06:00 PM',
    status: 'DELIVERED',
  },
];
