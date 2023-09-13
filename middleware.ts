import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

/* Middleware that refreshes the user's session before loading server component routes.
   Runs immediately before the routes defined in the config are rendered.
*/
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  console.log("middleware called");
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();
  return res;
}

// List of routes that use this middleware
export const config = {
  matcher: ["/", "/dashboard"],
};
