import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import AgeGate from "@modules/common/components/age-gate"
import BackToTop from "@modules/common/components/back-to-top"
import CookieConsent from "@modules/common/components/cookie-consent"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "SexShop - Prémiový online obchod pre dospelých",
    template: "%s | SexShop",
  },
  description: "Široká ponuka produktov pre dospelých. Diskrétne balenie, rýchle doručenie po celom Slovensku.",
  openGraph: {
    title: "SexShop - Prémiový online obchod pre dospelých",
    description: "Široká ponuka produktov pre dospelých. Diskrétne balenie, rýchle doručenie po celom Slovensku.",
    type: "website",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="sk" className="dark">
      <body className="antialiased" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <AgeGate />
        <main className="relative">{props.children}</main>
        <BackToTop />
        <CookieConsent />
      </body>
    </html>
  )
}
