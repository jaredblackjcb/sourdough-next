import React from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import UpdatePassword from "@/components/auth/UpdatePassword";

export default async function UpdatePasswordPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data?.session) {
    redirect("/reset-password");
  }

  return <UpdatePassword />;
}
