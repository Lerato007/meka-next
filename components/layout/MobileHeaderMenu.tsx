"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import {
  useEffect,
  useRef,
  useState,
} from "react"
import { usePathname } from "next/navigation"

type MobileHeaderMenuProps = {
  isSignedIn: boolean
  isAdmin: boolean
  firstName: string
  signOutAction: () => Promise<void>
}

export default function MobileHeaderMenu({
  isSignedIn,
  isAdmin,
  firstName,
  signOutAction,
}: MobileHeaderMenuProps) {
  const [isOpen, setIsOpen] =
    useState(false)

  const pathname = usePathname()

  const menuButtonRef =
    useRef<HTMLButtonElement>(null)

  const menuRef =
    useRef<HTMLElement>(null)

  const wasOpenRef =
    useRef(false)

  /*
   * Close the mobile menu whenever
   * navigation changes the current route.
   */
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  /*
   * Prevent the page behind the mobile
   * navigation from scrolling while the
   * menu is open.
   */
  useEffect(() => {
    document.body.style.overflow =
      isOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  /*
   * Keyboard accessibility:
   *
   * Escape closes the menu.
   */
  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    )

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      )
    }
  }, [isOpen])

  /*
   * Move keyboard focus into the menu
   * when it opens.
   *
   * When it closes, return focus to the
   * hamburger button.
   */
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true

      requestAnimationFrame(() => {
        const firstFocusableElement =
          menuRef.current?.querySelector<
            HTMLElement
          >(
            'a[href], button:not([disabled])'
          )

        firstFocusableElement?.focus()
      })

      return
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false
      menuButtonRef.current?.focus()
    }
  }, [isOpen])

  return (
    <>
      <button
        ref={menuButtonRef}
        type="button"
        onClick={() =>
          setIsOpen(
            (current) => !current
          )
        }
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
        aria-label={
          isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? (
          <X
            className="h-5 w-5"
            aria-hidden="true"
          />
        ) : (
          <Menu
            className="h-5 w-5"
            aria-hidden="true"
          />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-[69px] z-50 border-t border-gray-200 bg-white shadow-lg md:hidden">
          <nav
            ref={menuRef}
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mx-auto flex max-h-[calc(100vh-69px)] max-w-7xl flex-col overflow-y-auto px-4 py-5"
          >
            <MobileLink
              href="/"
              currentPath={pathname}
            >
              Home
            </MobileLink>

            <MobileLink
              href="/products"
              currentPath={pathname}
            >
              Shop
            </MobileLink>

            {isAdmin && (
              <MobileLink
                href="/admin"
                currentPath={pathname}
              >
                Admin
              </MobileLink>
            )}

            {isSignedIn ? (
              <>
                <MobileLink
                  href="/account"
                  currentPath={pathname}
                >
                  My Account
                </MobileLink>

                <MobileLink
                  href="/account/orders"
                  currentPath={pathname}
                >
                  Orders
                </MobileLink>

                <MobileLink
                  href="/account/wishlist"
                  currentPath={pathname}
                >
                  Wishlist
                </MobileLink>

                <MobileLink
                  href="/account/addresses"
                  currentPath={pathname}
                >
                  Addresses
                </MobileLink>

                <div
                  className="my-4 border-t border-gray-200"
                  aria-hidden="true"
                />

                <p className="mb-3 px-3 text-sm text-gray-500">
                  Signed in as {firstName}
                </p>

                <form
                  action={signOutAction}
                >
                  <button
                    type="submit"
                    className="w-full rounded-xl border border-red-200 px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <div
                  className="my-4 border-t border-gray-200"
                  aria-hidden="true"
                />

                <MobileLink
                  href="/login"
                  currentPath={pathname}
                >
                  Login
                </MobileLink>

                <Link
                  href="/register"
                  className="btn-primary mt-3 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  )
}

type MobileLinkProps = {
  href: string
  children: React.ReactNode
  currentPath: string
}

function MobileLink({
  href,
  children,
  currentPath,
}: MobileLinkProps) {
  const isCurrentPage =
    href === "/"
      ? currentPath === "/"
      : currentPath === href ||
        currentPath.startsWith(
          `${href}/`
        )

  return (
    <Link
      href={href}
      aria-current={
        isCurrentPage
          ? "page"
          : undefined
      }
      className={`rounded-xl px-3 py-3 text-base font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-inset ${
        isCurrentPage
          ? "bg-gray-100 text-gray-950"
          : "text-gray-800 hover:bg-gray-100 hover:text-gray-950"
      }`}
    >
      {children}
    </Link>
  )
}