import { COOKIE_SESSION_NAME } from '@/app/constants';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_SESSION_NAME)?.value || '';
  const pathName = request.nextUrl.pathname;
  if (!token && !request.nextUrl.pathname.startsWith('/auth/login')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  if (!token && request.nextUrl.pathname.startsWith('/user')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  try {
    const secret = process.env.JWT_SECRET || '';
    const verifiedToken = await jwtVerify(token, new TextEncoder().encode(secret));
    // Si el token no es válido, redirigir al login

    if (!verifiedToken && !request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    const payload = verifiedToken.payload;
    // Si existe el token y es cualquier rol pero va a la ruta user
    if (pathName === '/user') {
      return NextResponse.redirect(new URL(`/user/${payload.userType}`, request.url));
    }
    // Si existe el token y el rol es reviewer, redirigir al reviewer
    if (pathName.startsWith('/auth/login') && payload.userType === 'reviewer') {
      return NextResponse.redirect(new URL('/user/reviewer', request.url));
    }
    // Si existe el token y el rol es customer, redirigir al customer
    if (pathName.startsWith('/auth/login') && payload.userType === 'customer') {
      return NextResponse.redirect(new URL('/user/customer', request.url));
    }
    // Si el usuario es contractor y quiere acceder a customer o reviewer, redirigir a la ruta contractor
    if (
      (pathName.startsWith('/user/reviewer') || request.nextUrl.pathname.startsWith('/user/customer')) &&
      payload.userType === 'contractor'
    ) {
      return NextResponse.redirect(new URL('/user/contractor', request.url));
    }

    // Si el usuario es reviewer y quiere acceder a la ruta contractor o customer, redirigir a la ruta reviewer
    if (
      (pathName.startsWith('/user/contractor') || request.nextUrl.pathname.startsWith('/user/customer')) &&
      payload.userType === 'reviewer'
    ) {
      return NextResponse.redirect(new URL('/user/reviewer', request.url));
    }

    // Si el usuario es customer y quiere acceder a la ruta contractor o reviewer, redirigir a la ruta customer
    if (
      (pathName.startsWith('/user/contractor') || request.nextUrl.pathname.startsWith('/user/reviewer')) &&
      payload.userType === 'customer'
    ) {
      return NextResponse.redirect(new URL('/user/customer', request.url));
    }
    return NextResponse.next();
  } catch (error) {
    return;
  }
}

export const config = {
  matcher: ['/user/:path*', '/auth/login'],
};
