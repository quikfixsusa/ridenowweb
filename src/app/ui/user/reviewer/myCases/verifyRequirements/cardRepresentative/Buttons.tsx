import { db } from '@/app/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

interface Props {
  status: 'reception' | 'inReview' | 'edit' | 'approved';
  id: string;
}

export default function Buttons({ status, id }: Props) {
  const verifyRequirement = async () => {
    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    const user = userDoc.data();
    const newRepresentative = {
      ...user.representative,
      status: 'approved',
    };
    await updateDoc(userRef, { representative: newRepresentative, representativeInReview: false });
  };

  const rejectRequirement = async (note: string) => {
    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    const user = userDoc.data();
    const newRepresentative = {
      ...user.representative,
      status: 'edit',
      note: note,
    };
    await updateDoc(userRef, { representative: newRepresentative });
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
          title: `You reject this requirement`,
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
