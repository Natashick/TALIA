import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TALIA - Threat Analysis Assistant",
  description: "Advanced AI-powered security analysis tool",
  authors: [{ name: "Natashick", url: "https://github.com/Natashick" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
} 