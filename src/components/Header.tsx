import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-black shadow-lg border-b-4 border-cyan-400">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide text-cyan-300 drop-shadow-[0_0_5px_#0ff] animate-pulse hover:underline"
        >
          Star Wars Galaxen!
        </Link>
      </div>
    </header>
  );
}
