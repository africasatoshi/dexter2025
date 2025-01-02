import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dexter - Your Crypto Safety Companion",
  description: "Welcome to your personal crypto safety guide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
