export default function Hero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-60"
           style={{backgroundImage:'url(https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjI4MTk5MTl8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80)', backgroundSize:'cover', backgroundPosition:'center'}} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
      <div className="relative z-10 text-center px-6">
        <div className="text-4xl md:text-6xl font-bold tracking-tight">Freedom in Motion</div>
        <p className="mt-4 text-white/80 max-w-2xl mx-auto">Bandung-born streetwear blending heritage with forward design. Minimal, bold, timeless.</p>
        <a href="/shop" className="inline-block mt-8 px-6 py-3 bg-[#C2A661] text-black rounded hover:opacity-90 transition">Shop Now</a>
      </div>
    </section>
  )
}
