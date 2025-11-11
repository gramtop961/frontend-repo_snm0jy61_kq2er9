import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../ProductCard'

const API = import.meta.env.VITE_BACKEND_URL

const CATEGORIES = [
  { label: 'All categories', value: '' },
  { label: 'Tees', value: 'tees' },
  { label: 'Hoodies', value: 'hoodies' },
  { label: 'Bottoms', value: 'bottoms' },
]

const SIZES = [
  { label: 'All sizes', value: '' },
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' },
]

const COLLECTIONS = [
  { label: 'All collections', value: '' },
  { label: 'AW24', value: 'AW24' },
  { label: 'Core', value: 'Core' },
]

export default function Shop(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [size, setSize] = useState('')
  const [collection, setCollection] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 12

  const query = useMemo(()=>{
    const u = new URLSearchParams()
    if(q) u.set('q', q)
    if(category) u.set('category', category)
    if(size) u.set('size', size)
    if(collection) u.set('collection', collection)
    u.set('page', String(page))
    u.set('limit', String(limit))
    return u.toString()
  },[q, category, size, collection, page])

  useEffect(()=>{ fetchProducts() },[query])

  const fetchProducts = async ()=>{
    setLoading(true)
    try{
      const res = await fetch(`${API}/api/products?${query}`)
      const data = await res.json()
      setProducts(data.items || [])
      setTotal(data.total || 0)
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

  const totalPages = Math.max(1, Math.ceil(total / limit))

  const quickPresets = [
    { label: 'All', apply: () => { setCategory(''); setSize(''); setCollection(''); setQ(''); setPage(1) } },
    { label: 'Tees · AW24', apply: () => { setCategory('tees'); setCollection('AW24'); setSize(''); setPage(1) } },
    { label: 'Hoodies · AW24', apply: () => { setCategory('hoodies'); setCollection('AW24'); setSize(''); setPage(1) } },
    { label: 'Bottoms · Core', apply: () => { setCategory('bottoms'); setCollection('Core'); setSize(''); setPage(1) } },
    { label: 'Size M', apply: () => { setSize('M'); setCategory(''); setCollection(''); setPage(1) } },
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Shop</h1>
        <span className="text-sm text-white/60">{total} items</span>
      </div>

      {/* Examples of catalog presets */}
      <div className="flex flex-wrap gap-2 mb-6">
        {quickPresets.map((p) => (
          <button
            key={p.label}
            onClick={p.apply}
            className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-sm"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <div className="relative">
          <input
            value={q}
            onChange={(e)=>{ setQ(e.target.value); setPage(1) }}
            placeholder="Search products"
            className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>
        <select
          value={category}
          onChange={(e)=>{ setCategory(e.target.value); setPage(1) }}
          className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none"
        >
          {CATEGORIES.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={size}
          onChange={(e)=>{ setSize(e.target.value); setPage(1) }}
          className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none"
        >
          {SIZES.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={collection}
          onChange={(e)=>{ setCollection(e.target.value); setPage(1) }}
          className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none"
        >
          {COLLECTIONS.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="text-white/60">Loading products…</div>
      ) : products.length === 0 ? (
        <div className="text-white/60">No products found for this selection.</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={()=> setPage(p => Math.max(1, p-1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-md border border-white/15 disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-white/70">Page {page} of {totalPages}</span>
          <button
            onClick={()=> setPage(p => Math.min(totalPages, p+1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-md border border-white/15 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </section>
  )
}
