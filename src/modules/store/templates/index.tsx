"use client"

import { useState, useCallback } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import AdvancedFilter from "@modules/store/components/advanced-filter"

type Hit = {
  id: string
  title: string
  handle: string
  thumbnail: string
  price: number
  brand: string
}

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

  const onResults = useCallback((newHits: Hit[], newTotal: number) => {
    setHits(newHits)
    setTotal(newTotal)
  }, [])

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container gap-8">
      <AdvancedFilter onResults={onResults} />
      <div className="w-full">
        <div className="mb-6">
          <h1 className="section-heading">Všetky produkty</h1>
        </div>
        {hits.length > 0 ? (
          <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-4">
            {hits.map((hit) => (
              <LocalizedClientLink key={hit.id} href={`/products/${hit.handle}`} className="group">
                <div className="dark-card">
                  <div className="relative overflow-hidden aspect-square" style={{ background: "var(--bg-elevated)" }}>
                    {hit.thumbnail ? (
                      <img src={hit.thumbnail} alt={hit.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ color: "var(--text-secondary)" }}>Bez obrázku</div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium line-clamp-2 group-hover:text-rose-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                      {hit.title}
                    </p>
                    {hit.brand && (
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{hit.brand}</p>
                    )}
                    <p className="text-sm font-bold mt-1.5" style={{ color: "var(--text-primary)" }}>
                      {hit.price > 0 ? `€${hit.price.toFixed(2)}` : ""}
                    </p>
                  </div>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        ) : (
          <div className="text-center py-20" style={{ color: "var(--text-secondary)" }}>
            <p className="text-lg mb-2">Žiadne produkty</p>
            <p className="text-sm">Skúste zmeniť filtre alebo vyhľadávací výraz</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoreTemplate
