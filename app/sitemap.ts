import type { MetadataRoute } from "next"

import { prisma } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.APP_URL ||
    "http://localhost:3000"

  const products = await prisma.product.findMany({
    select: {
      slug: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const productPages: MetadataRoute.Sitemap =
    products.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      lastModified: product.createdAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...productPages,
  ]
}