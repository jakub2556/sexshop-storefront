import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ochrana osobných údajov | SexShop",
  description: "Zásady ochrany osobných údajov a spracúvanie osobných údajov podľa GDPR.",
}

export default function PrivacyPage() {
  return (
    <div className="content-container py-12" style={{ minHeight: "60vh" }}>
      <h1 className="section-heading text-3xl mb-8" style={{ color: "var(--text-primary)" }}>
        Ochrana osobných údajov
      </h1>

      <div className="max-w-3xl space-y-8" style={{ color: "var(--text-secondary)" }}>
        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            1. Prevádzkovateľ osobných údajov
          </h2>
          <p className="text-sm leading-relaxed">
            Prevádzkovateľom osobných údajov je spoločnosť SexShop s.r.o., so sídlom
            Hlavná 123, 811 01 Bratislava, IČO: 12 345 678. Osobné údaje spracúvame
            v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR)
            a zákonom č. 18/2018 Z.z. o ochrane osobných údajov.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            2. Aké údaje zbierame
          </h2>
          <p className="text-sm leading-relaxed mb-3">
            Pri objednávke zbierame nasledovné osobné údaje:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Meno a priezvisko</li>
            <li>Adresa doručenia a fakturačná adresa</li>
            <li>E-mailová adresa</li>
            <li>Telefónne číslo</li>
            <li>Údaje o objednávke a platbe</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            3. Účel spracúvania
          </h2>
          <p className="text-sm leading-relaxed">
            Osobné údaje spracúvame za účelom vybavenia objednávky, doručenia tovaru,
            vystavenia daňového dokladu, riešenia reklamácií a prípadnej komunikácie
            s kupujúcim. V prípade udelenia súhlasu spracúvame e-mailovú adresu aj
            na marketingové účely (zasielanie newslettera).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            4. Doba uchovávania
          </h2>
          <p className="text-sm leading-relaxed">
            Osobné údaje uchovávame po dobu nevyhnutnú na splnenie účelu ich spracúvania,
            najdlhšie však po dobu stanovenú príslušnými právnymi predpismi (napr. účtovné
            doklady 10 rokov). Údaje spracúvané na základe súhlasu uchovávame do jeho odvolania.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            5. Práva dotknutej osoby
          </h2>
          <p className="text-sm leading-relaxed mb-3">
            Ako dotknutá osoba máte právo:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Na prístup k svojim osobným údajom</li>
            <li>Na opravu nesprávnych údajov</li>
            <li>Na vymazanie údajov (právo byť zabudnutý)</li>
            <li>Na obmedzenie spracúvania</li>
            <li>Na prenosnosť údajov</li>
            <li>Namietať proti spracúvaniu</li>
            <li>Odvolať súhlas so spracúvaním</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            6. Cookies
          </h2>
          <p className="text-sm leading-relaxed">
            Naša webová stránka používa súbory cookies na zabezpečenie správnej funkčnosti,
            analýzu návštevnosti a personalizáciu obsahu. Nevyhnutné cookies sú potrebné
            na fungovanie stránky. Analytické a marketingové cookies používame len s vaším
            súhlasom, ktorý môžete kedykoľvek odvolať.
          </p>
        </section>
      </div>
    </div>
  )
}
