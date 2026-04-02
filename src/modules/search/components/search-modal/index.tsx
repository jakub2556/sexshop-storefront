"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const MEILI_URL = process.env.NEXT_PUBLIC_MEILISEARCH_URL || "http://173.249.39.158:7700"
const MEILI_KEY = process.env.NEXT_PUBLIC_MEILISEARCH_KEY || "sexshop_meili_secret_2026"

type Hit = {
  id: string
  title: string
  handle: string
  thumbnail: string
  price: number
  brand: string
}

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Hit[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { countryCode } = useParams()

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setQuery("")
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`${MEILI_URL}/indexes/products/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MEILI_KEY}`,
          },
          body: JSON.stringify({ q: query, limit: 8 }),
        })
        const data = await res.json()
        setResults(data.hits || [])
      } catch (err) {
        console.error("Search error:", err)
      }
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9998] flex items-start justify-center pt-20" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
      <div
        className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 p-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <svg className="w-5 h-5 text-rose-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hľadať produkty..."
            className="flex-1 bg-transparent outline-none text-base"
            style={{ color: "var(--text-primary)" }}
          />
          <button onClick={onClose} className="text-sm px-2 py-1 rounded-lg" style={{ color: "var(--text-secondary)", background: "var(--bg-elevated)" }}>
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="p-6 text-center" style={{ color: "var(--text-secondary)" }}>Hľadám...</div>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="p-6 text-center" style={{ color: "var(--text-secondary)" }}>
              Žiadne výsledky pre &quot;{query}&quot;
            </div>
          )}

          {results.map((hit) => (
            <LocalizedClientLink
              key={hit.id}
              href={`/products/${hit.handle}`}
              onClick={onClose}
              className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              {hit.thumbnail && (
                <img src={hit.thumbnail} alt={hit.title} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" style={{ background: "var(--bg-elevated)" }} />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{hit.title}</div>
                {hit.brand && <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{hit.brand}</div>}
              </div>
            </LocalizedClientLink>
          ))}
        </div>

        {query.length < 2 && (
          <div className="p-6 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
            Zadajte aspoň 2 znaky pre vyhľadávanie
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchModal
