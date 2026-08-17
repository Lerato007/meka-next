import { redirect } from "next/navigation"

import { auth } from "@/auth"

import CheckoutClient from "./CheckoutClient"

export default async function CheckoutPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(
        "/checkout"
      )}`
    )
  }

  return <CheckoutClient />
}