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
  const recipientEmail =
    process.env.STORE_OWNER_EMAIL ||
    process.env.EMAIL_TEST_RECIPIENT ||
    process.env.ADMIN_EMAIL

  const senderEmail =
    process.env.EMAIL_FROM ||
    process.env.RESEND_FROM_EMAIL ||
    "MekaWC <onboarding@resend.dev>"

  if (!recipientEmail) {
    console.error("⚠️ Low Stock Alert: No recipient email defined in environment variables.")
    return
  }

  try {
    const data = await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      subject: `⚠️ Low Stock Alert: ${productName}`,
      react: LowStockAlertEmail({
        productName,
        productId,
        currentStock,
        threshold,
      }),
    })

    console.log("Low stock alert email dispatched successfully:", data)
  } catch (error) {
    console.error("Failed to send low stock alert email:", error)
  }
}