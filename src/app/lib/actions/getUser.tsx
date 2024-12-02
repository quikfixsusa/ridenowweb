import { COOKIE_SESSION_NAME } from '@/app/constants';
import { doc, getDoc } from 'firebase/firestore';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { db } from '../firebase';

export async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_SESSION_NAME)?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unautorized' }, { status: 401 });
  }
  const secret = process.env.JWT_SECRET || '';

  try {
    const verifiedToken = verify(token, secret);
    if (typeof verifiedToken === 'string') {
      redirect('/auht/login');
    }
    const { id } = verifiedToken;
    const userFind = await getDoc(doc(db, 'users', id));
    const user = userFind.data();
    if (!userFind.exists()) {
      redirect('/auth/login');
    }

    return user;
  } catch (error) {
    console.log(error);
    redirect('/auth/login');
  }
}
