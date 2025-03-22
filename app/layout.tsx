import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background antialiased text-black",
          GeistSans.variable
        )}
      >
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="light container mx-auto pt-0 md:pt-16 px-4 md:px-6 flex-grow h-full">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-4 text-xs text-secondary shadow-inner opacity-60">
              Designed & Developed by&nbsp;
              <a
                href="https://rydzkowska.eu"
                target="_blank"
                rel="noreferrer"
                className="hover:font-semibold hover:px-1 smooth"
              >
                Aleks Rydzkowska
              </a>
              {/* &nbsp;from&nbsp;{" "}
              <a
                href="https://visual-riot.com"
                target="_blank"
                rel="noreferrer"
                className="hover:font-semibold hover:px-1 smooth"
              >
                Visual Riot
              </a> */}
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
