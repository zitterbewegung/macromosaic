import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MacroMosaic — Counting Knot-Mosaic Completions",
  description: "A reproducible computational-topology result and browser-native Python explorer for raw standard-eleven knot mosaics.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
