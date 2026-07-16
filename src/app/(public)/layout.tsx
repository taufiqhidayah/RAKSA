import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./public.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Informasi Darurat — GelangSiaga",
  description: "Informasi darurat pemakai GelangSiaga.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f3ff",
};

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${inter.variable} min-h-dvh bg-[radial-gradient(circle_at_50%_-8rem,rgba(109,74,255,0.13),transparent_31rem),radial-gradient(circle_at_100%_24rem,rgba(243,238,255,0.9),transparent_25rem),#F8F8FF] text-[#171717] tracking-[-0.012em] [font-family:var(--font-public),ui-sans-serif,system-ui,sans-serif]`}
    >
      {children}
    </div>
  );
}
