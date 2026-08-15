import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MacroMosaic — Complexity and Decidability of Knot-Mosaic Completion",
  description: "Paper, canonical audit, and browser-native verification examples for bounded and unbounded raw standard-eleven knot-mosaic completion.",
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
