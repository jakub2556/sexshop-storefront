import { notFound } from "next/navigation"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
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
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container" data-testid="category-container">
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="flex flex-row mb-8 gap-4 items-center">
          {parents.map((parent) => (
            <span key={parent.id} className="text-gray-400">
              <LocalizedClientLink className="mr-4 hover:text-rose-600 transition-colors" href={`/categories/${parent.handle}`}>
                {parent.name}
              </LocalizedClientLink>
              /
            </span>
          ))}
          <h1 className="section-heading" data-testid="category-page-title">{category.name}</h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular text-gray-500"><p>{category.description}</p></div>
        )}
        {hasChildren && (
          <div className="mb-8">
            <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-3">
              {category.category_children?.map((c) => (
                <LocalizedClientLink key={c.id} href={`/categories/${c.handle}`}
                  className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center hover:shadow-md hover:border-rose-200 transition-all duration-300">
                  <span className="text-gray-700 text-sm font-medium">{c.name}</span>
                </LocalizedClientLink>
              ))}
            </div>
          </div>
        )}
        <Suspense fallback={<SkeletonProductGrid numberOfProducts={12} />}>
          <PaginatedProducts sortBy={sort} page={pageNumber} categoryIds={allCategoryIds} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}
