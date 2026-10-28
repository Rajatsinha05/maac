import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAAC — Maya Academy of Advanced Creativity",
  description:
    "Creative careers that click. Train in animation, VFX, gaming, and digital content at MAAC. CareerX & CreatorX pathways, MESC & NSDC recognized. Bharat Creator Scholarship up to 35% till 31 October 2026.",
  keywords: [
    "MAAC",
    "animation courses after 12th",
    "VFX courses",
    "game design",
    "Maya Academy of Advanced Creativity",
    "CareerX",
    "CreatorX",
    "multimedia courses",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jakarta.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-dark font-sans text-[15px] leading-relaxed text-zinc-100 antialiased sm:text-base">
        {children}
      </body>
    </html>
  );
}
