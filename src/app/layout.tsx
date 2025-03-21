import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const poppins_font = localFont({
  src: [
    {
      path: "../fonts/Poppins-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-sans",
});

const dancing_script_font = localFont({
  src: [
    {
      path: "../fonts/DancingScript-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/DancingScript-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-handwritten",
});

export const metadata: Metadata = {
  title: "Sweet Confession",
  description: "Sweet Confession - Aplikasi pengungkapan perasaan digital",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    title: "Sweet Confession",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning={true}
      className={`${poppins_font.variable} ${dancing_script_font.variable} antialiased`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Sweet Confession"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body className={`${poppins_font.variable} ${dancing_script_font.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
