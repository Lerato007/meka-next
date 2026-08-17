import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.APP_URL ||
    "http://localhost:3000"

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/products", "/products/"],
      disallow: [
        "/admin/",
        "/account/",
        "/api/",
        "/checkout",
        "/cart",
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/payment/",
        "/orders/",
      ],
    },

    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}