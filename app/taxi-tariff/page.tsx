import { Metadata } from "next";
import TaxiTariffClient from "./TaxiTariffClient";

export const metadata: Metadata = {
  title: "Taxi Tariff Tamil Nadu | Best Cab Booking Rates",
  description: "Check the latest taxi tariff for all over Tamil Nadu. Affordable and transparent pricing for sedan, SUV, and Innova cab bookings.",
  keywords: ["taxi tariff Tamil Nadu", "cab booking rates Tamil Nadu", "Tamil Nadu taxi charges", "intercity cab price"],
  alternates: {
    canonical: "https://travelend.in/taxi-tariff",
  },
};

export default function TaxiTariffPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Taxi Service Tamil Nadu",
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
    "areaServed": "Tamil Nadu",
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
