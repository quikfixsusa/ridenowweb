'use client';

import {
  ShieldCheck,
  CreditCard,
  ArrowRight,
  Loader2,
  CheckCircle,
  XCircle,
  ScanFace,
  Globe,
  IdCard,
  ChevronLeft,
  AlertCircle,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';

import Camera from '../components/Camera';
import { StepIndicator } from '../components/StepIndicator';
import { getStoredLicense, StoredDocument, updateUserVerificationStatus } from '../lib/services/firebaseService';
import { extractDocumentData, verifyIdentityAndLiveness } from '../lib/services/geminiService';
import { translations, getDocLabel } from '../lib/utils/i18n';
import { VerificationStep, ExtractedData, VerificationResult, DocumentType, Language, LivenessGesture } from './types';

// Predefined Gestures for Liveness
const GESTURES: LivenessGesture[] = [
  {
    id: 'smile',
    label: { en: 'Smile widely', es: 'Sonríe ampliamente' },
    description: { en: 'Please smile to show you are live.', es: 'Por favor sonríe para demostrar que estás vivo.' },
  },
  {
    id: 'hand_eye',
    label: { en: 'Cover your left eye', es: 'Cubre tu ojo izquierdo' },
    description: { en: 'Use your hand to cover your left eye.', es: 'Usa tu mano para cubrir tu ojo izquierdo.' },
  },
  {
    id: 'open_mouth',
    label: { en: 'Open your mouth', es: 'Abre la boca' },
    description: { en: 'Open your mouth slightly.', es: 'Abre la boca ligeramente.' },
  },
];

const VerificationContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Config State
  const [lang, setLang] = useState<Language>(() => {
    return searchParams.get('lang') === 'es' ? 'es' : 'en';
  });

  const [country, setCountry] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Flow State
  const [step, setStep] = useState<VerificationStep>(VerificationStep.INTRO);
  const [docType, setDocType] = useState<DocumentType>(DocumentType.NATIONAL_ID);

  // Data State
  const [docImage, setDocImage] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [currentGesture, setCurrentGesture] = useState<LivenessGesture | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [storedDoc, setStoredDoc] = useState<StoredDocument | null>(null);

  // UI State
  const [isProcessing, setIsProcessing] = useState(false);
  const [captureError, setCaptureError] = useState<string | null>(null);

  // --- Init ---
  // --- Init ---
  useEffect(() => {
    const countryParam = searchParams.get('country');
    const userIdParam = searchParams.get('userId');

    if (countryParam) setCountry(countryParam.toUpperCase());
    if (userIdParam) setUserId(userIdParam);
  }, [searchParams]);

  const t = translations[lang];

  // --- Handlers ---

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'es' : 'en'));

  const handleStart = () => setStep(VerificationStep.DOCUMENT_SELECTION);

  const selectDocument = (type: DocumentType) => {
    setDocType(type);
    setCaptureError(null);
    setStep(VerificationStep.DOCUMENT_CAPTURE);
  };

  const handleDocumentCapture = async (imageSrc: string) => {
    setDocImage(imageSrc);
    setCaptureError(null);
    setStep(VerificationStep.DOCUMENT_PROCESSING);
    setIsProcessing(true);

    try {
      // 1. Extract Data from Capture
      const data = await extractDocumentData(imageSrc, docType, country);

      // Validation Check
      if (!data.isValidDocument) {
        setIsProcessing(false);
        setCaptureError(data.error || t.doc_invalid_msg);
        setStep(VerificationStep.DOCUMENT_CAPTURE); // Return to camera
        return;
      }

      setExtractedData(data);

      // 2. Fetch Stored Document (if userId exists)
      if (userId) {
        getStoredLicense(userId)
          .then((doc: any) => setStoredDoc(doc))
          .catch((err: any) => console.error('Failed to fetch stored doc', err));
      }

      setStep(VerificationStep.DOCUMENT_CONFIRM);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      setCaptureError(lang === 'es' ? 'Error procesando imagen.' : 'Error processing image.');
      setStep(VerificationStep.DOCUMENT_CAPTURE);
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmDocumentData = () => {
    const randomGesture = GESTURES[Math.floor(Math.random() * GESTURES.length)];
    setCurrentGesture(randomGesture);
    setStep(VerificationStep.FACE_INSTRUCTION);
  };

  const startFaceCapture = () => {
    setStep(VerificationStep.FACE_CAPTURE);
  };

  const handleFaceCapture = async (imageSrc: string) => {
    if (!docImage || !currentGesture) return;

    setStep(VerificationStep.FINAL_PROCESSING);
    setIsProcessing(true);

    try {
      const result = await verifyIdentityAndLiveness(docImage, imageSrc, currentGesture, lang, storedDoc);

      setVerificationResult(result);
      if (result.isVerified) {
        setStep(VerificationStep.SUCCESS);
      } else {
        setStep(VerificationStep.FAILURE);
      }
    } catch (e) {
      setVerificationResult({
        isVerified: false,
        confidence: 0,
        reason: lang === 'es' ? 'Error de red' : 'Network error',
      });
      setStep(VerificationStep.FAILURE);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetryCapture = () => {
    setCaptureError(null);
    setDocImage(null);
    // Already in DOCUMENT_CAPTURE step, just clearing error clears modal
  };

  const handleSuccessContinue = async () => {
    // Success Logic called on button click
    console.log('Verification Successful. Updating UserId:', userId);

    if (userId) {
      try {
        await updateUserVerificationStatus(userId);
        console.log('User status updated in Firestore');
      } catch (updateErr) {
        console.error('Failed to update user status:', updateErr);
      }
    } else {
      console.error('UserId is missing, cannot update status');
    }

    // Navigate immediately using window.location for reliability
    router.push('/face/success');
  };

  // --- Helpers ---

  const getStepNumber = () => {
    switch (step) {
      case VerificationStep.INTRO:
      case VerificationStep.DOCUMENT_SELECTION:
        return 1;
      case VerificationStep.DOCUMENT_CAPTURE:
      case VerificationStep.DOCUMENT_PROCESSING:
      case VerificationStep.DOCUMENT_CONFIRM:
        return 2;
      case VerificationStep.FACE_INSTRUCTION:
      case VerificationStep.FACE_CAPTURE:
      case VerificationStep.FINAL_PROCESSING:
        return 3;
      case VerificationStep.SUCCESS:
      case VerificationStep.FAILURE:
        return 4;
      default:
        return 1;
    }
  };

  // --- Views ---

  // 1. INTRO
  if (step === VerificationStep.INTRO) {
    return (
      <div className="relative flex min-h-screen flex-col bg-white">
        <button
          onClick={toggleLang}
          className="absolute right-6 top-6 z-10 flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
        >
          <Globe className="h-4 w-4" />
          {lang.toUpperCase()}
        </button>

        <div className="flex flex-1 flex-col items-center justify-center space-y-8 p-8 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
            <ShieldCheck className="h-12 w-12 text-blue-600" />
          </div>
          <div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">{t.app_name}</h1>
            <p className="leading-relaxed text-gray-500">{t.app_desc}</p>
          </div>
        </div>
        <div className="border-t border-gray-100 p-6">
          <button
            onClick={handleStart}
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-700"
          >
            {t.start} <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  // 2. DOC SELECTION
  if (step === VerificationStep.DOCUMENT_SELECTION) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <div className="sticky top-0 border-b border-gray-100 bg-white p-6">
          <button onClick={() => setStep(VerificationStep.INTRO)} className="mb-4">
            <ChevronLeft className="h-6 w-6 text-gray-400" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{t.select_doc_type}</h2>
        </div>
        <div className="space-y-4 p-6">
          <button
            onClick={() => selectDocument(DocumentType.NATIONAL_ID)}
            className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-transform active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <IdCard className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold text-gray-800">
              {getDocLabel(DocumentType.NATIONAL_ID, country, lang)}
            </span>
          </button>

          <button
            onClick={() => selectDocument(DocumentType.LICENSE)}
            className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-transform active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
              <CreditCard className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold text-gray-800">
              {getDocLabel(DocumentType.LICENSE, country, lang)}
            </span>
          </button>
        </div>
      </div>
    );
  }

  // MAIN FLOW
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <StepIndicator currentStep={getStepNumber()} />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Step: Document Capture */}
        {step === VerificationStep.DOCUMENT_CAPTURE && (
          <>
            <Camera onCapture={handleDocumentCapture} maskType="card" instruction={t.scan_instruction} />
            {/* Error Overlay */}
            {captureError && (
              <div className="animate-in fade-in absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm duration-200">
                <div className="animate-in zoom-in-95 max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl duration-200">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{t.doc_invalid_title}</h3>
                  <p className="mb-6 text-gray-600">{captureError}</p>
                  <button
                    onClick={handleRetryCapture}
                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-700"
                  >
                    {t.retry}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Step: Processing Generic */}
        {isProcessing && (
          <div className="flex flex-1 flex-col items-center justify-center bg-white p-8">
            <Loader2 className="mb-6 h-16 w-16 animate-spin text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {step === VerificationStep.DOCUMENT_PROCESSING ? t.processing_doc : t.processing_final}
            </h2>
            <p className="mt-2 max-w-xs text-center text-gray-500">Gemini AI</p>
          </div>
        )}

        {/* Step: Confirm Document Data */}
        {step === VerificationStep.DOCUMENT_CONFIRM && extractedData && (
          <div className="flex flex-1 flex-col overflow-y-auto bg-white">
            <div className="p-6">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t.confirm_details}</h2>

              <div className="mb-6 flex justify-center">
                <img
                  src={docImage!}
                  alt="Document Capture"
                  className="h-40 rounded-lg border border-gray-200 object-cover shadow-md"
                />
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">{t.full_name}</label>
                  <p className="text-lg font-medium text-gray-900">
                    {extractedData.firstName} {extractedData.lastName}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">{t.id_number}</label>
                  <p className="text-lg font-medium text-gray-900">{extractedData.documentNumber || 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {t.birth_date}
                    </label>
                    <p className="text-lg font-medium text-gray-900">{extractedData.birthDate || 'N/A'}</p>
                  </div>
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">{t.expires}</label>
                    <p className="text-lg font-medium text-gray-900">{extractedData.expirationDate || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 mt-auto border-t border-gray-100 bg-white p-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(VerificationStep.DOCUMENT_CAPTURE)}
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium text-gray-700"
                >
                  {t.retake}
                </button>
                <button
                  onClick={confirmDocumentData}
                  className="flex-[2] rounded-xl bg-blue-600 px-4 py-3 font-medium text-white shadow-lg shadow-blue-500/30"
                >
                  {t.confirm_next}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Face Instruction (Liveness) */}
        {step === VerificationStep.FACE_INSTRUCTION && currentGesture && (
          <div className="flex flex-1 flex-col items-center justify-center space-y-8 bg-white p-8 text-center">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-blue-100 bg-blue-50">
              <ScanFace className="h-16 w-16 text-blue-600" />
            </div>

            <div className="mx-auto max-w-xs">
              <h2 className="mb-3 text-2xl font-bold text-gray-900">{t.liveness_title}</h2>
              <p className="mb-6 text-gray-500">{t.liveness_desc}</p>

              <div className="animate-pulse rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <p className="text-xl font-bold text-blue-800">&quot;{currentGesture.label[lang]}&quot;</p>
              </div>
            </div>

            <div className="w-full pt-4">
              <button
                onClick={startFaceCapture}
                className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white shadow-lg shadow-blue-500/30"
              >
                {t.i_am_ready}
              </button>
            </div>
          </div>
        )}

        {/* Step: Face Capture (Single Gesture) */}
        {step === VerificationStep.FACE_CAPTURE && currentGesture && (
          <Camera
            onCapture={handleFaceCapture}
            maskType="circle"
            facingMode="user"
            instruction={currentGesture.label[lang]}
          />
        )}

        {/* Step: Success */}
        {step === VerificationStep.SUCCESS && (
          <div className="animate-in fade-in zoom-in flex flex-1 flex-col items-center justify-center space-y-8 bg-white p-8 text-center duration-500">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-green-50">
              <CheckCircle className="h-14 w-14 text-green-500" />
            </div>
            <div>
              <h2 className="mb-3 text-3xl font-bold text-gray-900">{t.verified_title}</h2>
              <p className="mx-auto mb-6 max-w-xs text-gray-500">{t.verified_desc}</p>
              {verificationResult && (
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-left">
                  <p className="mb-1 text-xs font-semibold uppercase text-gray-500">{t.ai_reason}</p>
                  <p className="text-sm text-gray-800">{verificationResult.reason}</p>
                </div>
              )}
            </div>
            <button
              onClick={handleSuccessContinue}
              className="w-full max-w-xs rounded-xl bg-gray-900 py-4 font-semibold text-white shadow-lg"
            >
              {t.continue}
            </button>
          </div>
        )}

        {/* Step: Failure */}
        {step === VerificationStep.FAILURE && (
          <div className="flex flex-1 flex-col items-center justify-center space-y-8 bg-white p-8 text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-50">
              <XCircle className="h-14 w-14 text-red-500" />
            </div>
            <div>
              <h2 className="mb-3 text-3xl font-bold text-gray-900">{t.failed_title}</h2>
              <p className="mx-auto mb-6 max-w-xs text-gray-500">{t.failed_desc}</p>
              {verificationResult && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-left">
                  <p className="mb-1 text-xs font-semibold uppercase text-red-500">{t.ai_reason}</p>
                  <p className="text-sm text-red-800">{verificationResult.reason}</p>
                </div>
              )}
            </div>
            <div className="flex w-full max-w-xs gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-900 hover:bg-gray-50"
              >
                {t.retry}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-gray-50">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
      }
    >
      <VerificationContent />
    </Suspense>
  );
};

export default App;
