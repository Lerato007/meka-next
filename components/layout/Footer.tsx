import Link from "next/link"
import { Mail } from "lucide-react"
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">MekaWC</h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Contemporary streetwear designed with confidence, identity, and
              everyday expression in mind.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Customer Service
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/shipping"
                  className="transition hover:text-white"
                >
                  Shipping Information
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              About
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/our-story"
                  className="transition hover:text-white"
                >
                  Our Story
                </Link>
              </li>
            </ul>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Contact
            </h3>
            

            <ul className="mt-4 space-y-3 text-sm text-gray-400">
                <li>
    <Link
      href="/contact"
      className="transition hover:text-white"
    >
      Contact Us
    </Link>
  </li>
              <li>
                <a
                  href="https://wa.me/27815885098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  +27 81 588 5098
                </a>
              </li>

              <li>
                <a
                  href="mailto:support@mekawc.co.za"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  support@mekawc.co.za
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Follow Us
            </h3>

            <div className="mt-4 flex items-center gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-gray-700 p-2 text-gray-300 transition hover:border-gray-500 hover:text-white"
              >
                <FaInstagram className="h-5 w-5" />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-gray-700 p-2 text-gray-300 transition hover:border-gray-500 hover:text-white"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6">
          <div className="flex flex-col gap-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} MekaWC. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition hover:text-white"
              >
                Terms & Conditions
              </Link>

              <span className="text-gray-600">
                Secure payments powered by PayFast
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}