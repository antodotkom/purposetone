import type { Metadata } from "next";
import { Caveat, Fredoka, Nunito } from "next/font/google";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import {
  FOOTER_LINE,
  HERO_LINE,
  HERO_SUB,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${HERO_LINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: HERO_SUB,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${HERO_LINE}`,
    description: FOOTER_LINE,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${HERO_LINE}`,
    description: HERO_SUB,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${fredoka.variable} ${nunito.variable} ${caveat.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-paper font-body text-ink-soft">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
