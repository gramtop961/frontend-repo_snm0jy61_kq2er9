import { useEffect, useState } from 'react'
const API = import.meta.env.VITE_BACKEND_URL

export default function Journal(){
  const [posts, setPosts] = useState([])
  useEffect(()=>{ (async()=>{
    try{ const res = await fetch(`${API}/api/posts`); const data = await res.json(); setPosts(data.items||[]) }catch(e){}
  })() },[])

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Journal</h1>
      {posts.length===0 ? (
        <p className="text-white/60">No posts yet. Stories from Bandung soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map(p=> (
            <article key={p.id} className="border border-white/10 rounded p-4">
              {p.cover_image && <img src={p.cover_image} alt="" className="rounded mb-3"/>}
              <h3 className="text-xl font-medium">{p.title}</h3>
              <p className="text-white/70 mt-1">{p.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
