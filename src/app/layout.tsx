import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calendário Visitas",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/png" href="./favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
      <link rel="shortcut icon" href="./favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-status-bar-style" content="yes"></meta>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
