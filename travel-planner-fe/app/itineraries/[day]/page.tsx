"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { PlacesMap } from "@/components/placesMap";
import Link from "next/link";

type itemProperties = {
  name: string;
  full_address: string;
};

export default function SingleDay() {
  const searchParams = useSearchParams();
  const currentDay = usePathname().slice(-1);
  const places = searchParams.get("places") || null;
  const restaurants = searchParams.get("restaurants") || null;

  const parsedPlaces = places ? JSON.parse(places) : [];
  const parsedRestaurants = restaurants ? JSON.parse(restaurants) : [];

  const destination = searchParams.get("destination");

 console.log
  return (
    <main>
      <h1>Day {currentDay}</h1>
      <PlacesMap />
      <section>
        <article>
          <h2>Places to Visit</h2>
          <ul>
            {parsedPlaces.map((place: itemProperties, index: number) => (
              <li key={index}>
                <p>{place.name}</p>
                <p>{place.full_address}</p>
              </li>
            ))}
          </ul>
        </article>
        <article>
          <h2>Restaurants to Visit</h2>
          <ul>
            {parsedRestaurants.map(
              (restaurant: itemProperties, index: number) => (
                <li key={index}>
                  <p>{restaurant.name}</p>
                  <p>{restaurant.full_address}</p>
                </li>
              )
            )}
          </ul>
        </article>
      </section>
      <Link href={`/itineraries?destination=${destination}`}>
          <button >Return to itinerary</button>
        </Link>
    </main>
  );
}
