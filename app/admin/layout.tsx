import { redirect } from "next/navigation"

import { auth } from "@/auth"

type AdminLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const session = await auth()

  if (!session?.user) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(
        "/admin"
      )}`
    )
  }

  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  return children
}