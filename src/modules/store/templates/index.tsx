"use client"

import { useState, useCallback, useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import StoreFilter from "@modules/store/components/store-filter"

type Hit = {
  id: string
  title: string
  handle: string
  thumbnail: string
  price: number
  brand: string
}

const MEILI_URL = process.env.NEXT_PUBLIC_MEILISEARCH_URL || "http://173.249.39.158:7700"
const MEILI_KEY = process.env.NEXT_PUBLIC_MEILISEARCH_KEY || "sexshop_meili_secret_2026"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: string
  page?: string
  countryCode: string
}) => {
  const [hits, setHits] = useState<Hit[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const lastSearchRef = useRef("")

  const handleSearch = useCallback(async (filters: string[], sort: string) => {
    const key = JSON.stringify({ filters, sort })
    if (key === lastSearchRef.current) return
    lastSearchRef.current = key

    setLoading(true)
    try {
      const res = await fetch(`${MEILI_URL}/indexes/products/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${MEILI_KEY}` },
        body: JSON.stringify({
          q: "",
          limit: 48,
          filter: filters.length > 0 ? filters : undefined,
          sort: sort ? [sort] : ["created_at:desc"],
        }),
      })
      const data = await res.json()
      setHits(data.hits || [])
      setTotal(data.estimatedTotalHits || 0)
    } catch (err) {
      console.error("Search error:", err)
    }
    setLoading(false)
  }, [])

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container gap-8">
      <StoreFilter onSearch={handleSearch} />
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="section-heading">Všetky produkty</h1>
          {!loading && <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{total.toLocaleString("sk")} produktov</span>}
        </div>

        {loading && hits.length === 0 ? (
          <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="dark-card animate-pulse">
                <div className="aspect-square" style={{ background: "var(--bg-elevated)" }} />
                <div className="p-4">
                  <div className="h-4 rounded" style={{ background: "var(--bg-elevated)", width: "80%" }} />
                  <div className="h-4 rounded mt-2" style={{ background: "var(--bg-elevated)", width: "40%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : hits.length > 0 ? (
          <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-4">
            {hits.map((hit) => (
              <LocalizedClientLink key={hit.id} href={`/products/${hit.handle}`} className="group">
                <div className="dark-card">
                  <div className="relative overflow-hidden aspect-square" style={{ background: "var(--bg-elevated)" }}>
                    {hit.thumbnail ? (
                      <img src={hit.thumbnail} alt={hit.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium line-clamp-2 group-hover:text-rose-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                      {hit.title}
                    </p>
                    {hit.brand && <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{hit.brand}</p>}
                    {hit.price > 0 && <p className="text-sm font-bold mt-1.5" style={{ color: "var(--text-primary)" }}>{hit.price.toFixed(2)} €</p>}
                  </div>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            <p className="text-lg mb-2" style={{ color: "var(--text-primary)" }}>Žiadne produkty</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Skúste zmeniť filtre</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoreTemplate
