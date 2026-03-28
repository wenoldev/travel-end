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
    default: "Travelend - Best Travels in Tamil Nadu",
    template: "%s | Travelend"
  },
  description: "Travelend is the leading travel agency serving all over Tamil Nadu. We offer premium cab bookings, custom tour packages, and reliable taxi services across South India.",
  keywords: ["Tamil Nadu travels", "South India tours", "cab booking Tamil Nadu", "taxi service Tamil Nadu", "Travelend Tuticorin", "Thoothukudi travel agency"],
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
    title: "Travelend - Best Travels in Tamil Nadu",
    description: "Reliable cab bookings and custom tour packages all over Tamil Nadu.",
    url: "https://travelend.in",
    siteName: "Travelend",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travelend - Best Travels in Tamil Nadu",
    description: "Reliable cab bookings and custom tour packages all over Tamil Nadu.",
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
