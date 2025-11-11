import { Link, NavLink } from 'react-router-dom'

const navLink = ({ isActive }) =>
  `px-4 py-2 transition-colors ${isActive ? 'text-[#C2A661]' : 'text-[#F5F5F5]/80 hover:text-white'}`

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl tracking-widest font-semibold">
          VRIJSTAD
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <NavLink to="/" className={navLink} end>Home</NavLink>
          <NavLink to="/shop" className={navLink}>Shop</NavLink>
          <NavLink to="/journal" className={navLink}>Journal</NavLink>
          <NavLink to="/about" className={navLink}>About</NavLink>
          <NavLink to="/gallery" className={navLink}>Gallery</NavLink>
          <NavLink to="/cart" className={({isActive}) => `ml-4 px-3 py-1.5 rounded border border-white/10 hover:border-white/30 ${isActive ? 'text-black bg-[#C2A661]' : 'text-white/90'}`}>Cart</NavLink>
        </nav>
      </div>
    </header>
  )
}
