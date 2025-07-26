"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { collection, onSnapshot, query, orderBy, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {pt} from "date-fns/locale"

type Visit = {
  id: string;
  name: string;
  date: Date;
  time: string;
};

export default function CalendarPage() {
  const router = useRouter();
  const [value, setValue] = useState(new Date());
  const [visits, setVisits] = useState<Visit[]>([]);


  useEffect(() => {
    const q = query(collection(db, "visits"), orderBy("date", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          name: d.name,
          date: d.date.toDate(),
          time: d.time || "N/A",
        };
      });
      setVisits(data);
    });

    return () => unsub();
  }, []);

  const visitsForDate = visits.filter(
    (v) =>
      format(v.date, "yyyy-MM-dd") === format(value, "yyyy-MM-dd")
  );

  const deleteVisit = async (id: string) => {
    try {
      await deleteDoc(doc(db, "visits", id));
      alert("Visita apagada!");
    } catch (err) {
      console.error("Failed to delete visit", err);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="flex justify-center text-2xl font-bold mb-6">📅 Calendário de Visitas 📅</h1>

        <Calendar
          onChange={(value) => setValue(value as Date)}
          value={value}
          locale="pt"
          className="rounded-md shadow-md p-4 text-center"
          formatMonthYear={(locale, date) =>
            format(date, "MMMM 'de' yyyy", { locale: pt })
          }
          tileClassName={({ date, view }) => {
            let classes = "flex flex-col justify-center items-center";
            if (view === "month" && date.getMonth() !== value.getMonth()) {
              classes += " text-gray-400";
            }
            return classes;
          }}
          tileContent={({ date, view }) => {
            if (view === "month") {
              const hasVisit = visits.some(
                (v) => format(v.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
              );
              return hasVisit ? (
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1" />
              ) : null;
            }
            return null;
          }}
        />

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Visitas {format(value, "'a' d 'de' MMMM", { locale: pt })}:
          </h2>
          {visitsForDate.length === 0 ? (
            <p className="text-gray-500">Sem visitas.</p>
          ) : (
            <ul className="space-y-2">
              {visitsForDate.map((v) => (
                <li
                key={v.id}
                className="border p-3 rounded-md shadow-sm flex justify-between items-center"
              >
                <div className="flex-1">
                  <span className="text-base">
                    <strong>{v.name}</strong> às {v.time}
                  </span>
                </div>
                <button
                  onClick={() => deleteVisit(v.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Apagar
                </button>
              </li>
              ))}
            </ul>
          )}

          <button
            onClick={() => router.push("/visit-form")}
            className="mt-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            ➕ Adicionar Visita
          </button>
        </div>
      </div>
    </div>
  );
}
