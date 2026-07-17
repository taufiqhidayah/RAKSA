import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "raksa — Emergency ID band",
  description:
    "An NFC/QR safety band for medical emergencies, lost children, and elderly safety. It helps people around you reach your family in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
