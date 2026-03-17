import { Metadata } from "next";
import TaxiTariffClient from "./TaxiTariffClient";

export const metadata: Metadata = {
  title: "Taxi Tariff Thoothukudi | Cab Booking Rates Tuticorin",
  description: "Check the latest taxi tariff for Thoothukudi and Tuticorin. Affordable and transparent pricing for sedan, SUV, and Innova cab bookings.",
  keywords: ["taxi tariff Thoothukudi", "cab booking rates Tuticorin", "thootukudi taxi charges", "tuticorin cab price"],
  alternates: {
    canonical: "https://travelend.in/taxi-tariff",
  },
};

export default function TaxiTariffPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Taxi Service Thoothukudi",
    "serviceType": "Cab Booking",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Travelend",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Thoothukudi",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      }
    },
    "areaServed": "Thoothukudi",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Taxi Tariffs",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sedan Cab Booking"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SUV Cab Booking"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TaxiTariffClient />
    </>
  );
}
