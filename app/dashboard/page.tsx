import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/ui/LogoutButton";

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  );
}
