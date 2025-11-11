import { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function Cart(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [checkingOut, setCheckingOut] = useState(false)
  const [orderResult, setOrderResult] = useState(null)

  useEffect(()=>{ loadCart() }, [])

  const loadCart = async ()=>{
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    // hydrate with product details
    const details = await Promise.all(cart.map(async (ci)=>{
      const res = await fetch(`${API}/api/products/${ci.product_id}`)
      const p = await res.json()
      return {...ci, name: p.name, image: p.image, price: p.price}
    }))
    setItems(details)
    setLoading(false)
  }

  const total = useMemo(()=> items.reduce((sum,i)=> sum + i.price * i.quantity, 0), [items])

  const updateQty = (idx, q)=>{
    const next = [...items]
    next[idx].quantity = Math.max(1, q)
    setItems(next)
    persist(next)
  }

  const removeItem = (idx)=>{
    const next = items.filter((_,i)=> i!==idx)
    setItems(next)
    persist(next)
  }

  const persist = (arr)=>{
    const compact = arr.map(({product_id, quantity})=>({product_id, quantity}))
    localStorage.setItem('cart', JSON.stringify(compact))
  }

  const checkout = async (e)=>{
    e.preventDefault()
    setCheckingOut(true)
    const form = new FormData(e.target)

    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      address: form.get('address'),
      shipping_method: form.get('shipping') || 'standard',
      items: items.map(i=> ({product_id: i.product_id, quantity: i.quantity}))
    }

    const res = await fetch(`${API}/api/checkout`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    const data = await res.json()
    setCheckingOut(false)
    setOrderResult(data)
    if(data?.payment?.redirect_url){
      window.location.href = data.payment.redirect_url
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-semibold mb-4">Cart</h1>
        {loading ? <div className="text-white/60">Loading…</div> : (
          items.length === 0 ? <div className="text-white/60">Your cart is empty.</div> : (
            <div className="space-y-4">
              {items.map((i,idx)=> (
                <div key={idx} className="flex gap-4 items-center border border-white/10 rounded p-3">
                  <img src={i.image} alt="" className="w-20 h-20 object-cover rounded"/>
                  <div className="flex-1">
                    <div>{i.name}</div>
                    <div className="text-white/60">Rp {Number(i.price).toLocaleString('id-ID')}</div>
                  </div>
                  <input type="number" min="1" value={i.quantity} onChange={e=>updateQty(idx, Number(e.target.value))} className="w-20 bg-transparent border border-white/20 rounded p-1"/>
                  <button onClick={()=>removeItem(idx)} className="text-red-400 hover:text-red-300">Remove</button>
                </div>
              ))}
            </div>
          )
        )}
      </div>
      <div>
        <div className="border border-white/10 rounded p-4">
          <div className="flex justify-between"><span>Subtotal</span><span>Rp {Number(total).toLocaleString('id-ID')}</span></div>
          <form onSubmit={checkout} className="mt-4 space-y-3">
            <input name="name" required placeholder="Name" className="w-full bg-transparent border border-white/20 rounded p-2"/>
            <input name="email" type="email" required placeholder="Email" className="w-full bg-transparent border border-white/20 rounded p-2"/>
            <textarea name="address" required placeholder="Address" className="w-full bg-transparent border border-white/20 rounded p-2"/>
            <select name="shipping" className="w-full bg-transparent border border-white/20 rounded p-2">
              <option value="standard">Standard</option>
              <option value="express">Express</option>
            </select>
            <button disabled={checkingOut || items.length===0} className="w-full mt-2 px-4 py-2 bg-[#C2A661] text-black rounded disabled:opacity-50">{checkingOut? 'Processing…' : 'Checkout'}</button>
          </form>
          {orderResult && !orderResult?.payment?.redirect_url && (
            <p className="text-sm text-white/60 mt-3">Payment link not generated. Configure Midtrans keys to enable sandbox payments.</p>
          )}
        </div>
      </div>
    </section>
  )
}
