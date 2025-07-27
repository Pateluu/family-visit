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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [multiDay, setMultiDay] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = multiDay ? new Date(endDate) : new Date(startDate);

    if (multiDay && end < start) {
      alert("A data de fim não pode ser antes da data de início.");
      return;
    }

    const isTaken = await checkIfTimeIsTaken(start, end, time);
    if (isTaken) {
      alert("Já existe uma visita marcada nesse horário.");
      return;
    }

    try {
      await addDoc(collection(db, "visits"), {
        name,
        startDate: Timestamp.fromDate(start),
        endDate: Timestamp.fromDate(end),
        time,
        createdAt: Timestamp.now(),
      });

      alert("Visita marcada com sucesso!");
      router.push("/calendar");
    } catch (err) {
      console.error("Erro ao agendar visita:", err);
      alert("Erro ao marcar visita.");
    }
  };

  const checkIfTimeIsTaken = async (start: Date, end: Date, time: string) => {
    const q = query(
      collection(db, "visits"),
      where("time", "==", time)
    );

    const snapshot = await getDocs(q);

    for (const doc of snapshot.docs) {
      const visit = doc.data();
      const visitStart = visit.startDate.toDate();
      const visitEnd = visit.endDate.toDate();

      if (
        (start >= visitStart && start <= visitEnd) ||
        (end >= visitStart && end <= visitEnd) ||
        (visitStart >= start && visitEnd <= end)
      ) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <button
          onClick={() => router.back()}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Voltar
        </button>

        <h1 className="text-2xl font-bold text-center">Marcar Visita</h1>

        <input
          type="text"
          placeholder="Quem vai visitar?/Onde vai?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={multiDay}
            onChange={() => setMultiDay(!multiDay)}
            className="accent-green-600"
          />
          Mais que um dia?
        </label>
        <br></br>
        <label className="p-2 text-sm">Data:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className=" border border-gray-300 rounded px-4 py-2"
          required
        />
        
        {multiDay && (
          <>
            <br></br>
            <label className="p-2 text-sm">Data de fim:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className=" border border-gray-300 rounded px-4 py-2"
              required
            />
          </>
        )}
        <br></br>
        {!multiDay && (
          <>
            <label className="p-2 text-sm">Hora:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2"
              required
            />
          </>
        )}

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
