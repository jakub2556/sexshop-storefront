import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

  return (
    <footer style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-8 xsmall:flex-row items-start justify-between py-16">
          <div className="max-w-xs">
            <LocalizedClientLink href="/" className="text-2xl font-bold tracking-tight">
              <span style={{ color: "var(--text-primary)" }}>Sex</span><span className="text-rose-500">Shop</span>
            </LocalizedClientLink>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>Prémiový online obchod pre dospelých. Diskrétne balenie, rýchle doručenie.</p>
          </div>
          <div className="text-sm gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>Kategórie</span>
                <ul className="grid grid-cols-1 gap-2">
                  {productCategories.filter((c) => !c.parent_category).slice(0, 8).map((c) => (
                    <li key={c.id}><LocalizedClientLink className="hover:text-rose-400 transition-colors" style={{ color: "var(--text-secondary)" }} href={`/categories/${c.handle}`}>{c.name}</LocalizedClientLink></li>
                  ))}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>Kolekcie</span>
                <ul className="grid grid-cols-1 gap-2">
                  {collections.slice(0, 6).map((c) => (
                    <li key={c.id}><LocalizedClientLink className="hover:text-rose-400 transition-colors" style={{ color: "var(--text-secondary)" }} href={`/collections/${c.handle}`}>{c.title}</LocalizedClientLink></li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>Zákaznícky servis</span>
              <ul className="grid grid-cols-1 gap-y-2">
                <li><LocalizedClientLink className="hover:text-rose-400 transition-colors" style={{ color: "var(--text-secondary)" }} href="/info/about">O nás</LocalizedClientLink></li>
                <li><LocalizedClientLink className="hover:text-rose-400 transition-colors" style={{ color: "var(--text-secondary)" }} href="/info/contact">Kontakt</LocalizedClientLink></li>
                <li><LocalizedClientLink className="hover:text-rose-400 transition-colors" style={{ color: "var(--text-secondary)" }} href="/info/terms">Obchodné podmienky</LocalizedClientLink></li>
                <li><LocalizedClientLink className="hover:text-rose-400 transition-colors" style={{ color: "var(--text-secondary)" }} href="/info/privacy">Ochrana osobných údajov</LocalizedClientLink></li>
                <li><LocalizedClientLink className="hover:text-rose-400 transition-colors" style={{ color: "var(--text-secondary)" }} href="/info/returns">Reklamácie a vrátenie</LocalizedClientLink></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-8 justify-between pt-6" style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}>
          <Text className="text-xs">&copy; {new Date().getFullYear()} SexShop. Všetky práva vyhradené.</Text>
          <Text className="text-xs">Diskrétne balenie | Rýchle doručenie</Text>
        </div>
      </div>
    </footer>
  )
}
