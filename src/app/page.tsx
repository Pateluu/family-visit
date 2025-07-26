"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login"); 
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-500">Redirecting...</p>
    </div>
  );
}
