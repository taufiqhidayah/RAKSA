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
  title: "Emergency Information — raksa",
  description: "Emergency information for raksa wearers.",
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
      className={`${inter.variable} min-h-dvh bg-[#EDE9FE] text-[#111827] tracking-[-0.012em] [font-family:var(--font-public),ui-sans-serif,system-ui,sans-serif]`}
    >
      {children}
    </div>
  );
}
