"use client"

import { useState, useEffect, useRef } from "react"

const MEILI_URL = process.env.NEXT_PUBLIC_MEILISEARCH_URL || "http://173.249.39.158:7700"
const MEILI_KEY = process.env.NEXT_PUBLIC_MEILISEARCH_KEY || "sexshop_meili_secret_2026"

const sortOptions = [
  { label: "Najnovšie", value: "created_at:desc" },
  { label: "Cena: od najnižšej", value: "price:asc" },
  { label: "Cena: od najvyššej", value: "price:desc" },
  { label: "Názov: A-Z", value: "title:asc" },
]

type Facets = { brand: Record<string, number>; categories: Record<string, number> }

export default function StoreFilter({ onSearch }: { onSearch: (filters: string[], sort: string) => void }) {
  const [facets, setFacets] = useState<Facets>({ brand: {}, categories: {} })
  const [brands, setBrands] = useState<string[]>([])
  const [cats, setCats] = useState<string[]>([])
  const [pMin, setPMin] = useState(0)
  const [pMax, setPMax] = useState(500)
  const [sort, setSort] = useState("created_at:desc")
  const [brandsOpen, setBrandsOpen] = useState(true)
  const [catsOpen, setCatsOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(true)
  const [showAllBrands, setShowAllBrands] = useState(false)
  const [showAllCats, setShowAllCats] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load facets once
  useEffect(() => {
    fetch(`${MEILI_URL}/indexes/products/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${MEILI_KEY}` },
      body: JSON.stringify({ q: "", limit: 0, facets: ["brand", "categories"] }),
    }).then(r => r.json()).then(d => setFacets(d.facetDistribution || { brand: {}, categories: {} })).catch(() => {})
  }, [])

  // Build filters and trigger search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const f: string[] = []
      if (brands.length > 0) f.push("(" + brands.map(b => `brand = "${b}"`).join(" OR ") + ")")
      if (cats.length > 0) f.push("(" + cats.map(c => `categories = "${c}"`).join(" OR ") + ")")
      if (pMin > 0 || pMax < 500) f.push(`price >= ${pMin} AND price <= ${pMax >= 500 ? 99999 : pMax}`)
      onSearch(f, sort)
    }, 300)
  }, [brands, cats, pMin, pMax, sort, onSearch])

  const toggleBrand = (b: string) => setBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])
  const toggleCat = (c: string) => setCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  const clearAll = () => { setBrands([]); setCats([]); setPMin(0); setPMax(500); setSort("created_at:desc") }

  const hasFilters = brands.length > 0 || cats.length > 0 || pMin > 0 || pMax < 500

  const sortedBrands = Object.entries(facets.brand).filter(([n]) => n).sort((a, b) => b[1] - a[1])
  const sortedCats = Object.entries(facets.categories).filter(([n]) => n).sort((a, b) => b[1] - a[1])
  const visBrands = showAllBrands ? sortedBrands : sortedBrands.slice(0, 12)
  const visCats = showAllCats ? sortedCats : sortedCats.slice(0, 12)

  const content = (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Filter</h3>
        {hasFilters && <button onClick={clearAll} className="text-xs text-rose-400 hover:text-rose-300">Zrušiť filtre</button>}
      </div>

      {/* Active */}
      {hasFilters && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {brands.map(b => <button key={b} onClick={() => toggleBrand(b)} className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1 bg-rose-500/10 text-rose-400">{b} ×</button>)}
          {cats.map(c => <button key={c} onClick={() => toggleCat(c)} className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1 bg-purple-500/10 text-purple-400">{c} ×</button>)}
          {(pMin > 0 || pMax < 500) && <button onClick={() => { setPMin(0); setPMax(500) }} className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1 bg-emerald-500/10 text-emerald-400">{pMin}€ - {pMax >= 500 ? "∞" : pMax + "€"} ×</button>}
        </div>
      )}

      {/* Sort */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>Zoradiť podľa</p>
        <div className="flex flex-col gap-0.5">
          {sortOptions.map(o => (
            <button key={o.value} onClick={() => setSort(o.value)}
              className={`text-left text-sm px-3 py-1.5 rounded-lg transition-all ${sort === o.value ? "text-rose-400 font-medium" : ""}`}
              style={{ color: sort === o.value ? undefined : "var(--text-secondary)", background: sort === o.value ? "var(--accent-soft)" : "transparent" }}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price - dual thumb */}
      <div className="mb-5">
        <button onClick={() => setPriceOpen(!priceOpen)} className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-secondary)" }}>
          Cena
          <svg className={`w-3.5 h-3.5 transition-transform ${priceOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </button>
        {priceOpen && (
          <div className="px-1">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-medium" style={{ color: "var(--text-primary)" }}>{pMin} €</span>
              <span className="font-medium" style={{ color: "var(--text-primary)" }}>{pMax >= 500 ? "500+ €" : pMax + " €"}</span>
            </div>
            <div className="relative h-6 flex items-center">
              <div className="absolute left-0 right-0 h-1.5 rounded-full" style={{ background: "var(--border)" }} />
              <div className="absolute h-1.5 rounded-full bg-rose-500" style={{ left: `${(pMin / 500) * 100}%`, right: `${100 - (pMax / 500) * 100}%` }} />
              <input type="range" min={0} max={500} step={5} value={pMin}
                onChange={e => setPMin(Math.min(+e.target.value, pMax - 10))}
                className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--bg)] [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(225,29,72,0.2)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-rose-500 [&::-moz-range-thumb]:cursor-pointer"
                style={{ zIndex: pMin > 450 ? 20 : 10 }} />
              <input type="range" min={0} max={500} step={5} value={pMax}
                onChange={e => setPMax(Math.max(+e.target.value, pMin + 10))}
                className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--bg)] [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(225,29,72,0.2)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-rose-500 [&::-moz-range-thumb]:cursor-pointer" />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {[10, 25, 50, 100, 200].map(v => (
                <button key={v} onClick={() => { setPMin(0); setPMax(v) }}
                  className="text-xs px-2.5 py-1 rounded-lg transition-colors hover:text-rose-400"
                  style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                  do {v}€
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="mb-5">
        <button onClick={() => setBrandsOpen(!brandsOpen)} className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
          Značka
          <svg className={`w-3.5 h-3.5 transition-transform ${brandsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </button>
        {brandsOpen && (
          <div className="flex flex-col gap-0.5 max-h-[250px] overflow-y-auto no-scrollbar">
            {visBrands.map(([n, c]) => (
              <button key={n} onClick={() => toggleBrand(n)}
                className={`text-left text-sm px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${brands.includes(n) ? "text-rose-400 font-medium" : ""}`}
                style={{ color: brands.includes(n) ? undefined : "var(--text-secondary)", background: brands.includes(n) ? "var(--accent-soft)" : "transparent" }}>
                <span className="truncate">{n}</span>
                <span className="text-xs opacity-50 ml-2 flex-shrink-0">{c}</span>
              </button>
            ))}
            {sortedBrands.length > 12 && <button onClick={() => setShowAllBrands(!showAllBrands)} className="text-xs text-rose-400 mt-1 px-3">{showAllBrands ? "Menej" : `Všetky (${sortedBrands.length})`}</button>}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="mb-5">
        <button onClick={() => setCatsOpen(!catsOpen)} className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
          Kategória
          <svg className={`w-3.5 h-3.5 transition-transform ${catsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </button>
        {catsOpen && (
          <div className="flex flex-col gap-0.5 max-h-[200px] overflow-y-auto no-scrollbar">
            {visCats.map(([n, c]) => (
              <button key={n} onClick={() => toggleCat(n)}
                className={`text-left text-sm px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${cats.includes(n) ? "text-purple-400 font-medium" : ""}`}
                style={{ color: cats.includes(n) ? undefined : "var(--text-secondary)", background: cats.includes(n) ? "rgba(139,92,246,0.1)" : "transparent" }}>
                <span className="truncate">{n}</span>
                <span className="text-xs opacity-50 ml-2 flex-shrink-0">{c}</span>
              </button>
            ))}
            {sortedCats.length > 12 && <button onClick={() => setShowAllCats(!showAllCats)} className="text-xs text-purple-400 mt-1 px-3">{showAllCats ? "Menej" : `Všetky (${sortedCats.length})`}</button>}
          </div>
        )}
      </div>
    </>
  )

  return (
    <>
      <button onClick={() => setMobileOpen(true)} className="small:hidden fixed bottom-20 left-4 z-50 flex items-center gap-2 btn-primary !py-2.5 !px-4 text-sm shadow-lg">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
        Filter {hasFilters ? `(${brands.length + cats.length + (pMin > 0 || pMax < 500 ? 1 : 0)})` : ""}
      </button>
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] small:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[280px] overflow-y-auto p-5" style={{ background: "var(--bg-primary)" }}>
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold" style={{ color: "var(--text-primary)" }}>Filter</span>
              <button onClick={() => setMobileOpen(false)}><svg className="w-5 h-5" style={{ color: "var(--text-secondary)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            {content}
          </div>
        </div>
      )}
      <div className="hidden small:block small:min-w-[240px] small:max-w-[240px] flex-shrink-0">
        <div className="sticky top-20">{content}</div>
      </div>
    </>
  )
}
