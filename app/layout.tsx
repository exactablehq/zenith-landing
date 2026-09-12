import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Unique — Premium Car Rental in New York",
  description:
    "Don't deny yourself the pleasure of driving the best premium cars from around the world here and now. Experience luxury vehicle rental in New York with Unique.",
  keywords: "car rental, premium cars, luxury car rental New York, Porsche, exotic car rental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
