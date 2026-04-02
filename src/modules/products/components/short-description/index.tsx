"use client"

import { HttpTypes } from "@medusajs/types"

const ShortDescription = ({ product }: { product: HttpTypes.StoreProduct }) => {
  const htmlDesc = (product as any).metadata?.description_html || ""
  const plainDesc = product.description || ""
  const raw = htmlDesc || plainDesc

  if (!raw) return null

  // Strip HTML and get first ~150 chars
  const stripped = raw
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  const short = stripped.length > 150 ? stripped.substring(0, 150) + "..." : stripped

  return (
    <div className="mt-3">
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {short}
      </p>
      {stripped.length > 150 && (
        <a
          href="#product-description"
          className="text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors mt-1 inline-block"
          onClick={(e) => {
            e.preventDefault()
            const el = document.getElementById("product-description")
            if (el) {
              el.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          Zobraziť celý popis ↓
        </a>
      )}
    </div>
  )
}

export default ShortDescription
