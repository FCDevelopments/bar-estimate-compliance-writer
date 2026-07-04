import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BAR Estimate Compliance Writer",
  description:
    "California BAR-focused estimate drafting starter for dealerships and repair shops.",
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
