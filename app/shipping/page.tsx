import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping Information | MekaWC",
  description:
    "Learn more about MekaWC order processing, delivery times, tracking and shipping information.",
}

export default function ShippingPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Customer Service
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
            Shipping Information
          </h1>

          <p className="mt-5 text-base leading-7 text-gray-600">
            We want your MekaWC order to reach you safely and as quickly as
            possible. Below you will find information about processing,
            delivery and tracking.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Order Processing
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Orders are processed during business days. Once your order has
              been confirmed and prepared for dispatch, you will receive an
              update with your delivery information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Delivery Times
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Delivery times may vary depending on your location and courier
              availability. Estimated delivery timeframes are calculated from
              the date your order is dispatched, not the date the order is
              placed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Delivery Tracking
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Where tracking is available, you will receive tracking details
              once your order has been handed over to the courier.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Delivery Address
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Please ensure that your delivery address and contact details are
              correct before completing your order. Incorrect or incomplete
              information may result in delivery delays.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Delivery Delays
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Occasionally, deliveries may be delayed due to courier,
              operational, weather or other circumstances outside our control.
              We will do our best to keep you informed where possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-950">
              Need Help?
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              If you need assistance with an order or delivery, contact MekaWC
              through the details provided in the footer.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}