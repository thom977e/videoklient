// src/components/BackButton.tsx
// components/BackButton.tsx
import { useRouter } from "@tanstack/react-router";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.history.back()}
      className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
    >
      ⬅️ Tilbage
    </button>
  );
}
