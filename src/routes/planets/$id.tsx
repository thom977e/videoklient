import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Route as PlanetsIdRoute } from "./$id";

type PlanetDetail = {
  name: string;
  climate: string;
  population: string;
  terrain: string;
  diameter: string;
  gravity: string;
  orbital_period: string;
  rotation_period: string;
  surface_water: string;
};

export const Route = createFileRoute("/planets/$id")({
  component: PlanetDetails,
});

function PlanetDetails() {
  const { id } = useParams({ from: PlanetsIdRoute.id });
  const [planet, setPlanet] = useState<PlanetDetail | null>(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/planets/${id}`)
      .then((res) => res.json())
      .then((data) => setPlanet(data.result.properties));
  }, [id]);

  if (!planet || !planet.name) {
    return <p>Indlæser planeten....</p>;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{planet.name}</h1>
      <p>
        <strong>Klima:</strong> {planet.climate}
      </p>
      <p>
        <strong>Befolkning:</strong> {planet.population}
      </p>
      <p>
        <strong>Terræn:</strong> {planet.terrain}
      </p>
      <p>
        <strong>Diameter:</strong> {planet.diameter}
      </p>
      <p>
        <strong>Tyngdekraft:</strong> {planet.gravity}
      </p>
      <p>
        <strong>Omløbstid:</strong> {planet.orbital_period} dage
      </p>
      <p>
        <strong>Rotationstid:</strong> {planet.rotation_period} timer
      </p>
      <p>
        <strong>Procentmæssige vandoverflade:</strong> {planet.surface_water}%
      </p>
    </div>
  );
}
