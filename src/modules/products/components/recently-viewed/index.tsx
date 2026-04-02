"use client"

import { useEffect, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type RecentProduct = {
  id: string
  title: string
  handle: string
  thumbnail: string
}

const RecentlyViewed = () => {
  const [products, setProducts] = useState<RecentProduct[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recently_viewed") || "[]")
    setProducts(stored.slice(0, 8))
  }, [])

  if (products.length < 2) return null

  return (
    <div className="content-container py-10">
      <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>Naposledy prezerané</h3>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {products.map((p) => (
          <LocalizedClientLink key={p.id} href={`/products/${p.handle}`} className="flex-shrink-0 w-[120px] group">
            <div className="aspect-square rounded-xl overflow-hidden mb-2" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
              {p.thumbnail && <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
            </div>
            <p className="text-xs line-clamp-2 group-hover:text-rose-400 transition-colors" style={{ color: "var(--text-secondary)" }}>{p.title}</p>
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed

// Helper to track viewed products - call from product page
export function trackRecentlyViewed(product: { id: string; title: string; handle: string; thumbnail?: string | null }) {
  if (typeof window === "undefined") return
  const stored: RecentProduct[] = JSON.parse(localStorage.getItem("recently_viewed") || "[]")
  const filtered = stored.filter((p) => p.id !== product.id)
  const updated = [{ id: product.id, title: product.title, handle: product.handle, thumbnail: product.thumbnail || "" }, ...filtered].slice(0, 20)
  localStorage.setItem("recently_viewed", JSON.stringify(updated))
}
