import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "@/auth"

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard-escuela')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    if (session.user.role !== 'SCHOOL') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  if (pathname === '/dashboard' && session?.user?.role === 'SCHOOL') {
    return NextResponse.redirect(new URL('/dashboard-escuela', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}