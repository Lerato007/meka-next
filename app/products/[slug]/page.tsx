import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { auth } from "@/auth"

import WishlistButton from "@/components/products/WishlistButton"
import ReviewForm from "@/components/reviews/ReviewForm"
import ReviewList from "@/components/reviews/ReviewList"
import StarRating from "@/components/reviews/StarRating"
import BackToProductsButton from "@/components/products/BackToProductsButton"

import { getProductBySlug } from "@/lib/services/product-service"
import {
  getAverageRating,
  getProductReviews,
  getUserReview,
} from "@/lib/services/review-service"
import { isProductInWishlist } from "@/lib/services/wishlist-service"

import AddToCartButton from "./AddToCartButton"
import ProductImageGallery from "./ProductImageGallery"

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string
  }>
}

function createMetaDescription(
  description: string
) {
  const cleanDescription = description
    .replace(/\s+/g, " ")
    .trim()

  if (cleanDescription.length <= 155) {
    return cleanDescription
  }

  return `${cleanDescription.slice(0, 152).trim()}...`
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { slug } = await params

  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const description = createMetaDescription(
    product.description
  )

  const productUrl = `/products/${product.slug}`

  const productImage =
    product.images[0]?.url ?? "/mekalogo.png"

  return {
    title: product.name,

    description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      type: "website",
      title: `${product.name} | MekaWC`,
      description,
      url: productUrl,
      siteName: "MekaWC",
      locale: "en_ZA",
      images: [
        {
          url: productImage,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | MekaWC`,
      description,
      images: [productImage],
    },

    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params

  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const session = await auth()
  const userId = session?.user?.id

  const [
    ratingSummary,
    reviews,
    initialWishlisted,
    userReview,
  ] = await Promise.all([
    getAverageRating(product.id),

    getProductReviews(product.id),

    userId
      ? isProductInWishlist(
          userId,
          product.id
        )
      : Promise.resolve(false),

    userId
      ? getUserReview(
          userId,
          product.id
        )
      : Promise.resolve(null),
  ])

  const formattedPrice =
    new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(Number(product.price))

  const isOutOfStock =
    product.stock <= 0

  const isLowStock =
    product.stock > 0 &&
    product.stock <=
      product.lowStockThreshold

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.APP_URL ||
    "http://localhost:3000"

  const productUrl =
    `${siteUrl}/products/${product.slug}`

  const productImages =
    product.images.map(
      (image) => image.url
    )

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.name,

    description:
      product.description,

    sku: product.id,

    category:
      product.category.name,

    image:
      productImages.length > 0
        ? productImages
        : [
            `${siteUrl}/mekalogo.png`,
          ],

    brand: {
      "@type": "Brand",
      name: "MekaWC",
    },

    offers: {
      "@type": "Offer",

      url: productUrl,

      priceCurrency: "ZAR",

      price: Number(
        product.price
      ).toFixed(2),

      availability:
        isOutOfStock
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",

      itemCondition:
        "https://schema.org/NewCondition",
    },

    ...(ratingSummary.count > 0
      ? {
          aggregateRating: {
            "@type":
              "AggregateRating",

            ratingValue:
              ratingSummary.average.toFixed(
                1
              ),

            reviewCount:
              ratingSummary.count,
          },
        }
      : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd
          ).replace(/</g, "\\u003c"),
        }}
      />

      <section className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-600"
          >
            <Link
              href="/products"
              className="transition hover:text-gray-950"
            >
              Products
            </Link>

            <span aria-hidden="true">
              /
            </span>

            <span className="text-gray-950">
              {product.name}
            </span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductImageGallery
              images={product.images}
              productName={
                product.name
              }
            />

            <div className="lg:py-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                {
                  product.category
                    .name
                }
              </p>

              <div className="mt-3 flex items-start justify-between gap-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                  {product.name}
                </h1>

                <WishlistButton
                  productId={
                    product.id
                  }
                  initialWishlisted={
                    initialWishlisted
                  }
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <StarRating
                  rating={
                    ratingSummary.average
                  }
                  size="md"
                />

                <span className="text-sm text-gray-600">
                  {ratingSummary.average.toFixed(
                    1
                  )}{" "}
                  (
                  {
                    ratingSummary.count
                  }{" "}
                  {ratingSummary.count ===
                  1
                    ? "review"
                    : "reviews"}
                  )
                </span>
              </div>

              <p className="mt-6 text-3xl font-bold text-gray-950">
                {formattedPrice}
              </p>

              <div className="mt-4">
                {isOutOfStock ? (
                  <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                    Out of stock
                  </span>
                ) : isLowStock ? (
                  <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                    Only{" "}
                    {product.stock}{" "}
                    left
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    In stock
                  </span>
                )}
              </div>

              <div className="my-8 border-t border-gray-200" />

              <div>
                <h2 className="text-lg font-semibold text-gray-950">
                  Product
                  description
                </h2>

                <p className="mt-4 whitespace-pre-line leading-7 text-gray-600">
                  {
                    product.description
                  }
                </p>
              </div>

              <div className="mt-10 rounded-xl bg-white p-5 ring-1 ring-gray-200">
                <p className="font-semibold text-gray-950">
                  Add this product
                  to your cart
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {isOutOfStock
                    ? "This product is currently unavailable."
                    : "You can review quantities before checkout."}
                </p>

                <div className="mt-5">
                  <AddToCartButton
                    product={{
                      id: product.id,
                      name: product.name,
                      slug: product.slug,

                      price: Number(
                        product.price
                      ),

                      imageUrl:
                        product
                          .images[0]
                          ?.url ??
                        null,

                      stock:
                        product.stock,
                    }}
                  />
                </div>
              </div>

              <BackToProductsButton />
            </div>
          </div>

          <section className="mt-16 border-t border-gray-200 pt-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-950">
                Customer reviews
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <StarRating
                  rating={
                    ratingSummary.average
                  }
                  size="lg"
                />

                <p className="text-gray-600">
                  Based on{" "}
                  {
                    ratingSummary.count
                  }{" "}
                  {ratingSummary.count ===
                  1
                    ? "review"
                    : "reviews"}
                </p>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr]">
              <div>
                <ReviewForm
                  productId={
                    product.id
                  }
                  initialRating={
                    userReview?.rating ??
                    0
                  }
                  initialComment={
                    userReview
                      ?.comment ?? ""
                  }
                />
              </div>

              <div>
                <ReviewList
                  reviews={reviews}
                />
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}