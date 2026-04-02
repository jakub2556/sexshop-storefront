import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: "linear-gradient(135deg, #13111C 0%, #1C1025 40%, #231428 60%, #13111C 100%)" }}>
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-rose-600/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/6 rounded-full blur-[100px]" />

      <div className="content-container py-24 small:py-36 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-rose-400 uppercase tracking-[0.3em] text-xs font-semibold mb-6 animate-fade-in animate-delay-1">
            Prémiový obchod pre dospelých
          </p>
          <h1 className="section-heading text-5xl small:text-7xl leading-tight mb-6 animate-fade-in animate-delay-2">
            Objavte svet <span className="text-rose-500 italic">potešenia</span>
          </h1>
          <p className="text-lg max-w-lg mx-auto mb-10 leading-relaxed animate-fade-in animate-delay-3" style={{ color: "var(--text-secondary)" }}>
            Diskrétne balenie. Rýchle doručenie. Najväčší výber pre dospelých na Slovensku.
          </p>
          <div className="flex flex-col small:flex-row gap-4 justify-center animate-fade-in animate-delay-3">
            <LocalizedClientLink href="/store">
              <button className="btn-primary text-base px-10">Prezrieť produkty</button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/store">
              <button className="btn-outline text-base px-10">Kategórie</button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
