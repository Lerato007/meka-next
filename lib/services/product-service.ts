import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { sendLowStockAlertEmail } from "@/lib/email/send/low-stock-alert"

export type ProductSort =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"

export type GetProductsOptions = {
  categoryId?: string
  categorySlug?: string
  search?: string
  sort?: ProductSort
  minPrice?: number
  maxPrice?: number
  page?: number
  pageSize?: number
}

function buildProductWhereClause(
  options: GetProductsOptions
): Prisma.ProductWhereInput {
  const { categoryId, categorySlug, search, minPrice, maxPrice } = options
  const searchTerm = search?.trim()

  const where: Prisma.ProductWhereInput = {}

  if (categoryId) {
    where.categoryId = categoryId
  }

  if (categorySlug) {
    where.category = {
      name: {
        equals: categorySlug,
        mode: "insensitive",
      },
    }
  }

  if (searchTerm) {
    where.OR = [
      {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    ]
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {
      ...(minPrice !== undefined ? { gte: minPrice } : {}),
      ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
    }
  }

  return where
}

function getProductOrderBy(sort: ProductSort) {
  switch (sort) {
    case "price-asc":
      return {
        price: "asc" as const,
      }

    case "price-desc":
      return {
        price: "desc" as const,
      }

    case "name-asc":
      return {
        name: "asc" as const,
      }

    case "name-desc":
      return {
        name: "desc" as const,
      }

    default:
      return {
        createdAt: "desc" as const,
      }
  }
}

export async function countProducts(options: GetProductsOptions = {}) {
  return prisma.product.count({
    where: buildProductWhereClause(options),
  })
}

export async function getProducts(options: GetProductsOptions = {}) {
  const { sort = "newest", page = 1, pageSize = 12 } = options

  return prisma.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: buildProductWhereClause(options),
    include: {
      category: true,
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: getProductOrderBy(sort),
  })
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
  })
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
  })
}

export async function checkAndAlertLowStock(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      stock: true,
      lowStockThreshold: true,
    },
  })

  if (product && product.stock <= product.lowStockThreshold) {
    await sendLowStockAlertEmail({
      productName: product.name,
      productId: product.id,
      currentStock: product.stock,
      threshold: product.lowStockThreshold,
    })
  }
}