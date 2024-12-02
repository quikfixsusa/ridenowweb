import { COOKIE_SESSION_NAME } from '@/app/constants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_SESSION_NAME);
  return NextResponse.json({ message: 'cookie deleted' }, { status: 202 });
}
