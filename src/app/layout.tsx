import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "SexShop - Premiumovy online obchod pre dospelych",
    template: "%s | SexShop",
  },
  description: "Siroka ponuka produktov pre dospelych. Diskretne balenie, rychle dorucenie po celom Slovensku.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="sk" data-mode="dark" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
