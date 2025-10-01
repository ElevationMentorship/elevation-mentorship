import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Elevation Mentorship",
  description:
    "Transform your mindset, build real skills, and unlock your full potential through direct mentorship.",
  openGraph: {
    title: "Elevation Mentorship",
    description:
      "Transform your mindset, build real skills, and unlock your full potential through direct mentorship.",
    url: "https://elevationmentorship.co.uk",
    siteName: "Elevation Mentorship",
    images: [
      {
        url: "https://elevationmentorship.co.uk/assets/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Elevation Mentorship",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevation Mentorship",
    description:
      "Transform your mindset, build real skills, and unlock your full potential through direct mentorship.",
    images: ["https://elevationmentorship.co.uk/assets/thumbnail.jpg"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
