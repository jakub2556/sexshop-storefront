"use client"

import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const MEILI_URL = process.env.NEXT_PUBLIC_MEILISEARCH_URL || "http://173.249.39.158:7700"
const MEILI_KEY = process.env.NEXT_PUBLIC_MEILISEARCH_KEY || "sexshop_meili_secret_2026"

type Product = {
  id: string
  title: string
  handle: string
  thumbnail: string
  price: number
  brand: string
}

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchWishlist = async () => {
    setLoading(true)
    try {
      const stored = localStorage.getItem("wishlist")
      const ids: string[] = stored ? JSON.parse(stored) : []

      if (ids.length === 0) {
        setProducts([])
        setLoading(false)
        return
      }

      const filterStr = `id IN [${ids.map((id) => `"${id}"`).join(", ")}]`

      const res = await fetch(`${MEILI_URL}/indexes/products/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MEILI_KEY}`,
        },
        body: JSON.stringify({ q: "", filter: filterStr, limit: 100 }),
      })
      const data = await res.json()
      setProducts(data.hits || [])
    } catch (err) {
      console.error("Wishlist fetch error:", err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  const removeItem = (id: string) => {
    const stored = localStorage.getItem("wishlist")
    const ids: string[] = stored ? JSON.parse(stored) : []
    const updated = ids.filter((i) => i !== id)
    localStorage.setItem("wishlist", JSON.stringify(updated))
    setProducts((prev) => prev.filter((p) => p.id !== id))
    window.dispatchEvent(new Event("wishlist-updated"))
  }

  return (
    <div className="content-container py-12" style={{ minHeight: "60vh" }}>
      <h1 className="section-heading text-3xl mb-8" style={{ color: "var(--text-primary)" }}>
        Obľúbené produkty
      </h1>

      {loading && (
        <div className="text-center py-20" style={{ color: "var(--text-secondary)" }}>
          Načítavam...
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">💜</div>
          <p className="text-lg mb-6" style={{ color: "var(--text-secondary)" }}>
            Nemáte žiadne obľúbené produkty
          </p>
          <LocalizedClientLink
            href="/store"
            className="btn-primary inline-block px-8 py-3 rounded-xl"
          >
            Prejsť do obchodu
          </LocalizedClientLink>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <LocalizedClientLink href={`/products/${product.handle}`}>
                <div className="aspect-square overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ color: "var(--text-secondary)" }}>
                      Bez obrázka
                    </div>
                  )}
                </div>
              </LocalizedClientLink>

              <div className="p-3 md:p-4">
                <LocalizedClientLink href={`/products/${product.handle}`}>
                  <h3
                    className="text-sm font-medium truncate mb-1 hover:text-rose-400 transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {product.title}
                  </h3>
                </LocalizedClientLink>

                {product.price != null && (
                  <div className="text-sm font-semibold text-rose-400 mb-3">
                    {product.price.toFixed(2)} €
                  </div>
                )}

                <button
                  onClick={() => removeItem(product.id)}
                  className="w-full text-xs py-2 rounded-lg transition-colors"
                  style={{
                    color: "var(--text-secondary)",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  Odstrániť
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
