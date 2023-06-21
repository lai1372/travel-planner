"use client";
import Image from "next/image";
import { Map, MapRef, useMap } from "react-map-gl";
import styles from "../app/page.module.css";
import ReactMapGL, {
  Marker,
  Popup,
  Source,
  Layer,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import red from "@mui/material/colors/red";

import mapboxgl from "mapbox-gl";
import { useRef, useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

const DEFAULT_LAT = 41.390205;
const DEFAULT_LNG = 2.154007;
const DEFAULT_ZOOM = 12;
export const PlacesMap = () => {
  const mapRef = useRef<MapRef | null>(null);

  const allCoordinates = [
    [2.18, 41.385],
    [2.18, 41.381],
    [2.18, 41.376],
    [2.18, 41.382],
    [2.172, 41.382],
  ];

  const handleClick = () => {
    mapRef.current?.flyTo({
      center: [DEFAULT_LNG, DEFAULT_LAT],
      zoom: DEFAULT_ZOOM,
      essential: true,
    });
  };
  const locations = allCoordinates.map((coordinates, index) => ({
    id: index,
    latitude: coordinates[1],
    longitude: coordinates[0],
  }));
  return (
    <div id="mapbox-gl" className={styles.map}>
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoibGFpOTYiLCJhIjoiY2xpdWVhdmQ3MHkybjNobzdnbjJwcmx6YSJ9.0CYohMf5CN77cD-BOo7mhw"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        initialViewState={{
          longitude: DEFAULT_LNG,
          latitude: DEFAULT_LAT,
          zoom: DEFAULT_ZOOM,
        }}
      >
        <NavigationControl
          showZoom={false}
          showCompass={false}
          visualizePitch={false}
        />
        {locations.map((location) => {
          return (
            <Marker
              key={location.id}
              latitude={location.latitude}
              longitude={location.longitude}
            >
              <LocationOnIcon
                sx={{
                  color: red[500],
                }}
              />
            </Marker>
          );
        })}
      </ReactMapGL>
      <button onClick={handleClick}>Center</button>
    </div>
  );
};
