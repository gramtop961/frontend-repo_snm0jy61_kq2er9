export default function ProductCard({product, onAdd}){
  return (
    <div className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden">
      <a href={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-white/5">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition"/>
        </div>
      </a>
      <div className="p-4">
        <div className="font-medium">{product.name}</div>
        <div className="text-white/70">Rp {Number(product.price).toLocaleString('id-ID')}</div>
        <button onClick={()=>onAdd?.(product)} className="mt-3 w-full border border-white/15 rounded py-2 hover:bg-white/10">Add to Cart</button>
      </div>
    </div>
  )
}
