import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"

import AddressForm from "@/components/account/address-form"

import { createAddress } from "../actions"

type NewAddressPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function NewAddressPage({
  searchParams,
}: NewAddressPageProps) {
  const { error } = await searchParams

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/account/addresses"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to saved addresses
      </Link>

      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-7 sm:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
              <MapPin className="h-5 w-5 text-neutral-800" />
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                My account
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">
                Add a delivery address
              </h1>

              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Save an address to make future checkouts quicker.
              </p>
            </div>
          </div>
        </div>

        <AddressForm
          action={createAddress}
          mode="create"
          error={error}
        />
      </section>
    </main>
  )
}