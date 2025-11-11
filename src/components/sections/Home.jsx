import Hero from '../Hero'

export default function Home(){
  return (
    <div>
      <Hero />
      <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold">Vrijstad × Bandung</h2>
          <p className="mt-3 text-white/70">From the Dutch word for “Free City”, Vrijstad is inspired by Bandung: a creative hub where street culture and craftsmanship collide. Our pieces are designed for motion — built with quality, shaped by minimal forms, and finished with subtle luxury.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded p-6">
          <h3 className="font-medium mb-2">Limited Drops</h3>
          <p className="text-white/70">Stay tuned for seasonal capsules and city-inspired collaborations.</p>
          <a href="/shop" className="inline-block mt-4 underline hover:text-white">Explore the shop →</a>
        </div>
      </section>
    </div>
  )
}
