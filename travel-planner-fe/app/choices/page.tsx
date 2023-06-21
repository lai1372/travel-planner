"use client";

import { useState } from "react";
import Destination from "@/components/destinationSearch";
import Duration from "@/components/duration";
import Preferences from "@/components/preferences";

enum Pages {
  Destination,
  Duration,
  Preferences,
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.Destination);
  const [destination, setDestination] = useState<string>("");
  const [lng, setLng] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [numDays, setNumDays] = useState<null | number>(null);

  return (
    <div>
      {currentPage === Pages.Destination && (
        <Destination
          setCurrentPage={setCurrentPage}
          setLng={setLng}
          setLat={setLat}
          setDestination={setDestination}
          destination={destination}
        />
      )}
      {currentPage === Pages.Duration && (
        <Duration
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          numDays={numDays}
          setNumDays={setNumDays}
        />
      )}
      {currentPage === Pages.Preferences && (
        <Preferences
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          lng={lng}
          lat={lat}
          numDays={numDays}
          destination={destination}
        />
      )}
    </div>
  );
}
