"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const hasProductInfo = product.material || product.origin_country || product.type || product.weight || (product.length && product.width && product.height)

  const tabs = [
    ...(hasProductInfo ? [{
      label: "Informácie o produkte",
      component: <ProductInfoTab product={product} />,
    }] : []),
    {
      label: "Doručenie a vrátenie",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          {product.material && (
            <div>
              <span className="font-semibold text-neutral-200">Materiál</span>
              <p className="text-neutral-400">{product.material}</p>
            </div>
          )}
          {product.origin_country && (
            <div>
              <span className="font-semibold text-neutral-200">Krajina pôvodu</span>
              <p className="text-neutral-400">{product.origin_country}</p>
            </div>
          )}
          {product.type && (
            <div>
              <span className="font-semibold text-neutral-200">Typ</span>
              <p className="text-neutral-400">{product.type.value}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-4">
          {product.weight && (
            <div>
              <span className="font-semibold text-neutral-200">Hmotnosť</span>
              <p className="text-neutral-400">{product.weight} g</p>
            </div>
          )}
          {product.length && product.width && product.height && (
            <div>
              <span className="font-semibold text-neutral-200">Rozmery</span>
              <p className="text-neutral-400">{product.length} x {product.width} x {product.height} cm</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold text-neutral-200">📦 Rýchle doručenie</span>
            <p className="max-w-sm text-neutral-400">
              Vašu objednávku odosielame do 24 hodín. Doručenie na Slovensku trvá 1-2 pracovné dni.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold text-neutral-200">🔄 Výmena tovaru</span>
            <p className="max-w-sm text-neutral-400">
              Nesedí vám veľkosť? Žiadny problém - vymeníme vám produkt za nový.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold text-neutral-200">↩️ Jednoduché vrátenie</span>
            <p className="max-w-sm text-neutral-400">
              Neotvorený tovar môžete vrátiť do 14 dní bez udania dôvodu. Vrátenie je jednoduché a bezproblémové.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
