import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// App-wide metadata (replaces head tags from _document.tsx)
export const metadata: Metadata = {
  title: "Locksec",
  description: "Locksec — Secure and reliable digital solutions.",
  manifest: "/manifest.json",
  themeColor: "#DF4F3A",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    title: "Locksec",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Locksec",
    description: "Empowering security and digital trust with Locksec.",
    url: "https://yourdomain.com",
    siteName: "Locksec",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Locksec Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locksec",
    description: "Secure and reliable digital solutions by Locksec.",
    images: ["/icons/icon-512x512.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-white text-slate-900`}
      >
        {/* Paystack Script */}
        <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />

        {children}

        {/* noscript fallback */}
        <noscript>
          <div style={{ textAlign: "center", padding: "1rem" }}>
            This app works best with JavaScript enabled.
          </div>
        </noscript>
      </body>
    </html>
  );
}
