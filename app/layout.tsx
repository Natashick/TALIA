import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TALIA - Threat Analysis Assistant",
  description: "OpenAI powered threat analysis for automotive systems",
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
