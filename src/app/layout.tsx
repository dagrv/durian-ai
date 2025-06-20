import type { Metadata } from "next";
import {TRPCReactProvider} from "@/trpc/client";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Durian-AI",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
        <html lang="en">
          <body
            className={`${inter.className} antialiased`}>
            {children}
          </body>
        </html>
    </TRPCReactProvider>
  );
}
