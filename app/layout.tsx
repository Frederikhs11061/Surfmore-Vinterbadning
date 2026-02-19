import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Surfmore Gear Match - Hvad skal jeg bruge til vinterbadning?",
  description: "Find det perfekte udstyr til din vinterbadning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
