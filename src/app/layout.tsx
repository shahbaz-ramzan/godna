import "@ant-design/v5-patch-for-react-19";

import "antd/dist/reset.css";
import "../assets/scss/styles.scss";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import React from "react";
import Script from "next/script";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppProviders } from "./providers";

import ThemeProvider from "../theme/themeConfig";
import { ChatbotController } from "../components/ChatbotController";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://godna.ai"),
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
  title: {
    default: "GoDNA | Behavioral Insights in Minutes",
    template: `%s | GoDNA | Behavioral Insights in Minutes`,
  },
  description:
    "GoDNA gives you instant behavioral insights in minutes. Discover your natural style, Work Talent, Financial Behavior, and communication patterns to understand people and make smarter decisions.",
  keywords: [
    "GoDNA",
    "behavioral insights app",
    "personality app",
    "behavioral science",
    "work talent",
    "financial behavior",
    "psychometrics",
    "people insights",
    "natural style",
    "communication styles",
    "DNA Behavior,",
  ],
  verification: {
    google: "google-site-verification=878787878",
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <AppProviders>
            <ThemeProvider>
              {children}
              {/* Script loads once globally; ChatbotController hides widget on /report etc. */}
              <Script
                id="wonderchat-script"
                src="https://app.wonderchat.io/scripts/wonderchat-seo.js"
                strategy="afterInteractive"
                data-name="wonderchat-seo"
                data-address="app.wonderchat.io"
                data-id="cmmaros0d00pnojwesaln26gv"
                data-widget-size="normal"
                data-widget-button-size="normal"
              />
              <ChatbotController />
            </ThemeProvider>
          </AppProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}
