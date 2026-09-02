import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface LowStockAlertEmailProps {
  productName: string
  productId: string
  currentStock: number
  threshold: number
}

export const LowStockAlertEmail = ({
  productName = "Sample Apparel Item",
  productId = "prod_123",
  currentStock = 2,
  threshold = 5,
}: LowStockAlertEmailProps) => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.APP_URL ||
    "https://www.mekawc.co.za"

  return (
    <Html>
      <Head />
      <Preview>Low Stock Alert: {productName}</Preview>
      <Body
        style={{
          backgroundColor: "#f6f9fc",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
          }}
        >
          <Heading
            style={{
              color: "#d97706",
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "0",
            }}
          >
            ⚠️ Low Stock Alert
          </Heading>

          <Text style={{ color: "#374151", fontSize: "15px", lineHeight: "1.6" }}>
            The inventory for <strong>{productName}</strong> has dropped to or below its threshold.
          </Text>

          <Hr style={{ borderColor: "#e5e7eb", margin: "20px 0" }} />

          <Section>
            <Text style={{ margin: "6px 0", color: "#4b5563", fontSize: "14px" }}>
              <strong>Product ID:</strong> {productId}
            </Text>
            <Text style={{ margin: "6px 0", color: "#111827", fontSize: "14px" }}>
              <strong>Current Stock:</strong> {currentStock} units remaining
            </Text>
            <Text style={{ margin: "6px 0", color: "#4b5563", fontSize: "14px" }}>
              <strong>Low Stock Threshold:</strong> {threshold} units
            </Text>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "20px 0" }} />

          <Button
            href={`${siteUrl}/admin/products/${productId}/edit`}
            style={{
              backgroundColor: "#111827",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Update Inventory in Admin
          </Button>
        </Container>
      </Body>
    </Html>
  )
}

export default LowStockAlertEmail