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
  title: "Storeight — Platform Toko Online Mandiri & Solusi D2C Bebas Komisi Marketplace",
  description:
    "Bangun website toko online mandiri berkecepatan tinggi dengan Next.js 16, 0% potongan fee marketplace, integrasi otomatis QRIS & ekspedisi kurir, serta 100% kedaulatan data pelanggan.",
  keywords: [
    "toko online mandiri",
    "jasa pembuatan toko online",
    "d2c ecommerce indonesia",
    "bikin web olshop",
    "storeight",
    "platform ecommerce tanpa komisi",
    "integrasi qris toko online",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
