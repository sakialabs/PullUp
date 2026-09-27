import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/atkinson-hyperlegible-next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "PullUp | Homes made for chillin' not flipping",
  description:
    "A synthetic technical proof for fair housing discovery, transparent costs, and human support from Sakia Labs.",
  icons: {
    icon: "/brand/hut-static.png",
    shortcut: "/brand/hut-static.png",
    apple: "/brand/hut-static.png",
  },
  openGraph: {
    title: "PullUp",
    description: "Homes made for chillin' not flipping.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PullUp",
    description: "Homes made for chillin' not flipping.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
