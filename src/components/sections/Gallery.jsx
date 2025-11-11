export default function Gallery(){
  const images = [
    'https://images.unsplash.com/photo-1513366884929-f0b3bedfb653?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544441892-4543f03589fc?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519744346367-3f57fc8d51a4?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?q=80&w=1600&auto=format&fit=crop'
  ]
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Gallery</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src,idx)=> (
          <a key={idx} href={src} target="_blank" rel="noreferrer" className="block overflow-hidden rounded border border-white/10">
            <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition"/>
          </a>
        ))}
      </div>
    </section>
  )
}
