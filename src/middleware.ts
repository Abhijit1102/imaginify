import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Allow all requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // Match all routes excluding static files
  ],
};
