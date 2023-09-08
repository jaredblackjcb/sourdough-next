import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import MainContent from "@/components/MainContent";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <MainContent />;
}
