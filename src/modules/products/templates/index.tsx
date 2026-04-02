import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"
import ProductDescription from "@modules/products/components/product-description"
import ShortDescription from "@modules/products/components/short-description"
import RecentlyViewedTracker from "@modules/products/components/recently-viewed/tracker"
import RecentlyViewed from "@modules/products/components/recently-viewed"
import WishlistButton from "@modules/products/components/wishlist-button"
import CompareButton from "@modules/products/components/compare-button"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <RecentlyViewedTracker product={{ id: product.id, title: product.title || "", handle: product.handle || "", thumbnail: product.thumbnail }} />

      {/* Breadcrumb */}
      <div className="content-container pt-4">
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
          <a href="/" className="hover:text-rose-400 transition-colors">Domov</a>
          <span>/</span>
          {product.collection && (
            <>
              <a href={`/sk/collections/${product.collection.handle}`} className="hover:text-rose-400 transition-colors">{product.collection.title}</a>
              <span>/</span>
            </>
          )}
          <span style={{ color: "var(--text-primary)" }}>{product.title}</span>
        </div>
      </div>

      {/* Horná časť */}
      <div className="content-container flex flex-col small:flex-row py-6 gap-8" data-testid="product-container">
        <div className="w-full small:w-[50%]">
          <ImageGallery images={images} />
        </div>

        <div className="w-full small:w-[50%] small:sticky small:top-20 small:self-start">
          <div className="flex items-start justify-between gap-3">
            <ProductInfo product={product} />
            <div className="flex gap-2 flex-shrink-0">
              <WishlistButton productId={product.id} />
              <CompareButton productId={product.id} />
            </div>
          </div>

          <ShortDescription product={product} />

          <div className="mt-4">
            <ProductOnboardingCta />
            <Suspense fallback={<ProductActions disabled={true} product={product} region={region} />}>
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: "var(--accent-soft)", color: "var(--text-secondary)" }}>
              <svg className="w-3.5 h-3.5 inline mr-1 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
              Diskrétne balenie
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: "var(--accent-soft)", color: "var(--text-secondary)" }}>
              <svg className="w-3.5 h-3.5 inline mr-1 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25m-12 4.5h12" /></svg>
              Do 24h
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: "var(--accent-soft)", color: "var(--text-secondary)" }}>
              <svg className="w-3.5 h-3.5 inline mr-1 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              Bezpečná platba
            </span>
          </div>
        </div>
      </div>

      {/* Popis + Tabs */}
      <div className="content-container pb-8" id="product-description">
        <ProductDescription product={product} />
        <div className="mt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <ProductTabs product={product} />
        </div>
      </div>

      {/* Naposledy prezerané */}
      <RecentlyViewed />

      {/* Súvisiace produkty */}
      <div className="content-container my-12 small:my-16" data-testid="related-products-container">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
