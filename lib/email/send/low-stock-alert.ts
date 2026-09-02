import { resend } from "@/lib/email/resend"
import LowStockAlertEmail from "@/lib/email/templates/low-stock-alert"

interface SendLowStockAlertProps {
  productName: string
  productId: string
  currentStock: number
  threshold: number
}

export async function sendLowStockAlertEmail({
  productName,
  productId,
  currentStock,
  threshold,
}: SendLowStockAlertProps) {
  const adminEmail =
    process.env.ADMIN_EMAIL ||
    process.env.RESEND_FROM_EMAIL ||
    "admin@mekawc.co.za"

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "MekaWC <orders@mekawc.co.za>",
      to: adminEmail,
      subject: `⚠️ Low Stock Alert: ${productName}`,
      react: LowStockAlertEmail({
        productName,
        productId,
        currentStock,
        threshold,
      }),
    })
  } catch (error) {
    console.error("Failed to send low stock alert email:", error)
  }
}