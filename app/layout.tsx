import type { Metadata } from "next"

import AuthProvider from "@/components/auth/AuthProvider"
import { CartProvider } from "@/components/cart/CartProvider"
import Header from "@/components/layout/Header"

import "./globals.css"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.APP_URL ||
  "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "MekaWC | Clothing & Lifestyle",
    template: "%s | MekaWC",
  },

  description:
    "Shop clothing and lifestyle products from Meka.WC. Discover quality fashion and everyday essentials available online in South Africa.",

  keywords: [
    "MekaWC",
    "South African clothing",
    "online clothing store South Africa",
    "fashion South Africa",
    "lifestyle products",
    "online shopping South Africa",
  ],

  authors: [
    {
      name: "MekaWC",
    },
  ],

  creator: "MekaWC",
  publisher: "MekaWC",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "/",
    siteName: "MekaWC",
    title: "MekaWC | Clothing & Lifestyle",
    description:
      "Shop clothing and lifestyle products from Meka.WC.",
    images: [
      {
        url: "/mekalogo.png",
        alt: "MekaWC",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MekaWC | Clothing & Lifestyle",
    description:
      "Shop clothing and lifestyle products from Meka.WC.",
    images: ["/mekalogo.png"],
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
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
    >
      <body className="bg-gray-50 antialiased">
        <AuthProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />

              <main className="flex-1">
                {children}
              </main>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}