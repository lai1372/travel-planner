"use client";

import { useState, useEffect, useContext } from "react";
import { getFirestore } from "firebase/firestore";
import { orange, red } from "@mui/material/colors";
import { useSearchParams } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import firebase_app from "@/app/firebase/config";
import { fetchDataFromFirebase } from "@/utils/firebaseUtils";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import LoadingPage from "@/components/loadingPage";

const db = getFirestore(firebase_app);

function Itinerary() {
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || "";
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [itineraryData, setItineraryData] = useState({
    places: [],
    restaurants: [],
  });

  useEffect(() => {
    if (!user?.uid || !destination) return;

    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchDataFromFirebase(db, user.uid, destination);
      setItineraryData(data);
      setIsLoading(false);
    };

    fetchData();
  }, [user?.uid, destination]);

  if (isLoading) {
    return <LoadingPage />;
  }

 

  return (
    <section>
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {Array.from({ length: itineraryData.places.length / 3 }, (_, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              sx={{
                height: "2rem",
                width: "2rem",
                backgroundColor: currentDay === index ? red[500] : orange[500],
              }}
            />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent
            onClick={() => setCurrentDay(index)}
            sx={{ height: "14vh", width: "80vw" }}
          >
            <Link
              href={`/itineraries/day-${index + 1}?places=${encodeURIComponent(
                JSON.stringify(
                  itineraryData.places.slice(index * 3, index * 3 + 3)
                )
              )}&restaurants=${encodeURIComponent(
                JSON.stringify(
                  itineraryData.restaurants.slice(index * 3, index * 3 + 3)
                )
              )}&destination=${encodeURIComponent(destination)
                }`}
            >
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h2" align="center">
                  Day {index + 1}
                </Typography>
              </Paper>
            </Link>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
    <Link href='/trips'>
      <button>Return to your trips</button>
    </Link>
    </section>
  );
}

export default Itinerary;
