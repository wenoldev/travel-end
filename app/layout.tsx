import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Thoothukudi Travels | Travelend - Best Taxi Service in Tamil Nadu",
    template: "%s | Travelend"
  },
  description: "Travelend is the premier travel agency in Thoothukudi, serving all of Tamil Nadu. We offer reliable cab bookings, custom tour packages, and premium taxi services in Tuticorin.",
  keywords: ["Thoothukudi travels", "Tuticorin travels", "best travels in Thoothukudi", "cab booking Thoothukudi", "taxi service Tuticorin", "Tamil Nadu tours", "Travelend"],
  authors: [{ name: "Travelend" }],
  creator: "Travelend",
  publisher: "Travelend",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Thoothukudi Travels | Travelend - Best Taxi Service",
    description: "Premium cab bookings and custom tour packages in Thoothukudi and all over Tamil Nadu.",
    url: "https://travelend.in",
    siteName: "Travelend",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thoothukudi Travels | Travelend",
    description: "Reliable taxi services and custom tour packages in Tuticorin, Tamil Nadu.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
