import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-zinc-950">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-zinc-950 to-zinc-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(225,29,72,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(236,72,153,0.1),_transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
        <div className="max-w-3xl">
          <p className="text-brand-400 uppercase tracking-[0.3em] text-sm font-medium mb-6">
            Premiumovy obchod pre dospelych
          </p>
          <h1 className="font-display text-5xl small:text-7xl font-bold text-white leading-tight mb-6">
            Objavte svet
            <span className="block bg-gradient-to-r from-brand-400 to-pink-400 bg-clip-text text-transparent">
              potesenia
            </span>
          </h1>
          <p className="text-zinc-400 text-lg small:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Diskretne balenie. Rychle dorucenie. Najvacsi vyber pre dospelych na Slovensku.
          </p>
          <div className="flex flex-col small:flex-row gap-4 justify-center">
            <LocalizedClientLink href="/store">
              <button className="btn-brand text-lg">
                Prezriet produkty
              </button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/categories">
              <button className="px-8 py-3 rounded-lg border border-zinc-700 text-zinc-300 font-medium hover:border-brand-400 hover:text-brand-400 transition-all duration-300 text-lg">
                Kategorie
              </button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
    </div>
  )
}

export default Hero
