import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrivyProvider } from "@/components/providers/PrivyProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeFi-Dojo",
  description: "Learn DeFi with AI-powered mentors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PrivyProvider>
          <Navbar />
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
