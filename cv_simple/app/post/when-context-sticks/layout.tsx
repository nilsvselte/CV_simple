import "katex/dist/katex.min.css";
import { Geist } from "next/font/google";

import "./styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function WhenContextSticksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={geistSans.variable}>{children}</div>;
}
