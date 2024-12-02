'use client';

import PatternLeft from '../resetPassword/PatternLeft';
import LoginBox from './LoginBox';

export default function SignIn() {
  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row-reverse">
      <PatternLeft />
      <LoginBox />
    </main>
  );
}
