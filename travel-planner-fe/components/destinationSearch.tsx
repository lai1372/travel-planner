"use client";

import React, { useState } from "react";
import styles from "../app/page.module.css";
import { SearchBoxRetrieveResponse } from "@mapbox/search-js-core";
import dynamic from "next/dynamic";

const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

const DynamicSearchBox = dynamic(
  () => import("@mapbox/search-js-react").then((module) => module.SearchBox),
  {
    ssr: false,
  }
);

interface DestinationProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number | null>>;
  setLat: React.Dispatch<React.SetStateAction<number | null>>;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  destination: string;
}

export default function Destination({
  setCurrentPage,
  setLng,
  setLat,
  setDestination,
  destination,
}: DestinationProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setCurrentPage((currPage) => currPage + 1);
    e.preventDefault();
  };

  const handleRetrieve = (e: SearchBoxRetrieveResponse) => {
    setLng(e.features[0].properties.coordinates.longitude);
    setLat(e.features[0].properties.coordinates.latitude);
    setDestination(e.features[0].properties.name);
    setIsDisabled(false);
  };

  const handleChange = () => {
    setIsDisabled(true);
  };

  return (
    <>
      <h1>Where are you headed?</h1>
      <form className={styles.search} onSubmit={handleSubmit}>
        <DynamicSearchBox
          options={{
            language: "en",
            types: "place",
          }}
          value={destination}
          accessToken={accessToken}
          onRetrieve={handleRetrieve}
          onChange={handleChange}
        />

        <button disabled={isDisabled} type="submit">
          Continue
        </button>
      </form>
    </>
  );
}
