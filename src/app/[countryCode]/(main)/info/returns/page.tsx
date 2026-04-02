import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reklamačný poriadok | SexShop",
  description: "Reklamačný poriadok a podmienky vrátenia tovaru.",
}

export default function ReturnsPage() {
  return (
    <div className="content-container py-12" style={{ minHeight: "60vh" }}>
      <h1 className="section-heading text-3xl mb-8" style={{ color: "var(--text-primary)" }}>
        Reklamačný poriadok
      </h1>

      <div className="max-w-3xl space-y-8" style={{ color: "var(--text-secondary)" }}>
        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            1. Všeobecné ustanovenia
          </h2>
          <p className="text-sm leading-relaxed">
            Tento reklamačný poriadok upravuje spôsob a podmienky reklamácie vád tovaru
            zakúpeného prostredníctvom e-shopu SexShop s.r.o. v súlade s platnými právnymi
            predpismi Slovenskej republiky, najmä zákonom č. 40/1964 Zb. (Občiansky zákonník)
            a zákonom č. 250/2007 Z.z. o ochrane spotrebiteľa.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            2. Záručná doba
          </h2>
          <p className="text-sm leading-relaxed">
            Záručná doba na tovar je 24 mesiacov odo dňa prevzatia tovaru kupujúcim.
            Záručná doba sa predlžuje o dobu, počas ktorej kupujúci nemohol používať
            tovar z dôvodu záručnej opravy. Na vybrané produkty (napr. elektronické
            pomôcky) sa môže vzťahovať špeciálna záručná lehota stanovená výrobcom.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            3. Uplatnenie reklamácie
          </h2>
          <p className="text-sm leading-relaxed mb-3">
            Reklamáciu je možné uplatniť nasledovne:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>E-mailom na adresu info@sexshop.sk s popisom vady a fotografiou</li>
            <li>Telefonicky na čísle +421 900 123 456</li>
            <li>Písomne na adresu sídla spoločnosti</li>
          </ul>
          <p className="text-sm leading-relaxed mt-3">
            K reklamácii je potrebné priložiť kópiu dokladu o zakúpení (faktúru) a popis vady.
            Reklamovaný tovar zašlite na adresu sídla spoločnosti.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            4. Vybavenie reklamácie
          </h2>
          <p className="text-sm leading-relaxed">
            Predávajúci je povinný vybaviť reklamáciu do 30 dní odo dňa jej uplatnenia.
            O výsledku reklamácie bude kupujúci informovaný e-mailom alebo telefonicky.
            Predávajúci vydá kupujúcemu potvrdenie o uplatnení reklamácie a o spôsobe
            jej vybavenia.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            5. Výnimky z reklamácie
          </h2>
          <p className="text-sm leading-relaxed mb-3">
            Reklamácia sa nevzťahuje na:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Bežné opotrebovanie tovaru spôsobené jeho používaním</li>
            <li>Vady spôsobené nesprávnym používaním alebo údržbou</li>
            <li>Mechanické poškodenie tovaru kupujúcim</li>
            <li>Tovar s porušeným ochranným obalom z hygienických dôvodov (napr. lubrikačné gély, intímne pomôcky po otvorení balenia)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            6. Vrátenie tovaru (odstúpenie od zmluvy)
          </h2>
          <p className="text-sm leading-relaxed">
            Kupujúci má právo odstúpiť od zmluvy do 14 dní od prevzatia tovaru bez udania
            dôvodu. Tovar musí byť vrátený nepoužitý, v pôvodnom nepoškodenom obale.
            Náklady na vrátenie tovaru znáša kupujúci. Predávajúci vráti kupujúcemu
            zaplatenú sumu do 14 dní od doručenia vráteného tovaru.
          </p>
        </section>
      </div>
    </div>
  )
}
