"use client"

import { useState } from "react"

const faqs = [
  { q: "Ako je balenie diskrétne?", a: "Každá objednávka je balená v neutrálnom hnedom kartóne bez akýchkoľvek označení. Na doručovacom štítku je uvedený len váš údaj a neutrálny názov odosielateľa." },
  { q: "Ako rýchlo doručíte objednávku?", a: "Objednávky prijaté do 14:00 odosielame v ten istý deň. Štandardné doručenie na Slovensku trvá 1-2 pracovné dni." },
  { q: "Môžem vrátiť tovar?", a: "Áno, neotvorený tovar v originálnom balení môžete vrátiť do 14 dní od doručenia bez udania dôvodu." },
  { q: "Aké platobné metódy prijímate?", a: "Prijímame platby kartou (Visa, Mastercard), bankovým prevodom a na dobierku. Všetky platby sú šifrované." },
  { q: "Je nákup na vašom webe bezpečný?", a: "Absolútne. Používame šifrované SSL pripojenie a vaše osobné údaje nikdy nezdieľame s tretími stranami." },
  { q: "Posielate aj do Česka?", a: "Momentálne doručujeme len na Slovensko. Na rozšírení do Česka pracujeme." },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="content-container py-16 small:py-24">
      <div className="text-center mb-12">
        <h2 className="section-heading mb-3">Často kladené otázky</h2>
        <p style={{ color: "var(--text-secondary)" }}>Všetko čo potrebujete vedieť pred nákupom</p>
      </div>
      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex justify-between items-center py-5 text-left group">
              <span className="font-medium text-sm small:text-base pr-4 group-hover:text-rose-400 transition-colors" style={{ color: "var(--text-primary)" }}>{faq.q}</span>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-300 flex-shrink-0 ${openIndex === i ? "bg-rose-600 text-white rotate-45" : "text-rose-400"}`} style={openIndex !== i ? { border: "1px solid var(--border)" } : {}}>+</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 pb-5" : "max-h-0"}`}>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
