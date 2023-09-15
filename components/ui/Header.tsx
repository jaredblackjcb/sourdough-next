"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Grid } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

export default function Header({ userName }: { userName: string }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const formData = new FormData();
    await axios.post("/api/auth/sign-out", formData);
    // have to handle redirect manually from client side since page refresh is not triggered
    router.refresh();
  };

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item></Grid>
          <Grid item>
            <Grid container justifyContent={"space-between"} alignItems={"center"}>
              {/* Only display username on larger screens */}
              <Grid id="account-username" item sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                  {userName}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Grid>
            </Grid>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* Dropdown menu options */}
              <MenuItem component={Link} href="/dashboard" onClick={handleClose}>
                <ChatIcon sx={{ mr: 1 }} />
                Chatbots
              </MenuItem>
              <MenuItem component={Link} href="/subscription/manage" onClick={handleClose}>
                <CreditCardIcon sx={{ mr: 1 }} />
                Manage Subscription
              </MenuItem>
              <MenuItem component={Link} href="/profile" onClick={handleClose}>
                <ManageAccountsIcon sx={{ mr: 1 }} />
                My Account
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Sign Out
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
