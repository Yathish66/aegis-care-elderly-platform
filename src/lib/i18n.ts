export type SupportedLanguage = 'en' | 'hi' | 'kn' | 'ta' | 'es';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  flag: string;
  speechLocale: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧', speechLocale: 'en-US' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechLocale: 'hi-IN' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', speechLocale: 'kn-IN' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', speechLocale: 'ta-IN' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speechLocale: 'es-ES' },
];

export interface TranslationDictionary {
  navbar: {
    seniorView: string;
    familyPortal: string;
    profileSetup: string;
    a11yHub: string;
    securityData: string;
    judgeWalkthrough: string;
    sosHelp: string;
    langSelect: string;
  };
  senior: {
    dailyCareAssistant: string;
    greeting: string;
    heroSubtitle: string;
    readAloud: string;
    readingAloud: string;
    todaysProgress: string;
    allMeds: string;
    morning: string;
    afternoon: string;
    evening: string;
    bedtime: string;
    takeMedicine: string;
    takenAt: string;
    remind15m: string;
    instructions: string;
    purpose: string;
    foodAdvisory: string;
    remainingStock: string;
    pillsLeft: string;
    voiceCompanionTitle: string;
    voiceCompanionDesc: string;
    pillIdTitle: string;
    pillIdDesc: string;
    emergencyIdTitle: string;
    emergencyIdDesc: string;
    allDoneHeading: string;
    allDoneMessage: string;
  };
  family: {
    caregiverPortalTitle: string;
    caregiverSubtitle: string;
    personalizeProfile: string;
    pharmacyHub: string;
    auditTrail: string;
    scanPrescription: string;
    doctorVisitSummary: string;
    analyticsTab: string;
    scheduleTab: string;
    vitalsTab: string;
    pharmacyTab: string;
    appointmentsTab: string;
    escalationTab: string;
    adherenceOverview: string;
    weeklyScore: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    navbar: {
      seniorView: 'Senior View',
      familyPortal: 'Family & Caregiver',
      profileSetup: 'Profile Setup',
      a11yHub: 'A11y Hub',
      securityData: 'Security & Data',
      judgeWalkthrough: 'Judge Walkthrough',
      sosHelp: 'SOS Help',
      langSelect: 'Language',
    },
    senior: {
      dailyCareAssistant: "Daily Care Assistant",
      greeting: 'Good Day',
      heroSubtitle: 'Here are your medicines for today. Stay healthy and smiling.',
      readAloud: 'Read Aloud My Medicines',
      readingAloud: 'Reading Aloud...',
      todaysProgress: "Today's Progress",
      allMeds: 'All Medicines',
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
      bedtime: 'Bedtime',
      takeMedicine: '✓ I TOOK THIS',
      takenAt: 'Dose Taken at',
      remind15m: 'Remind in 15m',
      instructions: 'Instructions',
      purpose: 'Purpose',
      foodAdvisory: 'Food Advisory',
      remainingStock: 'Remaining Supply',
      pillsLeft: 'pills remaining',
      voiceCompanionTitle: 'Talk to Aegis Voice Companion',
      voiceCompanionDesc: 'Ask questions by voice: "Did I take my morning pill?"',
      pillIdTitle: 'Verify Loose Pill with Camera',
      pillIdDesc: 'Identify unlabelled tablets before taking them',
      emergencyIdTitle: 'Paramedic Emergency Medical ID',
      emergencyIdDesc: 'Instant blood group, allergies, and attending doctor details',
      allDoneHeading: 'All medications completed for today! 🌟',
      allDoneMessage: 'Wonderful discipline! Keep up your healthy daily routine.',
    },
    family: {
      caregiverPortalTitle: 'Caregiver Portal for',
      caregiverSubtitle: 'Real-time adherence monitoring, biometrics telemetry, remote pharmacy refills, and proactive escalation.',
      personalizeProfile: 'Personalize Profile',
      pharmacyHub: 'Pharmacy Hub',
      auditTrail: 'Audit Trail',
      scanPrescription: 'Scan Prescription (Gemini OCR)',
      doctorVisitSummary: 'Doctor Visit Summary',
      analyticsTab: 'Adherence & Analytics',
      scheduleTab: 'Medication Schedule',
      vitalsTab: 'Vitals & Correlation',
      pharmacyTab: 'Pharmacy & Refills',
      appointmentsTab: 'Doctor Appointments',
      escalationTab: 'Proactive Escalations',
      adherenceOverview: '7-Day Adherence Overview',
      weeklyScore: 'Weekly Adherence Score',
    },
  },

