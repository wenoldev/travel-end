import React from 'react';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Travelend",
    "alternateName": "Thoothukudi Travels",
    "image": "https://travelend.in/favicon.png",
    "@id": "https://travelend.in",
    "url": "https://travelend.in",
    "telephone": "+919345605097",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Raj Hotel back side, 6b, 6th street, Toovipuram",
      "addressLocality": "Thoothukudi",
      "postalCode": "628003",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 8.8053,
      "longitude": 78.1348
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.instagram.com/travel_end.in/"
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Thoothukudi"
      },
      {
        "@type": "City",
        "name": "Tuticorin"
      },
      {
        "@type": "State",
        "name": "Tamil Nadu"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
