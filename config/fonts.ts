// filepath: c:\Users\rydzk\Documents\_Visual Riot\Cyp-Lex\repo\cyp-lex\config\fonts.ts
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { JetBrains_Mono } from "next/font/google";

const fontSans = {
  fontFamily: GeistSans.className,
  subsets: ["latin"],
  variable: "--font-sans",
};

const fontMono = {
  fontFamily: GeistMono.className,
  subsets: ["latin"],
  variable: "--font-mono",
};

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export { fontSans, fontMono, jetBrainsMono };
