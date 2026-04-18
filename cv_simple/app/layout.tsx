import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import {
  DEFAULT_OG_IMAGE_PATH,
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: PERSON_NAME,
  authors: [
    {
      name: PERSON_NAME,
      url: SITE_URL,
    },
  ],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: PERSON_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
        width: 1200,
        height: 630,
        alt: `${PERSON_NAME} website preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE_PATH)],
  },
  icons: {
    icon: [
      { url: "/boat.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: [{ url: "/boat.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
