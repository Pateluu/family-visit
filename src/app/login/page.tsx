"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleGoToCalendar = () => {
    router.push("/calendar");
  };

  return (
    <div className="min-h-screen bg-[url('/background.jpg')] bg-cover bg-center flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Planeador de Visitas</h1>
        <p className="text-gray-700 mb-6">Familia Marques da Silva ❤️</p>
        <button
          onClick={handleGoToCalendar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          Entrar no Calendário
        </button>
      </div>
    </div>
  );
}
