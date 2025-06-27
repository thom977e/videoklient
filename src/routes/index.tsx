import { createFileRoute, Link } from "@tanstack/react-router";
import { Route as PlanetsRoute } from "./planets";
import { Route as ChatRoute } from "./chat";

export const Route = createFileRoute("/")({
  component: () => (
    <div
      className="w-full flex items-center justify-center backdrop-brightness-100"
      style={{
        backgroundImage: "url('/galaxy.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "2000px",
      }}
    >
      <div className="bg-black bg-opacity-80 text-white rounded-xl max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
          <img src="/vite.svg" alt="Logo" className="w-6 h-6 mr-2" />
          SWAPI Explorer
        </h1>
        <p className="mb-4">
          Velkommen til Star Wars-galaksen. Tryk herunder for at se planeterne!
        </p>
        <Link
          to={PlanetsRoute.to}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          🚀 Gå til planeterne
        </Link>

        <br />

        {/* Gå til chat */}
        <Link
          to={ChatRoute.to}
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          💬 Gå til chatten
        </Link>
      </div>
    </div>
  ),
});
