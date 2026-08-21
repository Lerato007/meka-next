import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | MekaWC",
  description:
    "Read the terms and conditions that apply when using the MekaWC online store.",
}

export default function TermsPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Legal
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
          Terms & Conditions
        </h1>

        <div className="mt-10 space-y-10 text-base leading-8 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Using Our Store
            </h2>
            <p className="mt-3">
              By using the MekaWC website, you agree to use the store lawfully
              and to provide accurate information when creating an account or
              placing an order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Products and Availability
            </h2>
            <p className="mt-3">
              Product availability may change without notice. We aim to display
              product information, pricing and images accurately, but minor
              differences may occur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Orders
            </h2>
            <p className="mt-3">
              An order is only considered confirmed once the required payment
              has been successfully processed. We reserve the right to cancel
              orders where payment fails, stock is unavailable or incorrect
              information has been supplied.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Payments
            </h2>
            <p className="mt-3">
              Payments are processed securely through PayFast. Customers are
              responsible for ensuring that payment information provided during
              checkout is accurate and authorised.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Delivery
            </h2>
            <p className="mt-3">
              Delivery estimates are provided as a guide and may vary depending
              on location, courier availability and circumstances outside our
              control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Website Content
            </h2>
            <p className="mt-3">
              MekaWC branding, product images, text and other website content
              may not be copied, reproduced or used commercially without
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Changes to These Terms
            </h2>
            <p className="mt-3">
              We may update these terms when necessary. Continued use of the
              website after changes are published constitutes acceptance of the
              updated terms.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}