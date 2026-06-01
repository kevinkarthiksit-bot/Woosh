import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { HashScrollHandler } from "@/components/HashScrollHandler";
import { AuthModalProvider } from "@/components/providers/AuthModalProvider";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { buildRef, isSiteLive, siteVersion } from "@/lib/build-info";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display-fam",
});

export const metadata: Metadata = {
  title: "Woosh | Doorstep Vehicle Care",
  description:
    "Premium doorstep vehicle wash and care. Clean. Fast. Smart. Car, bike, auto, monthly packages, and daily cleaning.",
  robots: isSiteLive
    ? { index: true, follow: true }
    : { index: false, follow: false },
  other: {
    "site-version": siteVersion,
    "build-ref": buildRef,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${outfit.variable} antialiased`}>
        <a href="#main" className="skip-link focus-ring">
          Skip to main content
        </a>
        <AuthModalProvider>
          <HashScrollHandler />
          <PreviewBanner />
          <Navbar />
          <main id="main" className="pb-20 lg:pb-0">
            {children}
          </main>
          <Footer />
          <MobileBookBar />
        </AuthModalProvider>
      </body>
    </html>
  );
}
