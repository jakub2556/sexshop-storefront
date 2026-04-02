"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  "data-testid"?: string
}

const priceRanges = [
  { label: "Do 10 €", value: "0-10" },
  { label: "10 - 25 €", value: "10-25" },
  { label: "25 - 50 €", value: "25-50" },
  { label: "50 - 100 €", value: "50-100" },
  { label: "Nad 100 €", value: "100-9999" },
]

const RefinementList = ({ sortBy, "data-testid": dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(true)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const activePrice = searchParams.get("price") || ""

  return (
    <div className="flex small:flex-col gap-8 py-4 mb-8 small:px-0 pl-6 small:min-w-[220px] small:ml-[1.675rem]">
      {/* Sort */}
      <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />

      {/* Price filter */}
      <div>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-between w-full text-sm font-semibold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Cena
          <svg className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} style={{ color: "var(--text-secondary)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        {isFilterOpen && (
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setQueryParams("price", "")}
              className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${!activePrice ? "text-rose-400" : ""}`}
              style={{ color: activePrice ? "var(--text-secondary)" : undefined, background: !activePrice ? "var(--accent-soft)" : "transparent" }}
            >
              Všetky ceny
            </button>
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setQueryParams("price", range.value)}
                className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${activePrice === range.value ? "text-rose-400" : ""}`}
                style={{ color: activePrice === range.value ? undefined : "var(--text-secondary)", background: activePrice === range.value ? "var(--accent-soft)" : "transparent" }}
              >
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RefinementList
