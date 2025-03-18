import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { jetBrainsMono } from "@/config/fonts";

import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head />
      <body
        className={clsx("min-h-screen bg-background antialiased text-black")}
      >
        <Providers>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="light container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              Footer
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
