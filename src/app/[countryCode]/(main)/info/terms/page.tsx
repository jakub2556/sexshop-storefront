import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Obchodné podmienky | SexShop",
  description: "Obchodné podmienky internetového obchodu SexShop.",
}

export default function TermsPage() {
  return (
    <div className="content-container py-12" style={{ minHeight: "60vh" }}>
      <h1 className="section-heading text-3xl mb-8" style={{ color: "var(--text-primary)" }}>
        Obchodné podmienky
      </h1>

      <div className="max-w-3xl space-y-8" style={{ color: "var(--text-secondary)" }}>
        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            1. Všeobecné ustanovenia
          </h2>
          <p className="text-sm leading-relaxed">
            Tieto obchodné podmienky upravujú práva a povinnosti zmluvných strán vyplývajúce
            z kúpnej zmluvy uzatvorenej medzi predávajúcim (SexShop s.r.o.) a kupujúcim,
            ktorej predmetom je kúpa a predaj tovaru prostredníctvom e-shopu predávajúceho.
            Kupujúci odoslaním objednávky potvrdzuje, že sa s týmito obchodnými podmienkami
            oboznámil a súhlasí s nimi.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            2. Objednávka a uzatvorenie zmluvy
          </h2>
          <p className="text-sm leading-relaxed">
            Objednávka kupujúceho je návrhom kúpnej zmluvy. Kúpna zmluva vzniká v okamihu
            doručenia záväzného súhlasu predávajúceho s návrhom kúpnej zmluvy kupujúcemu,
            t.j. záväzným potvrdením objednávky. Predávajúci je povinný potvrdiť e-mailovou
            správou obsah objednávky kupujúcemu, a to bezodkladne po jej doručení.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            3. Ceny a platobné podmienky
          </h2>
          <p className="text-sm leading-relaxed">
            Všetky ceny uvedené na stránkach e-shopu sú konečné, vrátane DPH. Predávajúci
            si vyhradzuje právo zmeny cien. Kupujúci platí cenu platnú v čase odoslania
            objednávky. Platbu je možné realizovať bankovým prevodom, kartou online,
            alebo dobierkou pri prevzatí zásielky.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            4. Dodacie podmienky
          </h2>
          <p className="text-sm leading-relaxed">
            Objednávky sú spravidla expedované do 1-3 pracovných dní od potvrdenia objednávky.
            Doručenie zabezpečujeme prostredníctvom kuriérskej služby alebo na výdajné miesto.
            Všetky zásielky sú balené diskrétne, bez akéhokoľvek označenia obsahu.
            Doprava je zdarma pri objednávkach nad 49 €.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            5. Odstúpenie od zmluvy
          </h2>
          <p className="text-sm leading-relaxed">
            Kupujúci má právo odstúpiť od zmluvy do 14 dní od prevzatia tovaru bez udania
            dôvodu v súlade so zákonom č. 102/2014 Z.z. Toto právo sa nevzťahuje na tovar
            uzatvorený v ochrannom obale, ktorý nie je vhodné vrátiť z dôvodu ochrany
            zdravia alebo z hygienických dôvodov a ktorého ochranný obal bol po doručení porušený.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            6. Záverečné ustanovenia
          </h2>
          <p className="text-sm leading-relaxed">
            Tieto obchodné podmienky nadobúdajú platnosť a účinnosť dňom ich zverejnenia.
            Predávajúci si vyhradzuje právo na zmenu obchodných podmienok. Vzťahy
            neupravené týmito obchodnými podmienkami sa riadia príslušnými právnymi
            predpismi Slovenskej republiky.
          </p>
        </section>
      </div>
    </div>
  )
}
