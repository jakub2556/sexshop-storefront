const features = [
  {
    title: "Široký výber",
    desc: "Viac ako 7 300 produktov od svetových značiek. Vibrátory, dildá, bielizeň, BDSM a oveľa viac.",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-400",
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>,
  },
  {
    title: "Expertné poradenstvo",
    desc: "Detailné popisy produktov, vlastnosti a odporúčania pre správny výber.",
    gradient: "from-purple-500/20 to-indigo-500/20",
    iconColor: "text-purple-400",
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>,
  },
  {
    title: "Bezpečné materiály",
    desc: "Všetky produkty sú vyrobené z certifikovaných, telu bezpečných materiálov bez ftalátov.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  },
]

const FeaturesSection = () => {
  return (
    <div className="content-container py-16 small:py-24">
      <div className="text-center mb-12">
        <h2 className="section-heading mb-3">Prečo nakupovať u nás</h2>
        <p style={{ color: "var(--text-secondary)" }}>Váš spokojný zážitok je naša priorita</p>
      </div>
      <div className="grid grid-cols-1 small:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 ${f.iconColor}`}>
              {f.icon}
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturesSection
