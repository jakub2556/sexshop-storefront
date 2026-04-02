import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import ProductSlider from "@modules/common/components/product-slider"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts || pricedProducts.length === 0) {
    return null
  }

  return (
    <div className="content-container py-10 small:py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-heading">{collection.title}</h2>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          Zobraziť všetky
        </InteractiveLink>
      </div>
      <ProductSlider>
        {pricedProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[180px] small:w-[220px] ">
            <ProductPreview product={product} region={region} isFeatured />
          </div>
        ))}
      </ProductSlider>
    </div>
  )
}
