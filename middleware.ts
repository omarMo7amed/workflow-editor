<<<<<<< HEAD
import { type NextRequest } from "next/server";
import { updateSession } from "./app/src/_lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/editor/:path*",
    "/dashboard/:path*",
  ],
};
=======
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect editor routes
  if (req.nextUrl.pathname.startsWith('/editor') && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // Redirect authenticated users away from auth pages
  if (req.nextUrl.pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(new URL('/editor', req.url))
  }

  return res
}

export const config = {
  matcher: ['/editor/:path*', '/auth/:path*']
}
>>>>>>> 72c87914f6972d14068f41812ff9f34fbeea407a
