import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-zinc-950/80 backdrop-blur-xl border-zinc-800/50">
        <nav className="content-container txt-xsmall-plus text-zinc-400 flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="font-display text-2xl font-bold hover:text-brand-400 transition-colors duration-200"
              data-testid="nav-store-link"
            >
              <span className="text-white">Sex</span>
              <span className="text-brand">Shop</span>
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-brand-400 transition-colors duration-200"
                href="/store"
              >
                Obchod
              </LocalizedClientLink>
              <LocalizedClientLink
                className="hover:text-brand-400 transition-colors duration-200"
                href="/account"
                data-testid="nav-account-link"
              >
                Moj ucet
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-brand-400 flex gap-2 transition-colors duration-200"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Kosik (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
