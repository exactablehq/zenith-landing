import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Zenith — Cab Hailing & Self-Drive Car Rentals in Daman",
  description:
    "Daman's unified mobility platform for on-demand cab hailing and self-drive car rentals across Daman, Vapi, and Silvassa. Backed by 19+ years of trusted fleet infrastructure by Zenith Fleets Pvt. Ltd.",
  keywords:
    "Zenith, Zenith Fleets, cab hailing Daman, self drive car rental Daman, taxi Vapi station to Daman, car rental Daman, Zoomcar Daman, cab service Daman, Jampore beach cabs, Devka beach taxi, Silvassa cabs",
  openGraph: {
    title: "Zenith — Cab Hailing & Self-Drive Car Rentals in Daman",
    description:
      "Daman's unified mobility app for instant on-demand cabs and self-drive car rentals across Daman, Vapi, and Silvassa.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#fdfdfd] text-zinc-900 font-sans selection:bg-zinc-950 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
