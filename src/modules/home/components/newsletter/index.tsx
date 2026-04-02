"use client"

const Newsletter = () => {
  return (
    <div style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="content-container py-14">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="section-heading text-2xl small:text-3xl mb-3">Získajte 10% zľavu</h2>
          <p className="mb-6 text-sm" style={{ color: "var(--text-secondary)" }}>Prihláste sa na odber noviniek a získajte zľavový kód na prvú objednávku</p>
          <form className="flex flex-col small:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Váš email..." className="flex-1 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/30 transition-all" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
            <button type="submit" className="btn-primary whitespace-nowrap">Odoslať</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
