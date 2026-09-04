import Image from "next/image"
import Link from "next/link"
import ComingSoonSlider from "@/components/landing/ComingSoonSlider"
import {
  ArrowUpRight,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react"

const collections = [
  {
    title: "New Drop",
    category: "Seasonal Releases",
    description: "Discover the latest limited-run garments and signature cuts.",
    href: "/products?sort=newest",
  },
  {
    title: "Essentials",
    category: "Heavyweight Basics",
    description: "Engineered daily tees, hoodies, and core streetwear staples.",
    href: "/products?category=essentials",
  },
  {
    title: "Accessories",
    category: "Headwear & Gear",
    description: "Finishing touches including signature bucket hats and caps.",
    href: "/products?category=accessories",
  },
]

export default function OfficialLanding() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* --- TOP ANNOUNCEMENT BAR --- */}
      <div className="border-b border-neutral-200 bg-neutral-950 px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-300">
        Official MekaWC Store • PayFast Secure Payments • Express SA Shipping
      </div>

      {/* --- HERO SECTION --- */}
<section className="relative border-b border-neutral-200 bg-white py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
      {/* Hero Copy */}
      <div className="lg:col-span-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-neutral-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          2026 Collection Live
        </div>

        <h1 className="mt-6 text-5xl font-black uppercase tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
          Streetwear <br />
          <span className="text-emerald-600">Refined.</span>
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-600 sm:text-lg">
          Minimalist silhouettes, heavyweight textiles, and tailored daily fits engineered for contemporary street culture.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
  <Link
    href="/products"
    className="inline-flex items-center rounded-full bg-neutral-950 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-neutral-800"
  >
    Shop Collection
  </Link>

  <Link
    href="/register"
    className="inline-flex items-center rounded-full border border-neutral-300 bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-widest text-neutral-950 transition-all hover:bg-neutral-100"
  >
    Create Account
  </Link>
</div>
      </div>

      {/* Visual Emblem Box */}
      <div className="lg:col-span-5">
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
          <Image
            src="/mekalogo.png"
            alt="MekaWC Emblem"
            width={380}
            height={380}
            priority
            className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-neutral-200/80 bg-white/90 p-3 text-center backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              MekaWC Authentic • South Africa
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* --- MINIMAL TRUST TICKER --- */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 stroke-[1.5] text-neutral-700" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  PayFast Encrypted
                </p>
                <p className="text-[11px] text-neutral-500">Secure checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 stroke-[1.5] text-neutral-700" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Doorstep Delivery
                </p>
                <p className="text-[11px] text-neutral-500">Full order tracking</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 stroke-[1.5] text-neutral-700" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Heavyweight Cotton
                </p>
                <p className="text-[11px] text-neutral-500">Premium build quality</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 stroke-[1.5] text-neutral-700" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Simple Exchanges
                </p>
                <p className="text-[11px] text-neutral-500">Hassle-free service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SLIDER SECTION --- */}
      <section className="border-b border-neutral-200 bg-white py-6">
        <ComingSoonSlider />
      </section>

      {/* --- CURATED COLLECTIONS --- */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                Store Catalog
              </p>
              <h2 className="mt-1 text-3xl font-black uppercase tracking-tight text-neutral-950 sm:text-4xl">
                Explore Collections
              </h2>
            </div>

            <Link
              href="/products"
              className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-900 transition hover:text-neutral-600"
            >
              View All Products
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {collections.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-neutral-400 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      {item.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-950" />
                  </div>

                  <h3 className="mt-6 text-2xl font-black uppercase tracking-tight text-neutral-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    {item.description}
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-950">
                  <span>Browse Category</span>
                  <span className="block h-px w-6 bg-neutral-950 transition-all group-hover:w-12" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- BRAND STATEMENT --- */}
      <section className="border-b border-t border-neutral-200 bg-white py-24 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400">
            The MekaWC Ethos
          </p>
          <blockquote className="mt-6 text-2xl font-bold uppercase leading-relaxed tracking-tight text-neutral-950 sm:text-3xl">
            "We design apparel for those who navigate the world with unshakeable confidence, identity, and everyday style."
          </blockquote>
          <div className="mt-8 flex justify-center">
            <span className="h-0.5 w-12 bg-neutral-950" />
          </div>
        </div>
      </section>

      {/* --- MINIMAL CALL TO ACTION --- */}
      <section className="bg-neutral-950 py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400">
            Store Open
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl">
            Find Your Signature Look.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-neutral-400 sm:text-sm">
            Browse the full collection, save your favorites, and enjoy seamless online checkout via PayFast.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/products"
              className="rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-neutral-950 transition hover:bg-neutral-200"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}