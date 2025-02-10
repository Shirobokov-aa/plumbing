// import { SectionsProvider } from "@/contexts/SectionsContext"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from 'next/font/google';
import { Providers } from "./providers";
import "./globals.css";
import HeaderWithData from "@/components/HeaderWithData"
import { SectionsProvider } from './admin/contexts/SectionsContext'
import { getInitialData } from '@/app/actions/sections/getData'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialData = await getInitialData()

  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <SectionsProvider initialData={initialData}>
          <HeaderWithData />
          {children}
        </SectionsProvider>
      </body>
    </html>
  );
}
