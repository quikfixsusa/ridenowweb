import { db } from '@/app/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import * as pdfjsLib from 'pdfjs-dist';
import Swal from 'sweetalert2';

interface Props {
  status: 'reception' | 'inReview' | 'edit' | 'approved';
  id: string;
  title: string;
}

export default function Buttons({ status, id, title }: Props) {
  // Configurar el worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

  const verifyRequirement = async () => {
    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    const user = userDoc.data();

    const requirement = user.requirements.findIndex((req: any) => req.title === title);
    user.requirements[requirement] = {
      ...user.requirements[requirement],
      status: 'approved',
    };
    const driverLicensePdf = user.requirements[0].link;

    const isInReview = user.requirements.some((req: any) => req.status !== 'approved');

    // Convert PDF to image and upload to Firebase Storage
    const imageUrl = await convertPdfToImageAndUpload(driverLicensePdf);

    user.requirements[0].image = imageUrl;

    await updateDoc(userRef, { requirements: user.requirements, requirementsInReview: isInReview });
  };

  const convertPdfToImageAndUpload = async (pdfUrl: string) => {
    const response = await fetch(pdfUrl);
    const arrayBuffer = await response.arrayBuffer();
    console.log(arrayBuffer);
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    console.log(pdf.getData());
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Failed to get canvas context');
    }

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport: viewport }).promise;
    const dataUrl = canvas.toDataURL('image/jpeg');

    // Upload image to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `requirements/${id}/Driver License.jpg`);
    await uploadString(storageRef, dataUrl, 'data_url');
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  };

  const rejectRequirement = async (note: string) => {
    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    const user = userDoc.data();
    const requirement = user.requirements.findIndex((req: any) => req.title === title);
    user.requirements[requirement] = {
      ...user.requirements[requirement],
      status: 'edit',
      note: note,
    };

    await updateDoc(userRef, { requirements: user.requirements });
  };

  const handleApprove = async () => {
    await Swal.fire({
      html: `
        <div class="flex flex-col items-start w-full">
          <p class="text-2xl text-start font-bold text-black">Verify this requirement?</p>
          <p class="text text-start text-base text-gray-500">Check the box if you followed the steps and verified the requirement.</p>
        </div>
      `,
      input: 'checkbox',
      showCloseButton: true,
      inputValue: 0,
      inputPlaceholder: `
        <p class="text text-start text-sm text-gray-600">I have followed the steps and verified this requirement</p>
      `,
      confirmButtonText: `Verify`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#263AFF',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          await verifyRequirement();
        } catch (error) {
          Swal.showValidationMessage(`
            Verify failed: ${error}
          `);
        }
      },
      inputValidator: (result) => {
        return !result && 'You must have verified this requirement.';
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `You vefied this requirement`,
          icon: 'success',
        });
      }
    });
  };

  const handleReject = async () => {
    await Swal.fire({
      html: `
        <div class="flex flex-col items-start w-full">
          <p class="text-2xl text-start font-bold text-black">Reject Requirement</p>
          <p class="text text-start text-base text-gray-600">Please provide a note explaining why this requirement cannot be verified.</p>
        </div>
      `,
      input: 'textarea',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#263AFF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Submit Rejection',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      inputValidator: (result) => {
        console.log(result);
        if (!result) {
          return 'You need to write a note explaining why this requirement cannot be verified.';
        }
        if (result.length < 20) {
          return 'The note must be at least 20 characters long.';
        }
      },
      preConfirm: async (note) => {
        try {
          await rejectRequirement(note);
        } catch (error) {
          Swal.showValidationMessage(`
            Verify failed: ${error}
          `);
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `You rejected this requirement`,
          icon: 'success',
        });
      }
    });
  };
  if (status === 'inReview') {
    return (
      <div className="flex gap-2">
        <button
          onClick={handleApprove}
          disabled={status !== 'inReview'}
          className="rounded-md border border-gray-300 bg-green-500 px-3 py-2 font-medium text-white transition-all duration-150 hover:bg-green-600 disabled:cursor-none"
        >
          Approve
        </button>
        <button
          onClick={handleReject}
          disabled={status !== 'inReview'}
          className="rounded-md border border-gray-300 bg-red-500 px-3 py-2 font-medium text-white transition-all duration-150 hover:bg-red-600 disabled:cursor-none"
        >
          Reject
        </button>
      </div>
    );
  }
  return null;
}
