const InfoBlocks = () => {
  return (
    <div className="content-container py-12">
      <div className="grid grid-cols-1 small:grid-cols-3 gap-4">
        <div className="rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg, rgba(225,29,72,0.08), rgba(225,29,72,0.02))", border: "1px solid rgba(225,29,72,0.1)" }}>
          <div className="text-3xl font-bold text-rose-400 mb-1">7 300+</div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Produktov na sklade</div>
        </div>
        <div className="rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(168,85,247,0.02))", border: "1px solid rgba(168,85,247,0.1)" }}>
          <div className="text-3xl font-bold text-purple-400 mb-1">50+</div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Svetových značiek</div>
        </div>
        <div className="rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.08), rgba(52,211,153,0.02))", border: "1px solid rgba(52,211,153,0.1)" }}>
          <div className="text-3xl font-bold text-emerald-400 mb-1">24h</div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Odoslanie objednávky</div>
        </div>
      </div>
    </div>
  )
}

export default InfoBlocks
