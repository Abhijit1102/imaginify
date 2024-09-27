import type { Metadata } from "next";
import "./globals.css";
import { cn } from "../lib/utils";

import { IBM_Plex_Sans } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import { Variable } from "lucide-react";

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
      <ClerkProvider appearance={{
        variables:{ colorPrimary: '#624cf5'}
      }}>
        <html lang="en">
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
            {children}
          </body>
        </html>
      </ClerkProvider>
  )
};
