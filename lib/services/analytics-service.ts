import { prisma } from "@/lib/prisma"

export type DailySalesData = {
  date: string
  revenue: number
  orders: number
}

export type DashboardAnalytics = {
  totalRevenue: number
  totalOrdersCount: number
  averageOrderValue: number
  chartData: DailySalesData[]
}

export async function getDashboardAnalytics(): Promise<DashboardAnalytics> {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const paidOrders = await prisma.order.findMany({
    where: {
      paymentStatus: "PAID",
      createdAt: { gte: thirtyDaysAgo },
    },
    select: {
      id: true,
      total: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  })

  const totalRevenue = paidOrders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  )
  const totalOrdersCount = paidOrders.length
  const averageOrderValue =
    totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0

  const dailyMap = new Map<
    string,
    { rawDate: string; date: string; revenue: number; orders: number }
  >()

  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const rawDate = d.toISOString().split("T")[0]
    const formattedDate = d.toLocaleDateString("en-ZA", {
      month: "short",
      day: "numeric",
    })

    dailyMap.set(rawDate, {
      rawDate,
      date: formattedDate,
      revenue: 0,
      orders: 0,
    })
  }

  paidOrders.forEach((order) => {
    const rawDate = order.createdAt.toISOString().split("T")[0]
    if (dailyMap.has(rawDate)) {
      const entry = dailyMap.get(rawDate)!
      entry.revenue += Number(order.total)
      entry.orders += 1
    }
  })

  const chartData = Array.from(dailyMap.values()).map(
    ({ date, revenue, orders }) => ({
      date,
      revenue,
      orders,
    })
  )

  return {
    totalRevenue,
    totalOrdersCount,
    averageOrderValue,
    chartData,
  }
}