import LocalizedClientLink from "@modules/common/components/localized-client-link"

const LifestyleBanner = () => {
  return (
    <div className="content-container py-8">
      <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
        <LocalizedClientLink href="/categories/vibratory" className="group">
          <div className="relative rounded-2xl overflow-hidden h-[200px] small:h-[260px]" style={{ background: "linear-gradient(135deg, #1C1025 0%, #2D1B3D 100%)", border: "1px solid var(--border)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600/10 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full p-8">
              <span className="text-rose-400 text-xs uppercase tracking-widest mb-2">Najpredávanejšie</span>
              <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>Vibrátory</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Objavte našu najširšiu kolekciu</p>
              <span className="text-rose-400 text-sm font-medium mt-3 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Prezrieť →
              </span>
            </div>
          </div>
        </LocalizedClientLink>

        <LocalizedClientLink href="/categories/sexy-bielizen" className="group">
          <div className="relative rounded-2xl overflow-hidden h-[200px] small:h-[260px]" style={{ background: "linear-gradient(135deg, #1C1025 0%, #2D1B3D 100%)", border: "1px solid var(--border)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full p-8">
              <span className="text-pink-400 text-xs uppercase tracking-widest mb-2">Novinky</span>
              <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>Sexy bielizeň</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Pre ňu aj pre neho</p>
              <span className="text-pink-400 text-sm font-medium mt-3 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Prezrieť →
              </span>
            </div>
          </div>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default LifestyleBanner