  hi: {
    navbar: {
      seniorView: 'वरिष्ठ दृश्य',
      familyPortal: 'परिवार व देखभालकर्ता',
      profileSetup: 'प्रोफ़ाइल सेटअप',
      a11yHub: 'सुलभता केंद्र',
      securityData: 'सुरक्षा व डेटा',
      judgeWalkthrough: 'जज वॉकथ्रू',
      sosHelp: 'आपातकालीन मदद',
      langSelect: 'भाषा',
    },
    senior: {
      dailyCareAssistant: 'दैनिक देखभाल सहायक',
      greeting: 'नमस्ते',
      heroSubtitle: 'यहाँ आपकी आज की दवाइयाँ हैं। स्वस्थ रहें और मुस्कुराते रहें।',
      readAloud: 'मेरी दवाइयाँ बोलकर सुनाएँ',
      readingAloud: 'सुनाया जा रहा है...',
      todaysProgress: 'आज की प्रगति',
      allMeds: 'सभी दवाइयाँ',
      morning: 'सुबह (Morning)',
      afternoon: 'दोपहर (Afternoon)',
      evening: 'शाम (Evening)',
      bedtime: 'रात को (Bedtime)',
      takeMedicine: '✓ मैंने ले ली (I TOOK THIS)',
      takenAt: 'दवा लेने का समय:',
      remind15m: '15 मिनट बाद याद दिलाएँ',
      instructions: 'सेवन निर्देश',
      purpose: 'उपचार उद्देश्य',
      foodAdvisory: 'आहार परामर्श',
      remainingStock: 'उपलब्ध स्टॉक',
      pillsLeft: 'गोलियाँ बची हैं',
      voiceCompanionTitle: 'एजिस वॉयस साथी से बात करें',
      voiceCompanionDesc: 'बोलकर पूछें: "क्या मैंने सुबह की गोली ले ली?"',
      pillIdTitle: 'कैमरे से गोली पहचानें (AI Vision)',
      pillIdDesc: 'लेने से पहले किसी भी अनजान गोली की जाँच करें',
      emergencyIdTitle: 'पैरामेडिक इमरजेंसी मेडिकल आईडी',
      emergencyIdDesc: 'ब्लड ग्रुप, एलर्जी और मुख्य डॉक्टर की तुरंत जानकारी',
      allDoneHeading: 'आज की सभी दवाइयाँ पूरी हो चुकी हैं! 🌟',
      allDoneMessage: 'बहुत बढ़िया! अपने स्वास्थ्य का इसी प्रकार ध्यान रखें।',
    },
    family: {
      caregiverPortalTitle: 'केयरगिवर पोर्टल:',
      caregiverSubtitle: 'दवा पालन निगरानी, वाइटल्स विश्लेषण, फ़ार्मेसी रीफ़िल और अलर्ट्स।',
      personalizeProfile: 'प्रोफ़ाइल बदलें',
      pharmacyHub: 'फ़ार्मेसी हब',
      auditTrail: 'ऑडिट ट्रेल',
      scanPrescription: 'पर्चा स्कैन करें (Gemini OCR)',
      doctorVisitSummary: 'डॉक्टर रिपोर्ट सारांश',
      analyticsTab: 'दवा अनुपालन रिपोर्ट',
      scheduleTab: 'दवा समय सारणी',
      vitalsTab: 'वाइटल्स व स्वास्थ्य स्थिति',
      pharmacyTab: 'दवा इन्वेंटरी व रीफ़िल',
      appointmentsTab: 'डॉक्टर अपॉइंटमेंट्स',
      escalationTab: 'ईमेल अलर्ट्स',
      adherenceOverview: '7-दिवसीय दवा अनुपालन',
      weeklyScore: 'साप्ताहिक अनुपालन दर',
    },
  },

