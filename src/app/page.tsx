"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your App",
  icons: {
    icon: "/favicon.ico",
  },
};

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
