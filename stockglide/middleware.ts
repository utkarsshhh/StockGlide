import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');
  const isAuthenticated = !!sessionCookie?.value;
  
  // Protected routes
  if (
    (request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/profile')) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // Redirect authenticated users away from auth pages
  if (
    (request.nextUrl.pathname.startsWith('/auth')) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/auth/:path*'],
};