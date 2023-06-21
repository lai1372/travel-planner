"use client";
import styles from "../page.module.css";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import firebase_app from "@/app/firebase/config";
import {
  fetchDataFromFirebase,
  deleteDataFromFirebase,
} from "@/utils/firebaseUtils";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import LoadingPage from "@/components/loadingPage";

import { AuthContext } from "@/app/context/AuthContext";
import { getFirestore } from "firebase/firestore";
import { redirect } from "next/navigation";

const db = getFirestore(firebase_app);

export default function Trips() {
  const [trips, setTrips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      if (!user?.uid) return;
      try {
        setIsLoading(true);
        const data = await fetchDataFromFirebase(db, user.uid);
        const tripNames = Object.keys(data);
        setTrips(tripNames);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }

    if (!user) {
      redirect("/sign-in");
    }
    fetchData();
  }, [user]);

  const handleDelete = async (destination: string) => {
    if (!user?.uid) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this itinerary?"
    );
    if (!confirmDelete) return;

    await deleteDataFromFirebase(db, user?.uid, destination);
    setTrips((prevTrips) => prevTrips.filter((trip) => trip !== destination));
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (trips.length === 0) {
    return <p>No trips found</p>;
  }

  return (
    <main className={styles.tripList}>
      <Stack gap={1}>
        <Typography textAlign="center" variant="h3" fontWeight="bold">
          Your trips 🌎
        </Typography>
        {trips.map((trip, i) => (
          <ButtonGroup variant="contained" key={i}>
            <Button
              href={`/itineraries?destination=${trip}`}
              component={Link}
              size="large"
              sx={{
                width: "100%",
                height: "80px",
              }}
            >
              <Typography fontWeight="bold">{trip}</Typography>
            </Button>
            <Button
              onClick={() => {
                handleDelete(trip);
              }}
              size="large"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </Button>
          </ButtonGroup>
        ))}
      </Stack>
    </main>
  );
}
