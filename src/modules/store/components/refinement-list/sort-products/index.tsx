"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Najnovšie",
  },
  {
    value: "price_asc",
    label: "Cena: od najnižšej",
  },
  {
    value: "price_desc",
    label: "Cena: od najvyššej",
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <FilterRadioGroup
      title="Zoradiť podľa"
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
