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
    default: "Travelend - Best Travels in Thoothukudi & Tuticorin",
    template: "%s | Travelend"
  },
  description: "Travelend is the leading travel agency in Thoothukudi and Tuticorin. We offer premium cab bookings, custom tour packages, and reliable taxi services across Tamil Nadu.",
  keywords: ["Thoothukudi travels", "Tuticorin travel booking", "cab booking Thoothukudi", "taxi service Tuticorin", "South India tours"],
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
    title: "Travelend - Best Travels in Thoothukudi & Tuticorin",
    description: "Reliable cab bookings and custom tour packages in Thoothukudi and Tuticorin.",
    url: "https://travelend.in",
    siteName: "Travelend",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travelend - Best Travels in Thoothukudi & Tuticorin",
    description: "Reliable cab bookings and custom tour packages in Thoothukudi and Tuticorin.",
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
