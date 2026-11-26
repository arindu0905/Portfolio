import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import Background from "@/components/hud/Background";
import Cursor from "@/components/hud/Cursor";
import MagneticField from "@/components/hud/MagneticField";
import Terminal from "@/components/hud/Terminal";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["500", "700", "900"], display: "swap", variable: "--font-orbitron" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], display: "swap", variable: "--font-jetbrains" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#03060d",
};

const description =
  "Portfolio of Arindu Mandinu Wanigasekara — Information Systems Engineering undergraduate, full stack developer and AI/ML enthusiast from Sri Lanka.";

export const metadata: Metadata = {
  title: {
    default: "Arindu Mandinu Wanigasekara | Full Stack Developer",
    template: "%s | Arindu Wanigasekara",
  },
  description,
  keywords: [
    "Arindu Wanigasekara", "Software Developer", "Full Stack Developer", "Information Systems Engineering",
    "AI ML", "React", "Next.js", "Spring Boot", "Sri Lanka", "Portfolio",
  ],
  authors: [{ name: "Arindu Mandinu Wanigasekara" }],
  creator: "Arindu Mandinu Wanigasekara",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Arindu Mandinu Wanigasekara | Full Stack Developer",
    description,
    siteName: "arindu.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arindu Mandinu Wanigasekara | Full Stack Developer",
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jetbrains.variable}`}>
      <body>
        <Background />
        <Navbar />
        {children}
        <Footer />
        <Terminal />
        <Cursor />
        <MagneticField />
      </body>
    </html>
  );
}
