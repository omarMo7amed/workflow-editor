import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    const isCallback = pathname.startsWith("/auth/callback");
    const isAuthRoute =
      pathname.startsWith("/auth/signin") ||
      pathname.startsWith("/auth/signup");

    const isProtectedRoute =
      pathname.startsWith("/editor") || pathname.startsWith("/dashboard");

    if (!user && isProtectedRoute && !isCallback) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }

    if (user && isAuthRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard/workflows";
      return NextResponse.redirect(url);
    }

    if (user && pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard/workflows";
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error("Auth check failed:", error);
  }

  return response;
}
