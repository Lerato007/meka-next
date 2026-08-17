import Image from "next/image"
import Link from "next/link"

import { auth, signOut } from "@/auth"
import CartButton from "@/components/layout/CartButton"
import MobileHeaderMenu from "@/components/layout/MobileHeaderMenu"

const navLinkClassName =
  "rounded-md transition hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"

export default async function Header() {
  const session = await auth()

  const isSignedIn = Boolean(session?.user)
  const isAdmin = session?.user?.role === "ADMIN"

  const firstName =
    session?.user?.name
      ?.trim()
      .split(" ")[0] || "Customer"

  async function handleSignOut() {
    "use server"

    await signOut({
      redirectTo: "/",
    })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
          aria-label="MekaWC home"
        >
          <Image
            src="/mekalogo.png"
            alt="MekaWC logo"
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-full object-contain"
          />

          <span className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
            MekaWC
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 text-sm font-medium md:flex"
        >
          <Link
            href="/"
            className={navLinkClassName}
          >
            Home
          </Link>

          <Link
            href="/products"
            className={navLinkClassName}
          >
            Shop
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className={navLinkClassName}
            >
              Admin
            </Link>
          )}

          <CartButton />

          {!isSignedIn ? (
            <>
              <Link
                href="/login"
                className={navLinkClassName}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="btn-primary px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/account"
                className="rounded-lg px-3 py-2 text-gray-700 transition hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                aria-label={`Open account dashboard for ${firstName}`}
              >
                Hi, {firstName}
              </Link>

              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="btn-secondary px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                >
                  Logout
                </button>
              </form>
            </>
          )}
        </nav>

        <div
          className="flex items-center gap-2 md:hidden"
          aria-label="Mobile navigation controls"
        >
          <CartButton />

          <MobileHeaderMenu
            isSignedIn={isSignedIn}
            isAdmin={isAdmin}
            firstName={firstName}
            signOutAction={handleSignOut}
          />
        </div>
      </div>
    </header>
  )
}