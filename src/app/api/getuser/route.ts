import { COOKIE_SESSION_NAME } from '@/app/constants';
import { db } from '@/app/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_SESSION_NAME)?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unautorized' }, { status: 401 });
  }
  const secret = process.env.JWT_SECRET || '';
  try {
    const verifiedToken = verify(token, secret);
    if (typeof verifiedToken === 'string') {
      return NextResponse.json({ message: 'Unautorized' }, { status: 401 });
    }
    const { id } = verifiedToken;
    const userFind = await getDoc(doc(db, 'users', id));
    const user = userFind.data();
    if (!userFind.exists()) {
      return NextResponse.json({ message: 'Unautorized' }, { status: 401 });
    }
    return NextResponse.json({ id, ...user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
