import { COOKIE_SESSION_NAME } from '@/app/constants';
import { auth, db } from '@/app/lib/firebase';
import { serialize } from 'cookie';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const MAX_AGE = 60 * 60 * 8;

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, userType } = body;
  if (!email || !password || !userType) {
    return NextResponse.json({ code: 'Missign data' }, { status: 400 });
  }
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const docRef = await getDoc(doc(db, 'users', user.user.uid));
    if (docRef.exists()) {
      const userData = docRef.data();
      if (userData.userType !== userType) {
        return NextResponse.json({ code: `This account is not type: ${userType}` }, { status: 401 });
      }
    } else {
      return NextResponse.json({ code: 'User not found' }, { status: 404 });
    }

    const secret = process.env.JWT_SECRET || '';
    const token = sign(
      {
        id: user.user.uid,
        email: user.user.email,
        userType: userType,
      },
      secret,
      {
        expiresIn: MAX_AGE,
      },
    );

    const serialized = serialize(COOKIE_SESSION_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: MAX_AGE,
      path: '/',
    });

    return NextResponse.json({ message: 'logged' }, { status: 200, headers: { 'Set-Cookie': serialized } });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
