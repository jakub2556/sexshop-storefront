import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) return null
  return (
    <>
      {price.price_type === "sale" && (
        <Text className="line-through text-xs" style={{ color: "var(--text-secondary)" }} data-testid="original-price">{price.original_price}</Text>
      )}
      <Text className={clx("font-bold", { "text-rose-400": price.price_type === "sale" })} style={price.price_type !== "sale" ? { color: "var(--text-primary)" } : {}} data-testid="price">
        {price.calculated_price}
      </Text>
    </>
  )
}
