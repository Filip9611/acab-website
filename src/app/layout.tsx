import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://allcarsallbikes.ch";
const SITE_TITLE = "ACAB Garage Malters";
const SITE_DESCRIPTION =
  "Ihre Autowerkstatt in Malters. All Car's All Bike's Garage für Mechanik, Spenglerei & Lack, Aufbereitung, KFZ-Service und Autohandel.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Autowerkstatt Malters",
    "Garage Malters",
    "Spenglerei Malters",
    "Carrosserie Malters",
    "Lackierarbeiten Luzern",
    "Autohandel Malters",
    "Occasionen Luzern",
    "Motorrad Werkstatt Luzern",
    "MFK Vorbereitung",
    "KFZ-Service",
    "All Car's All Bike's",
    "All Cars All Bikes",
    "ACAB Garage",
  ],
  authors: [{ name: "ACAB All Car's All Bike's GmbH" }],
  creator: "ACAB All Car's All Bike's GmbH",
  publisher: "ACAB All Car's All Bike's GmbH",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: SITE_URL,
    siteName: "ACAB All Car's All Bike's",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ACAB All Car's All Bike's Garage Malters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    // google: "GOOGLE_VERIFICATION_TOKEN",  // TODO: Google Search Console-Token eintragen
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${SITE_URL}/#organization`,
  name: "ACAB All Car's All Bike's GmbH",
  alternateName: "ACAB Garage",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/og-image.jpg`,
  telephone: "+41798691304",
  email: "acab.garage@hotmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Eistrasse 3",
    addressLocality: "Malters",
    postalCode: "6102",
    addressRegion: "LU",
    addressCountry: "CH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.038,
    longitude: 8.192,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:30",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Malters" },
    { "@type": "City", name: "Luzern" },
    { "@type": "AdministrativeArea", name: "Kanton Luzern" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "1",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Leistungen",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Mechanik" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Spenglerei & Lack" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Aufbereitung" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "KFZ-Service" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "MFK-Vorbereitung" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Autohandel" },
      },
    ],
  },
  sameAs: [
    // TODO: Social-Media-URLs eintragen sobald vorhanden
    // "https://www.facebook.com/...",
    // "https://www.instagram.com/...",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-black text-white antialiased">
        <a href="#main" className="skip-link">
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