  kn: {
    navbar: {
      seniorView: 'ಹಿರಿಯರ ವೀಕ್ಷಣೆ',
      familyPortal: 'ಕುಟುಂಬ & ಆರೈಕೆದಾರ',
      profileSetup: 'ಪ್ರೊಫೈಲ್ ಸೆಟಪ್',
      a11yHub: 'ಪ್ರವೇಶಿಸುವಿಕೆ',
      securityData: 'ಭದ್ರತೆ & ಡೇಟಾ',
      judgeWalkthrough: 'ನ್ಯಾಯಾಧೀಶರ ಮಾರ್ಗದರ್ಶಿ',
      sosHelp: 'ತುರ್ತು ಸಹಾಯ',
      langSelect: 'ಭಾಷೆ',
    },
    senior: {
      dailyCareAssistant: 'ದೈನಂದಿನ ಆರೈಕೆ ಸಹಾಯಕ',
      greeting: 'ನಮಸ್ಕಾರ',
      heroSubtitle: 'ಇಲ್ಲಿ ಇಂದಿನ ನಿಮ್ಮ ಔಷಧಿಗಳಿವೆ. ಸದಾ ಆರೋಗ್ಯವಾಗಿ ಮತ್ತು ಸಂತೋಷವಾಗಿರಿ.',
      readAloud: 'ನನ್ನ ಔಷಧಿಗಳನ್ನು ಓದಿ ಕೇಳಿಸಿ',
      readingAloud: 'ಓದಲಾಗುತ್ತಿದೆ...',
      todaysProgress: 'ಇಂದಿನ ಪ್ರಗತಿ',
      allMeds: 'ಎಲ್ಲಾ ಔಷಧಿಗಳು',
      morning: 'ಬೆಳಿಗ್ಗೆ (Morning)',
      afternoon: 'ಮಧ್ಯಾಹ್ನ (Afternoon)',
      evening: 'ಸಂಜೆ (Evening)',
      bedtime: 'ಮಲಗುವ ಮುನ್ನ (Bedtime)',
      takeMedicine: '✓ ನಾನು ತೆಗೆದುಕೊಂಡೆ',
      takenAt: 'ತೆಗೆದುಕೊಂಡ ಸಮಯ:',
      remind15m: '15 ನಿಮಿಷಗಳಲ್ಲಿ ನೆನಪಿಸಿ',
      instructions: 'ಸೇವನೆಯ ಸೂಚನೆಗಳು',
      purpose: 'ಆರೋಗ್ಯ ಪ್ರಯೋಜನ',
      foodAdvisory: 'ಆಹಾರ ಸಲಹೆ',
      remainingStock: 'ಉಳಿದ ಮಾತ್ರೆಗಳು',
      pillsLeft: 'ಮಾತ್ರೆಗಳು ಉಳಿದಿವೆ',
      voiceCompanionTitle: 'ಏಜಿಸ್ ಧ್ವನಿ ಸಹಾಯಕರೊಂದಿಗೆ ಮಾತನಾಡಿ',
      voiceCompanionDesc: 'ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ: "ನಾನು ಬೆಳಗಿನ ಮಾತ್ರೆ ತೆಗೆದುಕೊಂಡೆನಾ?"',
      pillIdTitle: 'ಕ್ಯಾಮೆರಾದೊಂದಿಗೆ ಮಾತ್ರೆ ಗುರುತಿಸಿ',
      pillIdDesc: 'ಅಪರಿಚಿತ ಮಾತ್ರೆಗಳನ್ನು ಸೇವಿಸುವ ಮುನ್ನ ಪರಿಶೀಲಿಸಿ',
      emergencyIdTitle: 'ತುರ್ತು ವೈದ್ಯಕೀಯ ಗುರುತು ಪತ್ರ (Medical ID)',
      emergencyIdDesc: 'ರಕ್ತದ ಗುಂಪು, ಅಲರ್ಜಿಗಳು ಮತ್ತು ವೈದ್ಯರ ಮಾಹಿತಿ',
      allDoneHeading: 'ಇಂದಿನ ಎಲ್ಲಾ ಔಷಧಿಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ! 🌟',
      allDoneMessage: 'ಅದ್ಭುತ ಶಿಸ್ತು! ನಿಮ್ಮ ದಿನಚರಿಯನ್ನು ಹೀಗೆಯೇ ಮುಂದುವರಿಸಿ.',
    },
    family: {
      caregiverPortalTitle: 'ಆರೈಕೆದಾರ ಪೋರ್ಟಲ್:',
      caregiverSubtitle: 'ಔಷಧ ಸೇವನೆ ಮೇಲ್ವಿಚಾರಣೆ, ರಕ್ತದೊತ್ತಡ ಮಾಹಿತಿ, ಫಾರ್ಮಸಿ ರೀಫಿಲ್ ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು.',
      personalizeProfile: 'ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಿ',
      pharmacyHub: 'ಫಾರ್ಮಸಿ ಹಬ್',
      auditTrail: 'ಆಡಿಟ್ ಇತಿಹಾಸ',
      scanPrescription: 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸ್ಕ್ಯಾನ್ (Gemini OCR)',
      doctorVisitSummary: 'ವೈದ್ಯರ ಸಾರಾಂಶ',
      analyticsTab: 'ಅನುಸರಣೆ ವಿಶ್ಲೇಷಣೆ',
      scheduleTab: 'ಔಷಧಿ ವೇಳಾಪಟ್ಟಿ',
      vitalsTab: 'ಆರೋಗ್ಯ ತಪಾಸಣೆ',
      pharmacyTab: 'ಮಾತ್ರೆಗಳ ದಾಸ್ತಾನು',
      appointmentsTab: 'ವೈದ್ಯರ ಭೇಟಿಗಳು',
      escalationTab: 'ತುರ್ತು ಇಮೇಲ್ ಎಚ್ಚರಿಕೆಗಳು',
      adherenceOverview: '7 ದಿನಗಳ ಔಷಧ ಸೇವನೆ ಅವಲೋಕನ',
      weeklyScore: 'ವಾರದ ಒಟ್ಟು ಅಂಕ',
    },
  },

