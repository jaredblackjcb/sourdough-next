import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Signup from "@/components/auth/Signup";

export default async function SignupPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <Signup />
    </div>
  );
}
