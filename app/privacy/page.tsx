import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | MekaWC",
  description:
    "Learn how MekaWC collects, uses and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Legal
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
          Privacy Policy
        </h1>

        <div className="mt-10 space-y-10 text-base leading-8 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Information We Collect
            </h2>
            <p className="mt-3">
              When you create an account, place an order or contact MekaWC, we
              may collect information such as your name, email address, phone
              number, delivery address and order details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              How We Use Your Information
            </h2>
            <p className="mt-3">
              We use your information to process orders, manage deliveries,
              provide customer support, maintain your account and send
              transaction-related communications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Payments
            </h2>
            <p className="mt-3">
              Payments are processed through PayFast. MekaWC does not store
              your full card or banking credentials on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Third-Party Services
            </h2>
            <p className="mt-3">
              We may use trusted service providers for payment processing,
              email delivery, hosting, authentication and order fulfilment.
              These providers process information only where required to
              deliver their services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Data Security
            </h2>
            <p className="mt-3">
              We take reasonable technical and organisational measures to
              protect personal information against unauthorised access,
              alteration, disclosure or loss.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Your Information
            </h2>
            <p className="mt-3">
              You may contact MekaWC if you would like assistance with your
              personal information, account details or privacy-related
              questions.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}