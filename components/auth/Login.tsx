"use client";
import React from "react";
import Link from "next/link";
// import Messages from "./messages";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await fetch("api/auth/sign-in", {
      method: "POST",
      body: formData,
    });
    router.refresh();
  };
  return (
    <Container component="main" maxWidth="xs">
      {/* <Messages /> */}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
        {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleGoogleAuthSuccess(credentialResponse);
          }}
          onError={handleGoogleAuthFailure(error)}
        /> */}
        <Grid sx={{ mt: 3 }} container>
          <Grid item xs>
            <Link href="/reset-password">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link href="/signup">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>

    // <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
    //   <Link
    //     href="/"
    //     className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
    //     >
    //       <polyline points="15 18 9 12 15 6" />
    //     </svg>{' '}
    //     Back
    //   </Link>

    //   <form
    //     className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
    //     action="/api/auth/login"
    //     method="post"
    //   >
    //     <label className="text-md" htmlFor="email">
    //       Email
    //     </label>
    //     <input
    //       className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //       name="email"
    //       placeholder="you@example.com"
    //       required
    //     />
    //     <label className="text-md" htmlFor="password">
    //       Password
    //     </label>
    //     <input
    //       className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //       type="password"
    //       name="password"
    //       placeholder="••••••••"
    //       required
    //     />
    //     <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
    //       Sign In
    //     </button>
    //     <button
    //       formAction="/api/auth/sign-up"
    //       className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
    //     >
    //       Sign Up
    //     </button>
    //     <Messages />
    //   </form>
    // </div>
  );
}
