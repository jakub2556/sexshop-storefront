import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-zinc-800 w-full bg-zinc-950">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-20">
          <div>
            <LocalizedClientLink
              href="/"
              className="font-display text-2xl font-bold"
            >
              <span className="text-white">Sex</span>
              <span className="text-brand">Shop</span>
            </LocalizedClientLink>
            <p className="text-zinc-500 text-sm mt-4 max-w-xs">
              Premiumovy online obchod pre dospelych. Diskretne balenie, rychle dorucenie.
            </p>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-sm font-semibold text-zinc-200">
                  Kategorie
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-zinc-500 text-sm"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-brand-400 transition-colors duration-200",
                            children && "font-medium text-zinc-400"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-brand-400 transition-colors duration-200"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-sm font-semibold text-zinc-200">
                  Kolekcie
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-zinc-500 text-sm",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-brand-400 transition-colors duration-200"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="text-sm font-semibold text-zinc-200">Informacie</span>
              <ul className="grid grid-cols-1 gap-y-2 text-zinc-500 text-sm">
                <li>
                  <LocalizedClientLink
                    className="hover:text-brand-400 transition-colors duration-200"
                    href="/store"
                  >
                    Obchod
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-brand-400 transition-colors duration-200"
                    href="/account"
                  >
                    Moj ucet
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-brand-400 transition-colors duration-200"
                    href="/cart"
                  >
                    Kosik
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-10 justify-between text-zinc-600 border-t border-zinc-800/50 pt-6">
          <Text className="text-xs">
            &copy; {new Date().getFullYear()} SexShop. Vsetky prava vyhradene.
          </Text>
          <Text className="text-xs">
            Diskretne balenie | Rychle dorucenie
          </Text>
        </div>
      </div>
    </footer>
  )
}
