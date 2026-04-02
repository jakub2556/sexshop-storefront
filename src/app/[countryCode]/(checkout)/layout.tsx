import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full relative small:min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="h-16 border-b" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi flex items-center gap-x-2 uppercase flex-1 basis-0"
            style={{ color: "var(--text-secondary)" }}
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus hover:text-rose-400 transition-colors">
              Späť do košíka
            </span>
            <span className="mt-px block small:hidden txt-compact-plus hover:text-rose-400 transition-colors">
              Späť
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
            data-testid="store-link"
          >
            <span style={{ color: "var(--text-primary)" }}>Sex</span>
            <span className="text-rose-500">Shop</span>
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-4 w-full flex items-center justify-center" style={{ color: "var(--text-secondary)" }}>
        <span className="text-xs">&copy; {new Date().getFullYear()} SexShop</span>
      </div>
    </div>
  )
}
