import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type Planet = {
  name: string;
  id: string;
  url: string;
};

export const Route = createFileRoute("/planets/")({
  component: PlanetList,
});

function PlanetList() {
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then((res) => res.json())
      .then((data) => setPlanets(data.results));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Planeter</h1>
      <ul className="space-y-2">
        {planets.map((planet) => {
          const id = planet.url.split("/").filter(Boolean).pop() as string;
          return (
            <li key={id}>
              <Link
                to="/planets/$id"
                params={{ id }}
                className="text-blue-600 hover:underline"
              >
                {planet.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
