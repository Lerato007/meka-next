import type { Metadata } from "next"
import { Mail } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export const metadata: Metadata = {
  title: "Contact | MekaWC",
  description:
    "Contact MekaWC for customer support, order assistance and general enquiries.",
}

export default function ContactPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Customer Support
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
          Contact Us
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
          Need help with an order, delivery or product enquiry? Get in touch
          with the MekaWC team and we will assist you as soon as possible.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <a
            href="https://wa.me/27815885098?text=Hi%20MekaWC%2C%20I%20need%20assistance."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-gray-200 p-6 transition hover:border-gray-400"
          >
            <FaWhatsapp className="h-6 w-6 text-gray-950" />

            <h2 className="mt-4 text-lg font-semibold text-gray-950">
              WhatsApp
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Chat with us directly for quick customer support.
            </p>
          </a>

          <a
            href="mailto:support@mekawc.co.za"
            className="rounded-2xl border border-gray-200 p-6 transition hover:border-gray-400"
          >
            <Mail className="h-6 w-6 text-gray-950" />

            <h2 className="mt-4 text-lg font-semibold text-gray-950">
              Email
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Send us an email for orders, deliveries or general enquiries.
            </p>
          </a>
        </div>
      </section>
    </main>
  )
}