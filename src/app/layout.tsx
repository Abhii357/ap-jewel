import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AP Jewel | Premium Gold & Diamond Jewelry in Munger, Bihar",
  description: "Explore exquisite gold and diamond jewelry at AP Jewel, the most trusted jewelry brand in Munger, Bihar. Certified craftsmanship, BIS hallmarked gold, and premium designs.",
  keywords: ["AP Jewel", "Jewelry Munger", "Gold Jewelry Bihar", "Diamond Rings Munger", "Bridal Jewelry Bihar", "BIS Hallmarked Gold Munger", "Luxury Jewelry India"],
  openGraph: {
    title: "AP Jewel | Premium Gold & Diamond Jewelry in Munger, Bihar",
    description: "Discover our premium bridal collections, daily wear gold ornaments, and certified diamonds. Crafted with precision and elegance.",
    type: "website",
    locale: "en_IN",
    siteName: "AP Jewel",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-luxury-black font-sans">
        {children}
      </body>
    </html>
  );
}
