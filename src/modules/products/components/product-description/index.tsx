"use client"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"

const ProductDescription = ({ product }: { product: HttpTypes.StoreProduct }) => {
  const [expanded, setExpanded] = useState(false)

  // Get HTML description from metadata or use plain description
  const htmlDescription = (product as any).metadata?.description_html || ""
  const plainDescription = product.description || ""

  const description = htmlDescription || plainDescription

  if (!description) return null

  // Decode HTML entities
  const decoded = description
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&ndash;/g, "–")
    .replace(/&rsquo;/g, "'")

  const isHTML = decoded.includes("<")
  const isLong = decoded.length > 500

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>Popis produktu</h3>
      <div
        className={`prose prose-sm max-w-none overflow-hidden transition-all duration-300 ${!expanded && isLong ? "max-h-[200px]" : ""}`}
        style={{
          color: "var(--text-secondary)",
          maskImage: !expanded && isLong ? "linear-gradient(to bottom, black 60%, transparent 100%)" : "none",
          WebkitMaskImage: !expanded && isLong ? "linear-gradient(to bottom, black 60%, transparent 100%)" : "none",
        }}
      >
        {isHTML ? (
          <div
            dangerouslySetInnerHTML={{ __html: decoded }}
            className="[&_strong]:text-[var(--text-primary)] [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_li]:my-1 [&_br]:block [&_br]:my-1 [&_p]:my-2 text-sm leading-relaxed"
          />
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-line">{decoded}</p>
        )}
      </div>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors"
        >
          {expanded ? "Zobraziť menej" : "Zobraziť celý popis"}
        </button>
      )}
    </div>
  )
}

export default ProductDescription