  ta: {
    navbar: {
      seniorView: 'மூத்தோர் பார்வை',
      familyPortal: 'குடும்பம் & பராமரிப்பாளர்',
      profileSetup: 'சுயவிவர அமைப்பு',
      a11yHub: 'அணுகல்தன்மை',
      securityData: 'பாதுகாப்பு & தரவு',
      judgeWalkthrough: 'நீதிபதி சுற்றுலா',
      sosHelp: 'அவசர உதவி',
      langSelect: 'மொழி',
    },
    senior: {
      dailyCareAssistant: 'தினசரி பராமரிப்பு உதவியாளர்',
      greeting: 'வணக்கம்',
      heroSubtitle: 'இதோ உங்களுக்கான இன்றைய மருந்துகள். நலமுடன் இருங்கள்.',
      readAloud: 'என் மருந்துகளை வாசித்து காட்டு',
      readingAloud: 'வாசிக்கப்படுகிறது...',
      todaysProgress: 'இன்றைய முன்னேற்றம்',
      allMeds: 'அனைத்து மருந்துகள்',
      morning: 'காலை (Morning)',
      afternoon: 'மதியம் (Afternoon)',
      evening: 'மாலை (Evening)',
      bedtime: 'இரவு (Bedtime)',
      takeMedicine: '✓ நான் எடுத்துக்கொண்டேன்',
      takenAt: 'எடுத்துக்கொண்ட நேரம்:',
      remind15m: '15 நிமிடத்தில் நினைவூட்டு',
      instructions: 'மருந்து உட்கொள்ளும் முறை',
      purpose: 'பயன்',
      foodAdvisory: 'உணவு எச்சரிக்கை',
      remainingStock: 'மீதமுள்ள மருந்துகள்',
      pillsLeft: 'மாத்திரைகள் உள்ளன',
      voiceCompanionTitle: 'ஏஜிஸ் குரல் உதவியாளரிடம் பேசுங்கள்',
      voiceCompanionDesc: 'கேளுங்கள்: "நான் காலை மருந்தை எடுத்துக்கொண்டேனா?"',
      pillIdTitle: 'கேமரா மூலம் மாத்திரையை அடையாளம் காண்க',
      pillIdDesc: 'பெயர் தெரியாத மாத்திரைகளை உறுதிசெய்யுங்கள்',
      emergencyIdTitle: 'அவசர மருத்துவ அடையாள அட்டை',
      emergencyIdDesc: 'இரத்த வகை, ஒவ்வாமை மற்றும் மருத்துவர் விபரங்கள்',
      allDoneHeading: 'இன்றைய அனைத்து மருந்துகளும் முடிக்கப்பட்டன! 🌟',
      allDoneMessage: 'மிகச் சிறந்த பராமரிப்பு! தினசரி மருந்து பழக்கத்தை தொடருங்கள்.',
    },
    family: {
      caregiverPortalTitle: 'பராமரிப்பாளர் தளம்:',
      caregiverSubtitle: 'மருந்து கண்காணிப்பு, இரத்த அழுத்த பதிவு, பார்மசி மறுஆர்டர் மற்றும் விழிப்பூட்டல்கள்.',
      personalizeProfile: 'சுயவிவரம் மாற்று',
      pharmacyHub: 'பார்மசி மையம்',
      auditTrail: 'ஆடிட் பதிவு',
      scanPrescription: 'மருந்து சீட்டு ஸ்கேன் (Gemini OCR)',
      doctorVisitSummary: 'மருத்துவர் அறிக்கை',
      analyticsTab: 'மருந்து உட்கொள்ளல் அளவீடு',
      scheduleTab: 'மருந்து அட்டவணை',
      vitalsTab: 'உடல்நல அளவீடுகள்',
      pharmacyTab: 'மருந்து இருப்பு & ரீஃபில்',
      appointmentsTab: 'மருத்துவர் சந்திப்புகள்',
      escalationTab: 'மின்னஞ்சல் எச்சரிக்கைகள்',
      adherenceOverview: '7 நாள் மருந்து கண்காணிப்பு',
      weeklyScore: 'வாராந்திர சராசரி',
    },
  },

