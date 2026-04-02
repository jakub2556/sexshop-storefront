"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const MEILI_URL = process.env.NEXT_PUBLIC_MEILISEARCH_URL || "http://173.249.39.158:7700"
const MEILI_KEY = process.env.NEXT_PUBLIC_MEILISEARCH_KEY || "sexshop_meili_secret_2026"

type Facets = {
  brand: Record<string, number>
  categories: Record<string, number>
}

const sortOptions = [
  { label: "Najnovšie", value: "created_at:desc" },
  { label: "Cena: od najnižšej", value: "price:asc" },
  { label: "Cena: od najvyššej", value: "price:desc" },
  { label: "Názov: A-Z", value: "title:asc" },
]

export default function AdvancedFilter({
  onResults,
  query = "",
  categoryFilter = "",
}: {
  onResults: (hits: any[], total: number) => void
  query?: string
  categoryFilter?: string
}) {
  const [facets, setFacets] = useState<Facets>({ brand: {}, categories: {} })
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(500)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [selectedSort, setSelectedSort] = useState("created_at:desc")
  const [showAllBrands, setShowAllBrands] = useState(false)
  const [showAllCats, setShowAllCats] = useState(false)
  const [brandsOpen, setBrandsOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)
  const [catsOpen, setCatsOpen] = useState(true)
  const [total, setTotal] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = useCallback(async () => {
    const filters: string[] = []

    if (selectedBrands.length > 0) {
      filters.push("(" + selectedBrands.map(b => `brand = "${b}"`).join(" OR ") + ")")
    }

    if (selectedCategories.length > 0) {
      filters.push("(" + selectedCategories.map(c => `categories = "${c}"`).join(" OR ") + ")")
    }

    if (priceRange[0] > 0 || priceRange[1] < 500) {
      filters.push(`price >= ${priceRange[0]} AND price <= ${priceRange[1] >= 500 ? 99999 : priceRange[1]}`)
    }

    if (categoryFilter) {
      filters.push(`categories = "${categoryFilter}"`)
    }

    try {
      const res = await fetch(`${MEILI_URL}/indexes/products/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${MEILI_KEY}` },
        body: JSON.stringify({
          q: query,
          limit: 24,
          filter: filters.length > 0 ? filters.join(" AND ") : undefined,
          sort: [selectedSort],
          facets: ["brand", "categories"],
        }),
      })
      const data = await res.json()
      setFacets(data.facetDistribution || { brand: {}, categories: {} })
      setTotal(data.estimatedTotalHits || 0)
      onResults(data.hits || [], data.estimatedTotalHits || 0)
    } catch (err) {
      console.error("Filter error:", err)
    }
  }, [query, selectedBrands, selectedCategories, priceRange, selectedSort, categoryFilter, onResults])

  useEffect(() => { search() }, [search])

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])
  }

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }

  const handlePriceChange = (type: "min" | "max", val: number) => {
    if (type === "min") setPriceMin(val)
    else setPriceMax(val)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setPriceRange(type === "min" ? [val, priceMax] : [priceMin, val])
    }, 500)
  }

  const clearAll = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setPriceMin(0)
    setPriceMax(500)
    setPriceRange([0, 500])
    setSelectedSort("created_at:desc")
  }

  const hasFilters = selectedBrands.length > 0 || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 500

  const sortedBrands = Object.entries(facets.brand).filter(([n]) => n).sort((a, b) => b[1] - a[1])
  const sortedCats = Object.entries(facets.categories).filter(([n]) => n).sort((a, b) => b[1] - a[1])
  const visibleBrands = showAllBrands ? sortedBrands : sortedBrands.slice(0, 10)
  const visibleCats = showAllCats ? sortedCats : sortedCats.slice(0, 10)

  const filterContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Filter</h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-rose-400 hover:text-rose-300 transition-colors">Zrušiť filtre</button>
        )}
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {selectedBrands.map(b => (
            <button key={b} onClick={() => toggleBrand(b)} className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors">
              {b} <span>×</span>
            </button>
          ))}
          {selectedCategories.map(c => (
            <button key={c} onClick={() => toggleCategory(c)} className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors">
              {c} <span>×</span>
            </button>
          ))}
          {(priceRange[0] > 0 || priceRange[1] < 500) && (
            <button onClick={() => { setPriceMin(0); setPriceMax(500); setPriceRange([0, 500]) }} className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
              {priceRange[0]}€ - {priceRange[1] >= 500 ? "∞" : priceRange[1] + "€"} <span>×</span>
            </button>
          )}
        </div>
      )}

      {/* Sort */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>Zoradiť podľa</p>
        <div className="flex flex-col gap-0.5">
          {sortOptions.map(opt => (
            <button key={opt.value} onClick={() => setSelectedSort(opt.value)}
              className={`text-left text-sm px-3 py-1.5 rounded-lg transition-all ${selectedSort === opt.value ? "text-rose-400 font-medium" : ""}`}
              style={{ color: selectedSort === opt.value ? undefined : "var(--text-secondary)", background: selectedSort === opt.value ? "var(--accent-soft)" : "transparent" }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price slider */}
      <div className="mb-5">
        <button onClick={() => setPriceOpen(!priceOpen)} className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-secondary)" }}>
          Cena
          <svg className={`w-3.5 h-3.5 transition-transform ${priceOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </button>
        {priceOpen && (
          <div className="px-1">
            <div className="flex items-center justify-between text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
              <span>{priceMin} €</span>
              <span>{priceMax >= 500 ? "500+ €" : priceMax + " €"}</span>
            </div>
            {/* Min slider */}
            <div className="relative mb-2">
              <input
                type="range" min={0} max={500} step={5} value={priceMin}
                onChange={(e) => handlePriceChange("min", Math.min(Number(e.target.value), priceMax - 5))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, var(--border) 0%, var(--border) ${priceMin / 5}%, #E11D48 ${priceMin / 5}%, #E11D48 ${priceMax / 5}%, var(--border) ${priceMax / 5}%, var(--border) 100%)` }}
              />
            </div>
            {/* Max slider */}
            <div className="relative">
              <input
                type="range" min={0} max={500} step={5} value={priceMax}
                onChange={(e) => handlePriceChange("max", Math.max(Number(e.target.value), priceMin + 5))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ background: "transparent" }}
              />
            </div>
            {/* Quick price buttons */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {[10, 25, 50, 100, 200].map(v => (
                <button key={v} onClick={() => { setPriceMax(v); setPriceRange([priceMin, v]) }}
                  className="text-xs px-2 py-1 rounded-md transition-colors"
                  style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                  do {v}€
                </button>
              ))}
            </div>
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
            {visibleCats.map(([name, count]) => (
              <button key={name} onClick={() => toggleCategory(name)}
                className={`text-left text-sm px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${selectedCategories.includes(name) ? "text-purple-400 font-medium" : ""}`}
                style={{ color: selectedCategories.includes(name) ? undefined : "var(--text-secondary)", background: selectedCategories.includes(name) ? "rgba(168,85,247,0.1)" : "transparent" }}>
                <span className="truncate">{name}</span>
                <span className="text-xs opacity-50 ml-2 flex-shrink-0">{count}</span>
              </button>
            ))}
            {sortedCats.length > 10 && (
              <button onClick={() => setShowAllCats(!showAllCats)} className="text-xs text-purple-400 hover:text-purple-300 mt-1 px-3 transition-colors">
                {showAllCats ? "Zobraziť menej" : `Všetky (${sortedCats.length})`}
              </button>
            )}
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
          <div className="flex flex-col gap-0.5 max-h-[200px] overflow-y-auto no-scrollbar">
            {visibleBrands.map(([name, count]) => (
              <button key={name} onClick={() => toggleBrand(name)}
                className={`text-left text-sm px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${selectedBrands.includes(name) ? "text-rose-400 font-medium" : ""}`}
                style={{ color: selectedBrands.includes(name) ? undefined : "var(--text-secondary)", background: selectedBrands.includes(name) ? "var(--accent-soft)" : "transparent" }}>
                <span className="truncate">{name}</span>
                <span className="text-xs opacity-50 ml-2 flex-shrink-0">{count}</span>
              </button>
            ))}
            {sortedBrands.length > 10 && (
              <button onClick={() => setShowAllBrands(!showAllBrands)} className="text-xs text-rose-400 hover:text-rose-300 mt-1 px-3 transition-colors">
                {showAllBrands ? "Zobraziť menej" : `Všetky (${sortedBrands.length})`}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Count */}
      <div className="text-xs py-3" style={{ color: "var(--text-secondary)", borderTop: "1px solid var(--border)" }}>
        {total.toLocaleString()} produktov
      </div>
    </>
  )

  return (
    <>
      {/* Mobile filter toggle */}
      <button onClick={() => setMobileOpen(true)} className="small:hidden fixed bottom-6 left-6 z-50 flex items-center gap-2 btn-primary !py-2.5 !px-4 text-sm shadow-lg">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
        Filter {hasFilters && `(${selectedBrands.length + selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0)})`}
      </button>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] small:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] overflow-y-auto p-5" style={{ background: "var(--bg-primary)" }}>
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold" style={{ color: "var(--text-primary)" }}>Filter</span>
              <button onClick={() => setMobileOpen(false)} style={{ color: "var(--text-secondary)" }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}

      {/* Desktop filter */}
      <div className="hidden small:block small:min-w-[240px] small:max-w-[240px] flex-shrink-0">
        <div className="sticky top-20">{filterContent}</div>
      </div>
    </>
  )
}
