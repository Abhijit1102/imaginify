import type { Metadata } from "next";
import "./globals.css";
import { cn } from "../lib/utils";
import { IBM_Plex_Sans } from "next/font/google";
import AuthProvider from '../context/AuthProvider';

const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-inert-plex",
});

export const metadata: Metadata = {
  title: "Imginification",
  description: "AI-powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
      <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)} style={{ "--color-primary": '#624cf5' } as React.CSSProperties}>
        {children}
      </body>
      </AuthProvider>
    </html>
  );
}
