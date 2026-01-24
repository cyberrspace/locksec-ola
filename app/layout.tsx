import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// ==========================
// Metadata
export const metadata: Metadata = {
  title: "Locksec",
  description: "Locksec — Secure and reliable digital solutions.",
};

// ==========================
// RootLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="beforeInteractive"
        />

        {children}

        <noscript>
          <div style={{ textAlign: "center", padding: "1rem" }}>
            This app works best with JavaScript enabled.
          </div>
        </noscript>
      </body>
    </html>
  );
}
