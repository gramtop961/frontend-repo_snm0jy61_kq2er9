import { Outlet, Link, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function AppLayout() {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-black text-[#F5F5F5] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet key={location.pathname} />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
