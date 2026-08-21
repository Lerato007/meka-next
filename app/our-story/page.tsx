import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Story | MekaWC",
  description:
    "Discover the story behind MekaWC and the vision behind the brand.",
}

export default function OurStoryPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          About MekaWC
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
          Our Story
        </h1>

        <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-gray-600">
          <p>
            MekaWC is a contemporary streetwear brand built around confidence,
            individuality and self-expression. Every piece is designed to feel
            effortless while still making a statement.
          </p>

          <p>
            Our approach combines clean silhouettes, bold details and wearable
            everyday style. We believe clothing should feel personal, versatile
            and true to the person wearing it.
          </p>

          <p>
            MekaWC continues to grow with a focus on creating distinctive
            pieces, building a strong community and developing a brand that
            represents originality and modern South African streetwear.
          </p>
        </div>
      </section>
    </main>
  )
}