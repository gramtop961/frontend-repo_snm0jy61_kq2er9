import { Routes, Route } from 'react-router-dom'
import Home from './sections/Home'
import Shop from './sections/Shop'
import Product from './sections/Product'
import Cart from './sections/Cart'
import Journal from './sections/Journal'
import About from './sections/About'
import Gallery from './sections/Gallery'

export default function AppRoutes(){
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="product/:id" element={<Product />} />
      <Route path="cart" element={<Cart />} />
      <Route path="journal" element={<Journal />} />
      <Route path="about" element={<About />} />
      <Route path="gallery" element={<Gallery />} />
    </Routes>
  )
}