  es: {
    navbar: {
      seniorView: 'Vista Mayor',
      familyPortal: 'Familia y Cuidador',
      profileSetup: 'Configurar Perfil',
      a11yHub: 'Accesibilidad',
      securityData: 'Seguridad y Datos',
      judgeWalkthrough: 'Guía del Jurado',
      sosHelp: 'Ayuda SOS',
      langSelect: 'Idioma',
    },
    senior: {
      dailyCareAssistant: 'Asistente Diario de Cuidado',
      greeting: 'Buen Día',
      heroSubtitle: 'Aquí están sus medicamentos para hoy. Manténgase saludable y sonriente.',
      readAloud: 'Leer Mis Medicamentos en Voz Alta',
      readingAloud: 'Leyendo en voz alta...',
      todaysProgress: 'Progreso de Hoy',
      allMeds: 'Todos los Medicamentos',
      morning: 'Mañana (Morning)',
      afternoon: 'Tarde (Afternoon)',
      evening: 'Noche (Evening)',
      bedtime: 'Antes de Dormir (Bedtime)',
      takeMedicine: '✓ YA LA TOMÉ',
      takenAt: 'Tomada a las:',
      remind15m: 'Recordar en 15m',
      instructions: 'Instrucciones',
      purpose: 'Propósito',
      foodAdvisory: 'Aviso de Alimentos',
      remainingStock: 'Suministro Restante',
      pillsLeft: 'pastillas restantes',
      voiceCompanionTitle: 'Hablar con el Asistente de Voz',
      voiceCompanionDesc: 'Pregunte por voz: "¿Tomé mi medicamento de la mañana?"',
      pillIdTitle: 'Identificar Pastilla con Cámara',
      pillIdDesc: 'Verifique pastillas sueltas antes de tomarlas',
      emergencyIdTitle: 'Identificación Médica de Emergencia',
      emergencyIdDesc: 'Grupo sanguíneo, alergias y médico de cabecera',
      allDoneHeading: '¡Todos los medicamentos de hoy completados! 🌟',
      allDoneMessage: '¡Excelente disciplina! Mantenga su rutina saludable.',
    },
    family: {
      caregiverPortalTitle: 'Portal del Cuidador para',
      caregiverSubtitle: 'Monitoreo de adherencia en tiempo real, telemetría biométrica, reabastecimiento en farmacia y alertas proactivas.',
      personalizeProfile: 'Personalizar Perfil',
      pharmacyHub: 'Farmacia',
      auditTrail: 'Registro de Auditoría',
      scanPrescription: 'Escanear Receta (Gemini OCR)',
      doctorVisitSummary: 'Resumen para el Médico',
      analyticsTab: 'Adherencia y Métricas',
      scheduleTab: 'Horario de Medicación',
      vitalsTab: 'Signos Vitales y Correlación',
      pharmacyTab: 'Farmacia e Inventario',
      appointmentsTab: 'Citas Médicas',
      escalationTab: 'Alertas Proactivas',
      adherenceOverview: 'Resumen de 7 Días',
      weeklyScore: 'Puntuación Semanal',
    },
  },
};
