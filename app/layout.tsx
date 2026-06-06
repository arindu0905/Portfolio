import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Arindu Mandinu Wanigasekara | Software Developer & IS Engineer",
  description:
    "Portfolio of Arindu Mandinu Wanigasekara — Information Systems Engineering Undergraduate, Software Developer, and AI & ML Enthusiast from Sri Lanka. Explore my projects, skills, and experience.",
  keywords: [
    "Arindu Wanigasekara",
    "Software Developer",
    "Information Systems Engineering",
    "Full Stack Developer",
    "AI ML",
    "React",
    "Next.js",
    "Sri Lanka",
    "Portfolio",
  ],
  authors: [{ name: "Arindu Mandinu Wanigasekara" }],
  creator: "Arindu Mandinu Wanigasekara",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Arindu Mandinu Wanigasekara | Software Developer",
    description:
      "Information Systems Engineering Undergraduate | Software Developer | AI & ML Enthusiast",
    siteName: "Arindu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arindu Mandinu Wanigasekara | Software Developer",
    description:
      "Information Systems Engineering Undergraduate | Software Developer | AI & ML Enthusiast",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
