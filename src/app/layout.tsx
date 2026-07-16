import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GelangSiaga — RAKSA-TAG",
  description:
    "Gelang keselamatan NFC/QR untuk darurat medis, anak hilang, dan keselamatan lansia — bantu orang di sekitar menghubungi keluarga Anda dalam hitungan detik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
