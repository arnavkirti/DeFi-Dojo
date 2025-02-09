import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrivyProvider } from "@/components/providers/PrivyProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";
import "@coinbase/onchainkit/styles.css"
import { Providers } from "@/coinbaseProvider";
import { cookieToInitialState } from 'wagmi';

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
  // const initialState = cookieToInitialState(
  //   getConfig(),
  //   headers().get('cookie')
  // );
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <PrivyProvider>
            <Navbar />
            {children}
          </PrivyProvider>
        </Providers>
      </body>
    </html>
  );
}
