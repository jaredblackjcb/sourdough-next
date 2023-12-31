"use client";

import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// import { GoogleLogin } from "@react-oauth/google";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import isEmail from "validator/lib/isEmail";
import { isValidPassword } from "@/lib/validators";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await fetch("api/auth/sign-up", {
      method: "POST",
      body: formData,
    });
    router.refresh();
  };

  //   const handleGoogleAuthSuccess = (response) => {
  //     // Destructure the credential from the Google Sign-In response here
  //     const { credential } = response;
  //     // Call Google Auth action here, passing the  client token credential
  //     dispatch(googleAuth(credential));
  //   };

  //   const handleGoogleAuthFailure = (error) => {
  //     console.log("Google Sign-In failed:", error);
  //   };

  const isFormValid = isEmail(email) && isValidPassword(password) && checked;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailBlurred(true)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={emailBlurred && !isEmail(email)}
            helperText={emailBlurred && !isEmail(email) ? "Please enter a valid email address" : ""}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordBlurred(true)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordBlurred && !isValidPassword(password)}
            helperText={
              passwordBlurred && !isValidPassword(password)
                ? "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
                : ""
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={
              <span>
                I agree to the{" "}
                <a href="/terms/" target="_blank" className="text-dark font-weight-bolder">
                  Terms and Conditions
                </a>
              </span>
            }
            onChange={() => setChecked(!checked)}
          />
          {/* Disable the submit button until the form is valid */}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!isFormValid}>
            CREATE ACCOUNT
          </Button>
        </Box>
        {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleGoogleAuthSuccess(credentialResponse);
          }}
          onError={handleGoogleAuthFailure(error)}
        /> */}
        <Box sx={{ mt: 3 }}>
          <Link href="/login">{"Already have an account? Sign in"}</Link>
        </Box>
      </Box>
    </Container>
  );
}
