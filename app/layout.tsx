import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

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
      {/* Мы используем inter.className и cn для красивого шрифта и объединения классов */}
      <body className={cn(inter.className, "font-sans antialiased")}>
        {children}
      </body>
    </html>
  );
}