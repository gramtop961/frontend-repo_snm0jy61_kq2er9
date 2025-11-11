import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL

export default function Product(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(()=>{ (async()=>{
    const res = await fetch(`${API}/api/products/${id}`)
    const data = await res.json()
    setProduct(data)
  })() },[id])

  if(!product) return <div className="max-w-6xl mx-auto px-4 py-12">Loading…</div>

  const addToCart = ()=>{
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    cart.push({product_id: product.id, quantity: 1})
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart')
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      <div className="bg-white/5 rounded border border-white/10 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
      </div>
      <div>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <div className="text-white/60 mt-2">Rp {Number(product.price).toLocaleString('id-ID')}</div>
        <p className="mt-4 text-white/80">{product.description}</p>
        <button onClick={addToCart} className="mt-6 px-6 py-3 bg-[#C2A661] text-black rounded">Add to Cart</button>
      </div>
    </section>
  )
}
