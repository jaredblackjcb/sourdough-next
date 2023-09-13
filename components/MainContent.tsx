import { Button, Container } from "@mui/material";

import React from "react";
import LogoutButton from "./LogoutButton";

export default function MainContent() {
  return (
    <Container>
      <Button variant="contained">Hello World</Button>
      <LogoutButton />
    </Container>
  );
}
