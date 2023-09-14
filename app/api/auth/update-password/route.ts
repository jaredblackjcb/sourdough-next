import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Retrieve auth code from the email link
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // Exchange auth code for session and redirect user to update password
  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);

    return NextResponse.redirect(`${requestUrl.origin}/update-password`);
  }

  console.error("ERROR: Invalid auth code or no auth code found");

  return NextResponse.redirect(`${requestUrl.origin}/sign-in`);
}
