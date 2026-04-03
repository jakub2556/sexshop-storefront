"use client"

import { useState, useEffect, useCallback } from "react"
import { notFound } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import StoreFilter from "@modules/store/components/store-filter"
import { HttpTypes } from "@medusajs/types"

const MEILI_URL = process.env.NEXT_PUBLIC_MEILISEARCH_URL || "http://173.249.39.158:7700"
const MEILI_KEY = process.env.NEXT_PUBLIC_MEILISEARCH_KEY || "sexshop_meili_secret_2026"

type Hit = { id: string; title: string; handle: string; thumbnail: string; price: number; brand: string }

function getAllCategoryNames(category: any): string[] {
  const names = [category.name]
  if (category.category_children) {
    for (const child of category.category_children) {
      names.push(...getAllCategoryNames(child))
    }
  }
  return names
}

export default function CategoryTemplate({
  category, sortBy, page, countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: string
  page?: string
  countryCode: string
}) {
  const [hits, setHits] = useState<Hit[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]
  const getParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) { parents.push(cat.parent_category); getParents(cat.parent_category) }
  }
  getParents(category)

  const hasChildren = category.category_children && category.category_children.length > 0
  const allCatNames = getAllCategoryNames(category)

  // Fetch products from MeiliSearch
  useEffect(() => {
    setLoading(true)
    const catFilter = allCatNames.map(n => `categories = "${n}"`).join(" OR ")

    fetch(`${MEILI_URL}/indexes/products/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${MEILI_KEY}` },
      body: JSON.stringify({
        q: "",
        limit: 48,
        filter: catFilter ? `(${catFilter})` : undefined,
        sort: ["created_at:desc"],
      }),
    })
      .then(r => r.json())
      .then(d => { setHits(d.hits || []); setTotal(d.estimatedTotalHits || 0) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [category.id])

  const handleSearch = useCallback(async (filters: string[], sort: string) => {
    setLoading(true)
    const catFilter = allCatNames.map(n => `categories = "${n}"`).join(" OR ")
    const allFilters = [`(${catFilter})`, ...filters].filter(Boolean)

    try {
      const res = await fetch(`${MEILI_URL}/indexes/products/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${MEILI_KEY}` },
        body: JSON.stringify({
          q: "",
          limit: 48,
          filter: allFilters.length > 0 ? allFilters : undefined,
          sort: sort ? [sort] : ["created_at:desc"],
        }),
      })
      const d = await res.json()
      setHits(d.hits || [])
      setTotal(d.estimatedTotalHits || 0)
    } catch {}
    setLoading(false)
  }, [category.id])

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container gap-8" data-testid="category-container">
      <StoreFilter onSearch={handleSearch} />
      <div className="w-full">
        {/* Breadcrumbs */}
        <div className="flex flex-row mb-4 gap-2 items-center flex-wrap">
          {parents.reverse().map((parent) => (
            <span key={parent.id} style={{ color: "var(--text-secondary)" }} className="text-sm">
              <LocalizedClientLink className="hover:text-rose-400 transition-colors" href={`/categories/${parent.handle}`}>
                {parent.name}
              </LocalizedClientLink>
              <span className="mx-2">/</span>
            </span>
          ))}
          <h1 className="section-heading text-2xl" data-testid="category-page-title">{category.name}</h1>
          {!loading && <span className="text-sm ml-auto" style={{ color: "var(--text-secondary)" }}>{total} produktov</span>}
        </div>

        {category.description && (
          <div className="mb-6 text-sm" style={{ color: "var(--text-secondary)" }}><p>{category.description}</p></div>
        )}

        {/* Subcategories */}
        {hasChildren && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {category.category_children?.map((c) => (
                <LocalizedClientLink key={c.id} href={`/categories/${c.handle}`}
                  className="text-sm px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5 hover:text-rose-400"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                  {c.name}
                </LocalizedClientLink>
              ))}
            </div>
          </div>
        )}

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="dark-card animate-pulse">
                <div className="aspect-square" style={{ background: "var(--bg-elevated)" }} />
                <div className="p-4"><div className="h-4 rounded" style={{ background: "var(--bg-elevated)", width: "80%" }} /><div className="h-4 rounded mt-2" style={{ background: "var(--bg-elevated)", width: "40%" }} /></div>
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
                    <p className="text-sm font-medium line-clamp-2 group-hover:text-rose-400 transition-colors" style={{ color: "var(--text-primary)" }}>{hit.title}</p>
                    {hit.brand && <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{hit.brand}</p>}
                    {hit.price > 0 && <p className="text-sm font-bold mt-1.5" style={{ color: "var(--text-primary)" }}>{hit.price.toFixed(2)} €</p>}
                  </div>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg mb-2" style={{ color: "var(--text-primary)" }}>Žiadne produkty</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>V tejto kategórii nie sú žiadne produkty</p>
          </div>
        )}
      </div>
    </div>
  )
}
