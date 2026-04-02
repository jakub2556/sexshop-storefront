import { HttpTypes } from "@medusajs/types"

const ProductBadges = ({ product }: { product: HttpTypes.StoreProduct }) => {
  const meta = (product as any).metadata || {}
  const stock = meta.stock || 0
  const brand = meta.brand || ""
  const ean = meta.ean || ""

  const items = [
    ...(brand ? [{ label: "Značka", value: brand }] : []),
    ...(ean && ean !== "#N/A" ? [{ label: "EAN", value: ean }] : []),
    ...(meta.warranty_years ? [{ label: "Záruka", value: `${meta.warranty_years} roky` }] : []),
  ]

  if (items.length === 0) return null

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item.label} className="text-xs px-3 py-1.5 rounded-full" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
          <span className="font-medium" style={{ color: "var(--text-primary)" }}>{item.label}:</span> {item.value}
        </span>
      ))}
    </div>
  )
}

export default ProductBadges
