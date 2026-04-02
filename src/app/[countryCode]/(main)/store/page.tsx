import { Metadata } from "next"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Obchod",
  description: "Prezrite si našu kompletnú ponuku produktov pre dospelých.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: string
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams

  return (
    <StoreTemplate
      sortBy={searchParams.sortBy}
      page={searchParams.page}
      countryCode={params.countryCode}
    />
  )
}
