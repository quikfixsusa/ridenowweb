'use client';
import InputPassword from '@/app/components/Input';
import SpinLoader from '@/app/components/SpinLoader';
import { auth } from '@/app/lib/firebase';
import { confirmPasswordReset } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { validate } from './validateNewPassword';

export default function FormResetPassword({ actionCode }: { actionCode: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errorNewPassword, setErrorNewPassword] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessage('');
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    if (Object.values(newPassword).some((x) => x === '')) {
      setMessage('*All fields are required');
      return;
    } else if (Object.values(errorNewPassword).some((x) => x !== '')) {
      setMessage('*Check for errors');
      return;
    }
    setLoading(true);
    confirmPasswordReset(auth, actionCode, newPassword.newPassword)
      .then(() => {
        router.push('/auth/successupdatepassword');
      })
      .catch((error) => {
        setMessage(error.code);
        setLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-6">
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
        className={`${message === '' ? 'hidden' : ''} rounded-lg bg-red-200 px-1 py-1 text-center text-sm font-medium text-red-600`}
      >
        {message}
      </p>
      <button
        disabled={loading}
        type="submit"
        className="mt-4 w-full rounded-xl bg-blueQuik py-3 font-medium text-white"
      >
        Reset Password
      </button>
    </form>
  );
}
