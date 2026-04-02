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

export default function ComparePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCompare = async () => {
    setLoading(true)
    try {
      const stored = localStorage.getItem("compare")
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
        body: JSON.stringify({ q: "", filter: filterStr, limit: 4 }),
      })
      const data = await res.json()
      setProducts(data.hits || [])
    } catch (err) {
      console.error("Compare fetch error:", err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCompare()
  }, [])

  const removeItem = (id: string) => {
    const stored = localStorage.getItem("compare")
    const ids: string[] = stored ? JSON.parse(stored) : []
    const updated = ids.filter((i) => i !== id)
    localStorage.setItem("compare", JSON.stringify(updated))
    setProducts((prev) => prev.filter((p) => p.id !== id))
    window.dispatchEvent(new Event("compare-updated"))
  }

  const clearAll = () => {
    localStorage.setItem("compare", JSON.stringify([]))
    setProducts([])
    window.dispatchEvent(new Event("compare-updated"))
  }

  return (
    <div className="content-container py-12" style={{ minHeight: "60vh" }}>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="section-heading text-3xl" style={{ color: "var(--text-primary)" }}>
          Porovnanie produktov
        </h1>
        {products.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm px-4 py-2 rounded-lg transition-colors hover:bg-red-500/10"
            style={{
              color: "#f87171",
              border: "1px solid rgba(248,113,113,0.3)",
            }}
          >
            Vyčistiť porovnanie
          </button>
        )}
      </div>

      {loading && (
        <div className="text-center py-20" style={{ color: "var(--text-secondary)" }}>
          Načítavam...
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">⚖️</div>
          <p className="text-lg mb-6" style={{ color: "var(--text-secondary)" }}>
            Nemáte žiadne produkty na porovnanie
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
        <div className="overflow-x-auto">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${products.length}, minmax(200px, 1fr))`,
            }}
          >
            {/* Thumbnails */}
            {products.map((product) => (
              <div key={`thumb-${product.id}`} className="flex flex-col items-center">
                <LocalizedClientLink href={`/products/${product.handle}`}>
                  <div
                    className="w-full aspect-square rounded-xl overflow-hidden mb-3"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                  >
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Bez obrázka
                      </div>
                    )}
                  </div>
                </LocalizedClientLink>
              </div>
            ))}

            {/* Titles */}
            {products.map((product) => (
              <div key={`title-${product.id}`} className="text-center">
                <LocalizedClientLink href={`/products/${product.handle}`}>
                  <h3
                    className="text-sm font-medium hover:text-rose-400 transition-colors line-clamp-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {product.title}
                  </h3>
                </LocalizedClientLink>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div
            className="mt-6 rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* Price row */}
            <div
              className="grid items-center"
              style={{
                gridTemplateColumns: `140px repeat(${products.length}, 1fr)`,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                className="px-4 py-3 text-sm font-medium"
                style={{ color: "var(--text-secondary)", background: "var(--bg-elevated)" }}
              >
                Cena
              </div>
              {products.map((product) => (
                <div
                  key={`price-${product.id}`}
                  className="px-4 py-3 text-center text-sm font-semibold text-rose-400"
                  style={{ background: "var(--bg-card)" }}
                >
                  {product.price != null ? `${product.price.toFixed(2)} €` : "—"}
                </div>
              ))}
            </div>

            {/* Brand row */}
            <div
              className="grid items-center"
              style={{
                gridTemplateColumns: `140px repeat(${products.length}, 1fr)`,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                className="px-4 py-3 text-sm font-medium"
                style={{ color: "var(--text-secondary)", background: "var(--bg-elevated)" }}
              >
                Značka
              </div>
              {products.map((product) => (
                <div
                  key={`brand-${product.id}`}
                  className="px-4 py-3 text-center text-sm"
                  style={{ color: "var(--text-primary)", background: "var(--bg-card)" }}
                >
                  {product.brand || "—"}
                </div>
              ))}
            </div>

            {/* Remove row */}
            <div
              className="grid items-center"
              style={{
                gridTemplateColumns: `140px repeat(${products.length}, 1fr)`,
              }}
            >
              <div
                className="px-4 py-3 text-sm font-medium"
                style={{ color: "var(--text-secondary)", background: "var(--bg-elevated)" }}
              >
                Akcia
              </div>
              {products.map((product) => (
                <div
                  key={`action-${product.id}`}
                  className="px-4 py-3 text-center"
                  style={{ background: "var(--bg-card)" }}
                >
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{
                      color: "var(--text-secondary)",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    Odstrániť
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
