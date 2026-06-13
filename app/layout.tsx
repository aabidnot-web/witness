import type { Metadata } from "next";
import { Instrument_Serif, Libre_Caslon_Text } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const libreCaslonText = Libre_Caslon_Text({
  variable: "--font-libre-caslon",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WITNESS — The Trust Layer for Breaking News",
  description:
    "Cross-verify breaking news, identify conflicting narratives, and understand what is actually happening in real time. WITNESS reveals the full story across sources, regions, and perspectives.",
  keywords: [
    "news verification",
    "narrative intelligence",
    "media analysis",
    "fact verification",
    "source comparison",
    "breaking news",
    "trust",
  ],
  openGraph: {
    title: "WITNESS — The Trust Layer for Breaking News",
    description:
      "Every publisher tells a version. WITNESS reveals the full narrative.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${libreCaslonText.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
