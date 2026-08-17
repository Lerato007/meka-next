"use client"

import { useRouter } from "next/navigation"

export default function BackToProductsButton() {
  const router = useRouter()

  function handleBack() {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push("/products")
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="mt-8 inline-flex rounded-md text-sm font-semibold text-gray-700 transition hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
    >
      ← Back to all products
    </button>
  )
}