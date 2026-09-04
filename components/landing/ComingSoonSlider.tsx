"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

type ComingSoonItem = {
  id: number
  name: string
  image: string
}

const comingSoonItems: ComingSoonItem[] = [
  // {
  //   id: 1,
  //   name: "FOUR-LTR WORD Tee",
  //   image: "/coming-soon/four-ltr-word.svg",
  // },
  {
    id: 2,
    name: "MekaWC Signature Bucket Hat",
    image: "/coming-soon/headwear-bucket-hat.svg",
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
    <section className="w-full bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                </div>
              </article>
            ))}
          </div>

          {comingSoonItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
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
                    aria-label={`Slide ${index + 1}`}
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