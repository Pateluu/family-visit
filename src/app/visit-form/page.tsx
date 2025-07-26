"use client";

import { useState } from "react";
import { db } from "../../../firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function VisitFormPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const checkIfTimeIsTaken = async (date: string, time: string): Promise<boolean> => {
    const q = query(
      collection(db, "visits"),
      where("date", "==", Timestamp.fromDate(new Date(date))),
      where("time", "==", time)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !date || !time) {
      alert("Por favor, preenche todos os campos.");
      return;
    }

    const isTaken = await checkIfTimeIsTaken(date, time);
    if (isTaken) {
      alert("Já existe uma visita marcada para essa hora.");
      return;
    }

    try {
      await addDoc(collection(db, "visits"), {
        name,
        time,
        date: Timestamp.fromDate(new Date(date)),
        createdAt: Timestamp.now(),
      });

      alert("Visita marcada com sucesso!");
      router.push("/calendar");
    } catch (err) {
      console.error("Erro ao marcar visita:", err);
      alert("Ocorreu um erro ao marcar a visita.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <button
          onClick={() => router.back()}
          type="button"
          className="mb-4 text-blue-600 hover:underline underline-offset-2 transition"
        >
          ← Voltar
        </button>

        <h1 className="text-2xl font-bold text-center">Marcar Visita</h1>

        <input
          type="text"
          placeholder="Quem vai visitar?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Confirmar
        </button>
      </form>
    </div>
  );
}
