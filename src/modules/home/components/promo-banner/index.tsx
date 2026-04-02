const PromoBanner = () => {
  return (
    <div className="content-container py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 to-rose-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 flex flex-col small:flex-row items-center justify-between px-8 small:px-16 py-12 small:py-14 gap-8">
          <div className="text-center small:text-left">
            <h2 className="font-bold text-3xl small:text-4xl text-white mb-3" style={{ fontFamily: "'DM Serif Display', serif" }}>Diskrétne balenie</h2>
            <p className="text-rose-100 text-base max-w-md">Každá objednávka je balená v neutrálnom obale. Vaše súkromie je naša priorita.</p>
          </div>
          <div className="flex gap-10 text-center">
            <div><div className="text-3xl font-bold text-white mb-1">24h</div><div className="text-rose-200 text-sm">Odoslanie</div></div>
            <div className="w-px bg-white/20" />
            <div><div className="text-3xl font-bold text-white mb-1">100%</div><div className="text-rose-200 text-sm">Diskrétne</div></div>
            <div className="w-px bg-white/20" />
            <div><div className="text-3xl font-bold text-white mb-1">7300+</div><div className="text-rose-200 text-sm">Produktov</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoBanner
