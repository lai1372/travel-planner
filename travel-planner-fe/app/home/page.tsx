"use client";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logo from "@/components/logo";

function Home() {
  const { name } = useContext(AuthContext);

  return (
    <Stack gap={5} height="80vh" justifyContent="center" alignItems="center">
      <Logo
        style={{
          display: "block",
          height: "20vh",
          width: "auto",
          objectFit: "contain",
        }}
      />
      <Typography
        sx={{
          textShadow: "0px 0px 20px black",
        }}
        variant="h5"
        style={{ marginBottom: "10px" }}
      >
        Hi {name}, welcome back 🏖️
      </Typography>
      <Button component={Link} href="/trips" variant="contained">
        View your itineraries
      </Button>
      <Typography>Or..</Typography>
      <Button component={Link} href="/choices" variant="contained">
        Add a new trip!
      </Button>
    </Stack>
  );
}

export default Home;
