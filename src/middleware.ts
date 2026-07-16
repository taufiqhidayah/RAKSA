import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

const PROTECTED_PREFIXES = ["/dashboard", "/family", "/tags", "/claim", "/setup", "/profile", "/contacts", "/wristbands", "/notifications", "/admin"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
  // Support both the legacy anon key name and the newer publishable key name,
  // matching the fallback in src/shared/config/env.ts. Without this, the
  // middleware uses a placeholder key and every session check fails, redirecting
  // authenticated users back to /login.
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "placeholder-anon-key";

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { data } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isProtected && !data.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin area is superadmin-only. Authorization is env-based (not in the DB).
  if (pathname.startsWith("/admin")) {
    const superadminId = process.env.SUPERADMIN_USER_ID;
    if (!superadminId || data.user?.id !== superadminId) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/family/:path*",
    "/tags/:path*",
    "/claim/:path*",
    "/setup/:path*",
    "/profile/:path*",
    "/contacts/:path*",
    "/wristbands/:path*",
    "/notifications/:path*",
    "/admin/:path*",
  ],
};
