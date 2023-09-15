import Link from "next/link";
import React from "react";

export default function MainContent() {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link href="/dashboard">Dashboard</Link>
      <br />
      <Link href="/login">Login</Link>
      <br />
      <Link href="/signup">Signup</Link>
    </div>
  );
}
