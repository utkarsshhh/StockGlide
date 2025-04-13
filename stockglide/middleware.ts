import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('token');
    const isAuthenticated = !!sessionCookie?.value;
    const { pathname } = request.nextUrl;
  
    console.log("isAuthenticated:", isAuthenticated);
    console.log("pathname:", pathname);
  
    const isAuthRoute = pathname.startsWith('/auth');
    const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/profile');
  
    // 🛡️ Block unauthenticated users from protected routes
    if (isProtectedRoute && !isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  
    // 🔐 Prevent authenticated users from accessing login/register pages
    // Only redirect if they're not already on /auth/logout (or whatever is safe)
    if (isAuthRoute && isAuthenticated && pathname !== '/auth/logout') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  
    return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};