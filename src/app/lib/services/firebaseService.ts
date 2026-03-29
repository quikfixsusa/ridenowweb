import { doc, updateDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

import { storage, db, functions } from '../firebase';

export interface StoredDocument {
  data: string; // base64
  mimeType: string;
}

/**
 * Fetches a driver's license from Firebase Storage for a given user.
 * Looks in /requirements/{userId}/ for files containing "Driver's License" or "Licencia de Conducir".
 */
export const getStoredLicense = async (userId: string): Promise<StoredDocument | null> => {
  if (!userId) return null;

  const folderPath = `requirements/${userId}/`;
  const folderRef = ref(storage, folderPath);

  try {
    const res = await listAll(folderRef);

    // Find matching file
    const matchingItem = res.items.find((item) => {
      const name = item.name.toLowerCase();
      return (
        name.includes('driver_licence') ||
        name.includes("driver's license") ||
        name.includes("driver's licence") ||
        name.includes('licencia de conducir') ||
        name.includes('licencia')
      ); // Fallback
    });

    if (!matchingItem) {
      console.warn(`No matching license file found in ${folderPath}`);
      return null;
    }

    // Get URL and Download
    const url = await getDownloadURL(matchingItem);
    const response = await fetch(url);
    const blob = await response.blob();

    // Convert to Base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Keep the data prefix (e.g., data:application/pdf;base64,) for the caller to inspect,
        // but typically we strip it for Gemini.
        const cleanData = base64String.split(',')[1];
        resolve({
          data: cleanData,
          mimeType: blob.type,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching stored license:', error);
    return null;
  }
};

/**
 * Updates the user's document in Firestore to set verify_identity_required to false.
 */
export const updateUserVerificationStatus = async (userId: string): Promise<boolean> => {
  if (!userId) return false;

  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      verify_identity_required: false,
    });
    return true;
  } catch (error) {
    console.error('Error updating user verification status:', error);
    return false;
  }
};

/**
 * Calls the verifyFaceVerificationToken Cloud Function to validate a token.
 */
export const verifyFaceVerificationToken = async (token: string): Promise<boolean> => {
  if (!token) return false;

  try {
    const verifyFunction = httpsCallable(functions, 'verifyFaceVerificationToken');
    const result = await verifyFunction({ token });
    const responseData = result.data as { success: boolean };
    return responseData.success;
  } catch (error) {
    console.error('Error calling verifyFaceVerificationToken:', error);
    return false;
  }
};
