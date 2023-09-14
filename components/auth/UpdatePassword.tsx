"use client";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { isValidPassword } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { Container, Typography } from "@mui/material";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [passwordBlurred, setPasswordBlurred] = useState(false);

  const supabase = createClientComponentClient();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const updatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      // Go to Home page
      router.replace("/");
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
          Update Password
        </Typography>
        <Box component="form" onSubmit={updatePassword} noValidate sx={{ mt: 1 }}>
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
          <Button
            type="submit"
            disabled={!isValidPassword(password)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            UPDATE PASSWORD
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
