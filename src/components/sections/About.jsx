export default function About(){
  return (
    <section className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-semibold">About Vrijstad</h1>
      <p className="mt-4 text-white/70">Born in Bandung, Vrijstad takes its name from the Dutch word for “Free City”. We craft minimalist streetwear with a subtle luxury edge — inspired by the city’s creative pulse and designed for motion.</p>
      <div className="mt-8 space-y-4">
        <div className="border border-white/10 rounded p-4">
          <div className="font-medium">2022</div>
          <p className="text-white/70">Concept sketched in a small studio in Dago. Early prototypes and local sourcing.</p>
        </div>
        <div className="border border-white/10 rounded p-4">
          <div className="font-medium">2023</div>
          <p className="text-white/70">First capsule launched. Community pop-ups across Bandung.</p>
        </div>
        <div className="border border-white/10 rounded p-4">
          <div className="font-medium">2024</div>
          <p className="text-white/70">Expanding collections, refined fits, and editorial storytelling.</p>
        </div>
      </div>
    </section>
  )
}
