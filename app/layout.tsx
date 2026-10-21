import type { Metadata } from "next";
import { Fraunces, Figtree, Shantell_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const shantellSans = Shantell_Sans({
  subsets: ["latin"],
  variable: "--font-shantell",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
  description:
    "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.",
  applicationName: "TeddyPups U.A.E.",
  metadataBase: new URL("https://puppy.instabizweb.com"),
  openGraph: {
    title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
    description:
      "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.",
    images: ["/brand/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
    description:
      "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.",
    images: ["/brand/logo.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  other: {
    "theme-color": "#fffdf8",
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
      className={`${fraunces.variable} ${figtree.variable} ${shantellSans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
