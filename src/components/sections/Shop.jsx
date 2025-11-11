import { useEffect, useState } from 'react'
import ProductCard from '../ProductCard'

const API = import.meta.env.VITE_BACKEND_URL

export default function Shop(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ fetchProducts() },[])

  const fetchProducts = async ()=>{
    try{
      const res = await fetch(`${API}/api/products?limit=24`)
      const data = await res.json()
      setProducts(data.items || [])
    }catch(e){
      console.error(e)
    }finally{ setLoading(false) }
  }

  const addToCart = (p)=>{
    const existing = JSON.parse(localStorage.getItem('cart')||'[]')
    existing.push({product_id: p.id, quantity: 1})
    localStorage.setItem('cart', JSON.stringify(existing))
    alert('Added to cart')
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Shop</h1>
      {loading ? (
        <div className="text-white/60">Loading products…</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
        </div>
      )}
    </section>
  )
}
