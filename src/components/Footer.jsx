export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-white/70">
        <div>
          <div className="text-xl font-semibold tracking-widest text-white">VRIJSTAD</div>
          <p className="mt-2">Freedom in Motion. Bandung-born streetwear crafted with intention.</p>
        </div>
        <div>
          <div className="text-white mb-2">Explore</div>
          <ul className="space-y-1">
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/journal" className="hover:text-white">Journal</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/gallery" className="hover:text-white">Gallery</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white mb-2">Connect</div>
          <p>Bandung, Indonesia</p>
          <p className="mt-1">© {new Date().getFullYear()} Vrijstad</p>
        </div>
      </div>
    </footer>
  )
}
