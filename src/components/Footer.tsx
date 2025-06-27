import { useRouter } from "@tanstack/react-router";
import BackButton from "./BackButton";

export default function Footer() {
  const router = useRouter();
  const currentPath = router.history.location.pathname;

  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-black shadow-lg border-b-4 border-cyan-400">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Vis knappen kun hvis vi IKKE er på forsiden */}
        {currentPath !== "/" ? <BackButton /> : <div />}

        <h1 className="bg-gray-800 text-white text-sm text-center p-4">
          © 2025 React App
        </h1>
      </div>
    </footer>
  );
}
