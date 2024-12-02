'use client';
import InputPassword from '@/app/components/Input';
import InputStyled from '@/app/components/InputStyled';
import SpinLoader from '@/app/components/SpinLoader';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import UserTypeButtons from './UserTypeButtons';
import { validateLogin } from './validateCredentials';

export default function FormLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [userType, setUserType] = useState('reviewer');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [errorCredentials, setErrorCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessage('');
    setCredentials({
      ...credentials,
      [name]: value,
    });

    setErrorCredentials(
      validateLogin({
        ...credentials,
        [name]: value,
      }),
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    if (Object.values(credentials).some((x) => x === '')) {
      setMessage('*All fields are required');
      return;
    } else if (Object.values(errorCredentials).some((x) => x !== '')) {
      setMessage('*Check for errors');
      return;
    }
    setLoading(true);

    axios
      .post(
        '/api/login',
        {
          ...credentials,
          userType,
        },
        { withCredentials: true },
      )
      .then((res) => {
        setLoading(false);
        if (res.data.message === 'logged') {
          router.push('/user/reviewer');
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data.code === 'auth/invalid-credential') {
          setMessage('Email or password incorrect');
          return;
        }
        if (err.response.data.code === 'unavailable') {
          setMessage('An error ocurred, please try again later');
          return;
        }
        console.log(err);
        setMessage(err.response.data.code);
      });
  };
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <UserTypeButtons userType={userType} setUserType={setUserType} />
      <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-6">
        <InputStyled
          name="email"
          placeholder="Your email address"
          value={credentials.email}
          error={!!errorCredentials.email}
          errorMessage={errorCredentials.email}
          onChange={handleChange}
          type="text"
        />
        <InputPassword
          name="password"
          placeholder="Password"
          value={credentials.password}
          error={!!errorCredentials.password}
          errorMessage={errorCredentials.password}
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
          Sign In
        </button>
      </form>
    </div>
  );
}
