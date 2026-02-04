export type Language = 'en' | 'es';

export enum DocumentType {
  LICENSE = 'LICENSE',
  NATIONAL_ID = 'NATIONAL_ID',
}

export enum VerificationStep {
  INTRO = 'INTRO',
  DOCUMENT_SELECTION = 'DOCUMENT_SELECTION',
  DOCUMENT_CAPTURE = 'DOCUMENT_CAPTURE',
  DOCUMENT_PROCESSING = 'DOCUMENT_PROCESSING',
  DOCUMENT_CONFIRM = 'DOCUMENT_CONFIRM',
  FACE_INSTRUCTION = 'FACE_INSTRUCTION', // Instruction for specific gesture
  FACE_CAPTURE = 'FACE_CAPTURE',
  FINAL_PROCESSING = 'FINAL_PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export interface ExtractedData {
  isValidDocument: boolean;
  error?: string;
  firstName?: string;
  lastName?: string;
  documentNumber?: string;
  birthDate?: string;
  expirationDate?: string;
  address?: string;
  rawText?: string;
}

export interface VerificationResult {
  isVerified: boolean;
  confidence: number;
  reason: string;
}

export interface LivenessGesture {
  id: string;
  label: Record<Language, string>;
  description: Record<Language, string>;
}
