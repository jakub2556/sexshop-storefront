import { Metadata } from "next"

export const metadata: Metadata = {
  title: "O nás | SexShop",
  description: "Spoznajte náš príbeh. Prémiový online sexshop na Slovensku.",
}

export default function AboutPage() {
  return (
    <div className="content-container py-12" style={{ minHeight: "60vh" }}>
      <h1 className="section-heading text-3xl mb-8" style={{ color: "var(--text-primary)" }}>
        O nás
      </h1>

      <div className="max-w-3xl space-y-6" style={{ color: "var(--text-secondary)" }}>
        <p className="text-base leading-relaxed">
          Vitajte v našom prémiovom online obchode pre dospelých. Sme slovenský e-shop, ktorý
          vznikol s jasnou víziou — priniesť kvalitné produkty pre intímny život na jedno miesto,
          s dôrazom na diskrétnosť, pohodlie a profesionálny prístup.
        </p>

        <p className="text-base leading-relaxed">
          Naša ponuka zahŕňa viac ako 7 000 produktov od popredných svetových značiek. Od
          vibrátorov a masážnych pomôcok, cez sexy bielizeň, lubrikačné gély, BDSM doplnky
          až po erotické hry pre páry — nájdete u nás všetko, čo obohatí váš intímny život.
        </p>

        <p className="text-base leading-relaxed">
          Kladieme dôraz na:
        </p>

        <ul className="list-disc list-inside space-y-2 text-base" style={{ color: "var(--text-secondary)" }}>
          <li><strong style={{ color: "var(--text-primary)" }}>Diskrétne balenie</strong> — každá zásielka je balená v neutrálnom obale bez akéhokoľvek označenia obsahu</li>
          <li><strong style={{ color: "var(--text-primary)" }}>Rýchle doručenie</strong> — väčšinu objednávok odosielame do 24 hodín</li>
          <li><strong style={{ color: "var(--text-primary)" }}>Kvalitné produkty</strong> — spolupracujeme len s overenými výrobcami a distribútormi</li>
          <li><strong style={{ color: "var(--text-primary)" }}>Zákaznícky servis</strong> — sme tu pre vás a radi poradíme s výberom</li>
        </ul>

        <p className="text-base leading-relaxed">
          Veríme, že intímny život je dôležitou súčasťou spokojného vzťahu a osobnej pohody.
          Preto sa snažíme vytvoriť príjemné a bezpečné prostredie pre nakupovanie, kde sa
          každý cíti komfortne.
        </p>

        <p className="text-base leading-relaxed" style={{ color: "var(--text-primary)" }}>
          Ďakujeme, že ste si vybrali práve nás.
        </p>
      </div>
    </div>
  )
}
