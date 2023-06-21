"use client";
import Link from "@mui/material/Link";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { redirect } from "next/navigation";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import milford from "../public/milford.jpg";
import { useBackgroundImage } from "@/shared/AppMuiThemeProvider";
import Logo from "@/components/logo";

export default function LandingPage() {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      redirect("/home");
    }
  }, [user]);
  return (
    <Stack sx={{ gap: 5 }}>
      <Logo
        style={{
          display: "block",
          height: "20vh",
          width: "auto",
          objectFit: "contain",
        }}
      />
      <Typography textAlign="center" variant="h6">
        Welcome to your itinerary travel planner, the ultimate companion for
        seamless trip organization and unforgettable adventures!
      </Typography>
      <Button variant="contained" href="/sign-in">
        Sign in
      </Button>
      <br></br>
      <Typography textAlign="center">
        If you do not have an account, <Link href="/sign-up">sign up here</Link>
      </Typography>
    </Stack>
  );
}
