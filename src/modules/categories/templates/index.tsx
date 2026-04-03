import { notFound } from "next/navigation"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import StoreFilter from "@modules/store/components/store-filter"
import { HttpTypes } from "@medusajs/types"

function getAllCategoryIds(category: HttpTypes.StoreProductCategory): string[] {
  const ids = [category.id]
  if (category.category_children) {
    for (const child of category.category_children) {
      ids.push(...getAllCategoryIds(child))
    }
  }
  return ids
}

export default function CategoryTemplate({
  category, sortBy, page, countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]
  const getParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) { parents.push(cat.parent_category); getParents(cat.parent_category) }
  }
  getParents(category)

  const hasChildren = category.category_children && category.category_children.length > 0
  const allCategoryIds = getAllCategoryIds(category)

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container gap-8" data-testid="category-container">
      <StoreFilter sortBy={sort} />
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

        {/* Products */}
        <Suspense fallback={<SkeletonProductGrid numberOfProducts={12} />}>
          <PaginatedProducts sortBy={sort} page={pageNumber} categoryIds={allCategoryIds} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}
