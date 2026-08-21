"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

type ComingSoonItem = {
  id: number
  name: string
  description: string
  image: string
}

const comingSoonItems: ComingSoonItem[] = [
  {
    id: 1,
    name: "FOUR-LTR WORD Tee",
    description:
      "Bold streetwear energy with signature MEKA detailing. Coming soon.",
    image: "/coming-soon/four-ltr-word.jpg",
  },
  {
    id: 2,
    name: "MEKA Essential Crop Tee",
    description:
      "Minimal design, relaxed fit and effortless everyday style. Coming soon.",
    image: "/coming-soon/meka-essential.jpg",
  },
]

const SLIDE_INTERVAL = 5000

export default function ComingSoonSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) =>
      current === comingSoonItems.length - 1 ? 0 : current + 1
    )
  }, [])

  const previousSlide = useCallback(() => {
    setCurrentIndex((current) =>
      current === 0 ? comingSoonItems.length - 1 : current - 1
    )
  }, [])

  useEffect(() => {
    if (paused || comingSoonItems.length <= 1) {
      return
    }

    const interval = window.setInterval(nextSlide, SLIDE_INTERVAL)

    return () => window.clearInterval(interval)
  }, [nextSlide, paused])

  return (
    <section
      className="w-full bg-white py-12 sm:py-16"
      aria-labelledby="coming-soon-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              Upcoming Drops
            </p>

            <h2
              id="coming-soon-title"
              className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl"
            >
              Coming Soon
            </h2>
          </div>

          <span className="hidden text-sm text-gray-500 sm:block">
            New pieces loading...
          </span>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl bg-gray-950"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {comingSoonItems.map((item, index) => (
              <article
                key={item.id}
                className="relative min-w-full"
                aria-hidden={currentIndex !== index}
              >
                <div className="relative h-[430px] sm:h-[500px] lg:h-[580px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={index === 0}
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

                  <div className="absolute inset-0 flex items-end sm:items-center">
                    <div className="max-w-2xl p-7 text-white sm:p-12 lg:p-16">
                      <span className="inline-flex rounded-full border border-white/30 bg-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
                        Coming Soon
                      </span>

                      <h3 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        {item.name}
                      </h3>

                      <p className="mt-4 max-w-lg text-sm leading-6 text-white/80 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {comingSoonItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous coming soon product"
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next coming soon product"
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                {comingSoonItems.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Show ${item.name}`}
                    aria-current={currentIndex === index ? "true" : undefined}
                    className={`h-2.5 rounded-full transition-all ${
                      currentIndex === index
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}