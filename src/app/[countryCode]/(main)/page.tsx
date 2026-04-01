import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import PromoBanner from "@modules/home/components/promo-banner"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "SexShop - Premiumovy online obchod pre dospelych",
  description:
    "Siroka ponuka produktov pre dospelych. Diskretne balenie, rychle dorucenie po celom Slovensku.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <ul className="flex flex-col">
        <FeaturedProducts collections={collections} region={region} />
      </ul>
      <PromoBanner />
    </>
  )
}
