import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_KEY, SUPABASE_URL } from "./env";

/** Everything under here requires a signed-in user. */
const PROTECTED_PREFIX = "/desk";

/** The unlisted entrance. Deliberately not in the nav or the sitemap. */
const LOGIN_PATH = "/enter";

/**
 * Refreshes the auth session on every request and guards the private
 * wing. Must run in middleware: Server Components cannot write the
 * refreshed cookies themselves.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // getUser() revalidates against the auth server. Do not swap this for
  // getSession(), which trusts the cookie without verifying it.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (!user && pathname.startsWith(PROTECTED_PREFIX)) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && pathname === LOGIN_PATH) {
    const url = request.nextUrl.clone();
    url.pathname = PROTECTED_PREFIX;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
