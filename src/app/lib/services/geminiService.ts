'use server';

import { GoogleGenAI, Type } from '@google/genai';

import { ExtractedData, VerificationResult, DocumentType, LivenessGesture, Language } from '../../face/types';
import type { StoredDocument } from './firebaseService';

// Helper to clean base64 string
const cleanBase64 = (b64: string) => b64.replace(/^data:[a-zA-Z0-9-+\/]+;base64,/, '');

// Safe accessor for process.env that prevents ReferenceError
const getApiKey = () => {
  return process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GENAI_API_KEY || process.env.API_KEY;
};

export const extractDocumentData = async (
  imageBase64: string,
  docType: DocumentType,
  country: string | null,
): Promise<ExtractedData> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('API Key missing. Checked: GEMINI_API_KEY, NEXT_PUBLIC_GENAI_API_KEY, API_KEY');
    throw new Error('API Key not found in environment variables.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const docContext =
    docType === DocumentType.LICENSE
      ? "Driver's License"
      : country === 'VE'
        ? 'Venezuelan Cédula de Identidad'
        : 'National ID Card';

  const prompt = `
    STRICT MODE: ENABLED.
    Analyze this image. The user is supposed to be taking a photo of a: ${docContext}.

    CRITICAL VALIDATION STEPS:
    0. **Date Check**: TODAY'S DATE is ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}. Verify expiration dates against this. A document issued in 2025 IS VALID and NOT in the future relative to 2026.
    1. **Presence**: Is there a physical identity card/document clearly visible in the frame?
    2. **Clarity**: Is the text on the document readable? (If blurry -> isValidDocument: false).
    3. **Content**: Does the document actually look like a ${docContext}?
    4. **Quality**: Is the image dark, cut off, or just a random object/selfie? (If yes -> isValidDocument: false).

    INSTRUCTIONS:
    - If the image DOES NOT contain a clear, valid ${docContext}, set 'isValidDocument' to false.
    - Provide a short, user-friendly 'error' message explaining why (e.g., "Image too blurry", "Document not found", "Too dark").
    - ONLY if 'isValidDocument' is true, extract the text fields.

    Return a JSON object:
    - isValidDocument: boolean
    - error: string (Required if isValidDocument is false).
    - firstName
    - lastName
    - documentNumber (ID number)
    - birthDate (YYYY-MM-DD format if possible)
    - expirationDate (YYYY-MM-DD format if possible)
    - address
    
    If valid but specific fields are unreadable, return null for those fields.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{ inlineData: { mimeType: 'image/jpeg', data: cleanBase64(imageBase64) } }, { text: prompt }],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValidDocument: { type: Type.BOOLEAN },
            error: { type: Type.STRING, nullable: true },
            firstName: { type: Type.STRING, nullable: true },
            lastName: { type: Type.STRING, nullable: true },
            documentNumber: { type: Type.STRING, nullable: true },
            birthDate: { type: Type.STRING, nullable: true },
            expirationDate: { type: Type.STRING, nullable: true },
            address: { type: Type.STRING, nullable: true },
          },
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error('No response from Gemini');

    return JSON.parse(text) as ExtractedData;
  } catch (error) {
    console.error('Document extraction error:', error);
    throw error;
  }
};

export const verifyIdentityAndLiveness = async (
  docImage: string,
  selfieImage: string,
  gesture: LivenessGesture,
  lang: Language,
  storedDoc: StoredDocument | null,
): Promise<VerificationResult> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('API Key missing. Checked: GEMINI_API_KEY, NEXT_PUBLIC_GENAI_API_KEY, API_KEY');
    throw new Error('API Key not found in environment variables.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const parts = [
    { inlineData: { mimeType: 'image/jpeg', data: cleanBase64(docImage) } }, // Image 1: Captured Doc
    { inlineData: { mimeType: 'image/jpeg', data: cleanBase64(selfieImage) } }, // Image 2: Selfie
  ];

  let prompt = `
    I am providing images for identity verification.
    Image 1: A photo of an ID document freshly captured by the user.
    Image 2: A selfie of the user performing a specific gesture.
  `;

  if (storedDoc) {
    parts.push({ inlineData: { mimeType: storedDoc.mimeType, data: cleanBase64(storedDoc.data) } }); // Image 3: Stored Doc
    prompt += `
    Image 3: The official ID document/file retrieved from our database records (it might be a PDF or Image).
    `;
  }

  prompt += `
    The required gesture for the selfie (Image 2) was: "${gesture.label['en']} / ${gesture.label['es']}".

    Please perform the following CHECKS:
    1. LIVENESS & GESTURE: Is the person in the selfie (Image 2) a real live person and performing the requested gesture (${gesture.label['en']})?
    2. FACE MATCH (Selfie vs Capture): Does the face in the Captured ID (Image 1) match the person in the Selfie (Image 2)?
  `;

  if (storedDoc) {
    prompt += `
    3. RECORD MATCH (Capture vs Record): Compare the "Captured ID" (Image 1) with the "Record Document" (Image 3).
       - **MANDATORY**: You MUST extract the ID Number and Name from BOTH documents.
       - **COMPARISON**: Compare the characters. If the ID Numbers do not match (e.g. 12345 vs 12346), return isVerified: false.
       - **FACES**: If the person in Image 1 is clearly different from Image 3 (e.g. different gender, ethnicity, or age gap > 20 years), return isVerified: false.
       - **DECISION**: If you are unsure, default to isVerified: false. Better to reject than to accept a fraud.
    `;
  }

  prompt += `
    Return a JSON object:
    - isVerified: true ONLY if ALL checks pass.
    - confidence: number (0-100).
    - reason: A concise explanation in ${lang === 'es' ? 'Spanish' : 'English'} summarizing the result of the Liveness check, Face Match, and Record Match (if applicable).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [...parts, { text: prompt }],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isVerified: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER },
            reason: { type: Type.STRING },
          },
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error('No response from Gemini');

    return JSON.parse(text) as VerificationResult;
  } catch (error) {
    console.error('Verification error:', error);
    return {
      isVerified: false,
      confidence: 0,
      reason: lang === 'es' ? 'Error de conexión con IA.' : 'AI Connection Error.',
    };
  }
};
