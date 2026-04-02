import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import TrustBadges from "@modules/home/components/trust-badges"
import CategoriesGrid from "@modules/home/components/categories-grid"
import PromoBanner from "@modules/home/components/promo-banner"
import BrandsStrip from "@modules/home/components/brands-strip"
import FeaturesSection from "@modules/home/components/features-section"
import LifestyleBanner from "@modules/home/components/lifestyle-banner"
import InfoBlocks from "@modules/home/components/info-blocks"
import CategorySpotlight from "@modules/home/components/category-spotlight"
import FAQ from "@modules/home/components/faq"
import Newsletter from "@modules/home/components/newsletter"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "SexShop - Prémiový online obchod pre dospelých",
  description:
    "Široká ponuka produktov pre dospelých. Diskrétne balenie, rýchle doručenie po celom Slovensku. Vibrátory, dildá, sexy bielizeň, BDSM a viac.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)
  const { collections } = await listCollections({ fields: "id, handle, title" })

  if (!collections || !region) return null

  // Split collections
  const bestsellery = collections.find(c => c.handle === "bestsellery")
  const novinky = collections.find(c => c.handle === "novinky")
  const akciove = collections.find(c => c.handle === "akciove-produkty")

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Trust badges */}
      <TrustBadges />

      {/* 3. Kategórie */}
      <CategoriesGrid />

      {/* 4. Bestsellery slider */}
      {bestsellery && (
        <ul className="flex flex-col">
          <FeaturedProducts collections={[bestsellery]} region={region} />
        </ul>
      )}

      {/* 5. Lifestyle bannery (vibrátory + bielizeň) */}
      <LifestyleBanner />

      {/* 6. Novinky slider */}
      {novinky && (
        <ul className="flex flex-col">
          <FeaturedProducts collections={[novinky]} region={region} />
        </ul>
      )}

      {/* 7. Info bloky (7300+ produktov, 50+ značiek, 24h) */}
      <InfoBlocks />

      {/* 8. Akciové produkty slider */}
      {akciove && (
        <ul className="flex flex-col">
          <FeaturedProducts collections={[akciove]} region={region} />
        </ul>
      )}

      {/* 9. Category spotlight (BDSM, Lubrikácia, Masturbátory) */}
      <CategorySpotlight />

      {/* 10. Promo banner */}
      <PromoBanner />

      {/* 11. Prečo nakupovať u nás */}
      <FeaturesSection />

      {/* 12. Značky */}
      <BrandsStrip />

      {/* 13. Newsletter */}
      <Newsletter />

      {/* 14. FAQ */}
      <FAQ />
    </>
  )
}
