import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { AuthModalProvider } from "@/components/providers/AuthModalProvider";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Woosh | Doorstep Vehicle Care",
  description:
    "Premium doorstep vehicle wash and care. Clean. Fast. Smart. Car, bike, auto, monthly packages, and daily cleaning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
        <AuthModalProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthModalProvider>
      </body>
    </html>
  );
}
