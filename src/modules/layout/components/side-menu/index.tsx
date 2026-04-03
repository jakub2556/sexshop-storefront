"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useState, useEffect } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"

type Category = { id: string; name: string; handle: string; parent_category_id: string | null; category_children?: Category[] }

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()
  const [activeTab, setActiveTab] = useState<"categories" | "menu">("categories")
  const [categories, setCategories] = useState<Category[]>([])

  const PK = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
  const BACKEND = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://173.249.39.158:9000"

  useEffect(() => {
    fetch(`${BACKEND}/store/product-categories?fields=*category_children&limit=100`, {
      headers: { "x-publishable-api-key": PK },
    }).then(r => r.json()).then(d => setCategories(d?.product_categories || [])).catch(() => {})
  }, [])

  const rootCategories = categories.filter(c => !c.parent_category_id)

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button data-testid="nav-menu-button" className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-rose-400" style={{ color: "var(--text-secondary)" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                </Popover.Button>
              </div>

              {open && <div className="fixed inset-0 z-[50] bg-black/50 pointer-events-auto" onClick={close} />}

              <Transition show={open} as={Fragment}
                enter="transition ease-out duration-200" enterFrom="opacity-0 -translate-x-full" enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-x-0" leaveTo="opacity-0 -translate-x-full">
                <PopoverPanel className="flex flex-col absolute w-[300px] h-[calc(100vh-1rem)] z-[51] left-0 top-0 m-2">
                  <div data-testid="nav-menu-popup" className="flex flex-col h-full rounded-2xl justify-between overflow-hidden" style={{ background: "var(--bg-primary)", border: "1px solid var(--border)" }}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4" style={{ borderBottom: "1px solid var(--border)" }}>
                      <span className="font-bold"><span style={{ color: "var(--text-primary)" }}>Sex</span><span className="text-rose-500">Shop</span></span>
                      <button data-testid="close-menu-button" onClick={close} style={{ color: "var(--text-secondary)" }}>
                        <XMark />
                      </button>
                    </div>

                    {/* Tab switcher */}
                    <div className="flex" style={{ borderBottom: "1px solid var(--border)" }}>
                      <button onClick={() => setActiveTab("categories")} className="flex-1 py-2.5 text-xs font-semibold text-center transition-colors"
                        style={{ color: activeTab === "categories" ? "#E11D48" : "var(--text-secondary)", borderBottom: activeTab === "categories" ? "2px solid #E11D48" : "2px solid transparent" }}>
                        Kategórie
                      </button>
                      <button onClick={() => setActiveTab("menu")} className="flex-1 py-2.5 text-xs font-semibold text-center transition-colors"
                        style={{ color: activeTab === "menu" ? "#E11D48" : "var(--text-secondary)", borderBottom: activeTab === "menu" ? "2px solid #E11D48" : "2px solid transparent" }}>
                        Menu
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-3">
                      {activeTab === "categories" ? (
                        <div className="flex flex-col gap-0.5">
                          {rootCategories.map(cat => (
                            <div key={cat.id}>
                              <LocalizedClientLink href={`/categories/${cat.handle}`} onClick={close}
                                className="flex items-center justify-between py-2 px-3 rounded-xl text-sm font-medium transition-colors hover:text-rose-400"
                                style={{ color: "var(--text-primary)" }}>
                                <span className="truncate">{cat.name}</span>
                                {(cat.category_children?.length || 0) > 0 && (
                                  <span className="text-[10px] ml-2 flex-shrink-0" style={{ color: "var(--text-muted)" }}>{cat.category_children?.length}</span>
                                )}
                              </LocalizedClientLink>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="flex flex-col gap-1">
                          {[
                            { href: "/", name: "Domov" },
                            { href: "/store", name: "Obchod" },
                            { href: "/wishlist", name: "Obľúbené" },
                            { href: "/account", name: "Môj účet" },
                            { href: "/cart", name: "Košík" },
                            { href: "/info/about", name: "O nás" },
                            { href: "/info/contact", name: "Kontakt" },
                            { href: "/info/terms", name: "Obchodné podmienky" },
                            { href: "/info/privacy", name: "Ochrana údajov" },
                          ].map(item => (
                            <li key={item.href}>
                              <LocalizedClientLink href={item.href} onClick={close}
                                className="block py-2.5 px-3 rounded-xl text-sm transition-colors hover:text-rose-400"
                                style={{ color: "var(--text-primary)" }}>
                                {item.name}
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-3" style={{ borderTop: "1px solid var(--border)" }}>
                      <Text className="text-center text-[10px]" style={{ color: "var(--text-muted)" }}>
                        &copy; {new Date().getFullYear()} SexShop
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
