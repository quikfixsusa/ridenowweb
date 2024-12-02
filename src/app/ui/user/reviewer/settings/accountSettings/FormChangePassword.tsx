import InputPassword from '@/app/components/Input';
import SpinLoader from '@/app/components/SpinLoader';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { auth } from '@/app/lib/firebase';
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { useState } from 'react';

import { validate } from './validateNewPassword';

export default function FormChangePassword() {
  const { user } = useReviewerContext();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [newPassword, setNewPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errorNewPassword, setErrorNewPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessage('');
    setErrorMessage('');
    setNewPassword({
      ...newPassword,
      [name]: value,
    });
    setErrorNewPassword(
      validate({
        ...newPassword,
        [name]: value,
      }),
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');
    if (Object.values(newPassword).some((x) => x === '')) {
      setErrorMessage('*All fields are required');
      return;
    } else if (Object.values(errorNewPassword).some((x) => x !== '')) {
      setErrorMessage('*Check for errors');
      return;
    }
    setLoading(true);
    if (!user) {
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, user.email, newPassword.currentPassword);
      updatePassword(userCredential.user, newPassword.newPassword)
        .then(() => {
          setMessage('Password changed successfully');
          setLoading(false);
          setNewPassword({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          });
        })
        .catch((error) => {
          setErrorMessage(error.code);
          setLoading(false);
        });
    } catch (error) {
      setErrorMessage('Current password is incorrect');
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-4">
      <InputPassword
        name="currentPassword"
        placeholder="Current Password"
        value={newPassword.currentPassword}
        error={!!errorNewPassword.currentPassword}
        errorMessage={errorNewPassword.currentPassword}
        onChange={handleChange}
        type="password"
      />
      <InputPassword
        name="newPassword"
        placeholder="Your new password"
        value={newPassword.newPassword}
        error={!!errorNewPassword.newPassword}
        errorMessage={errorNewPassword.newPassword}
        onChange={handleChange}
        type="password"
      />
      <InputPassword
        name="confirmNewPassword"
        placeholder="Confirm password"
        value={newPassword.confirmNewPassword}
        error={false}
        errorMessage={errorNewPassword.confirmNewPassword}
        onChange={handleChange}
        type="password"
      />

      <div className={`${loading ? '' : 'hidden'}`}>
        <SpinLoader />
      </div>
      <p
        className={`${errorMessage === '' ? 'hidden' : ''} rounded-lg bg-red-200 px-1 py-1 text-center text-sm font-medium text-red-600`}
      >
        {errorMessage}
      </p>
      <p
        className={`${message === '' ? 'hidden' : ''} rounded-lg bg-green-200 px-1 py-1 text-center text-sm font-medium text-green-600`}
      >
        {message}
      </p>
      <button
        disabled={loading}
        type="submit"
        className="mt-4 w-full rounded-xl bg-blueQuik py-3 font-medium text-white"
      >
        Change Password
      </button>
    </form>
  );
}
