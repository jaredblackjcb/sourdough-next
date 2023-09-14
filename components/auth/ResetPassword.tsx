"use client";
import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import isEmail from "validator/lib/isEmail";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Container, Typography } from "@mui/material";

export default function ResetPassword() {
  const [email, setEmail] = React.useState("");
  const [emailBlurred, setEmailBlurred] = React.useState(false);

  const supabase = createClientComponentClient();

  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/update-password`,
    });

    if (error) {
      // handle error
    } else {
      // TODO: Show success message with instructions to check email
    }
  };

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
          Reset Password
        </Typography>
        <Box component="form" onSubmit={resetPassword} noValidate sx={{ mt: 1 }}>
          <TextField
            autoFocus
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
          <Button type="submit" disabled={!isEmail(email)} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            RESET PASSWORD
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
