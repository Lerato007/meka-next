"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { DailySalesData } from "@/lib/services/analytics-service"

export default function SalesChart({ data }: { data: DailySalesData[] }) {
  const [metric, setMetric] = useState<"revenue" | "orders">("revenue")

  const formatYAxis = (val: number) => {
    if (metric === "revenue") {
      return `R${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`
    }
    return val.toString()
  }

  const formatTooltipValue = (value: number) => {
    if (metric === "revenue") {
      return [
        new Intl.NumberFormat("en-ZA", {
          style: "currency",
          currency: "ZAR",
        }).format(value),
        "Revenue",
      ]
    }
    return [`${value} orders`, "Orders"]
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-950">
            Sales Performance (30 Days)
          </h2>
          <p className="text-sm text-gray-500">
            Daily tracking of total sales and completed orders.
          </p>
        </div>

        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setMetric("revenue")}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              metric === "revenue"
                ? "bg-white text-gray-950 shadow-sm"
                : "text-gray-600 hover:text-gray-950"
            }`}
          >
            Revenue (ZAR)
          </button>
          <button
            onClick={() => setMetric("orders")}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              metric === "orders"
                ? "bg-white text-gray-950 shadow-sm"
                : "text-gray-600 hover:text-gray-950"
            }`}
          >
            Order Volume
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {metric === "revenue" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111827" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#111827" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                tickFormatter={formatYAxis}
              />
              <Tooltip formatter={formatTooltipValue} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#111827"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip formatter={formatTooltipValue} />
              <Bar dataKey="orders" fill="#111827" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}