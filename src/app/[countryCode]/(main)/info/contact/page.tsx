import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt | SexShop",
  description: "Kontaktujte nás. E-mail, telefón a ďalšie kontaktné údaje.",
}

export default function ContactPage() {
  return (
    <div className="content-container py-12" style={{ minHeight: "60vh" }}>
      <h1 className="section-heading text-3xl mb-8" style={{ color: "var(--text-primary)" }}>
        Kontakt
      </h1>

      <div className="max-w-3xl space-y-8">
        <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Máte otázky ohľadom objednávky, produktov alebo potrebujete poradiť s výberom?
          Neváhajte nás kontaktovať. Radi vám pomôžeme.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-6 rounded-2xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="text-rose-400 text-lg mb-2">E-mail</div>
            <a
              href="mailto:info@sexshop.sk"
              className="text-base hover:text-rose-400 transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              info@sexshop.sk
            </a>
            <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
              Odpovieme do 24 hodín
            </p>
          </div>

          <div
            className="p-6 rounded-2xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="text-rose-400 text-lg mb-2">Telefón</div>
            <a
              href="tel:+421900123456"
              className="text-base hover:text-rose-400 transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              +421 900 123 456
            </a>
            <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
              Po - Pi: 9:00 - 17:00
            </p>
          </div>
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="text-rose-400 text-lg mb-3">Firemné údaje</div>
          <div className="space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
            <p style={{ color: "var(--text-primary)" }}>SexShop s.r.o.</p>
            <p>Hlavná 123, 811 01 Bratislava</p>
            <p>IČO: 12 345 678</p>
            <p>DIČ: 2012345678</p>
            <p>IČ DPH: SK2012345678</p>
          </div>
        </div>
      </div>
    </div>
  )
}
