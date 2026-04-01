const PromoBanner = () => {
  return (
    <div className="content-container py-12 small:py-20">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-950 via-zinc-900 to-brand-950 border border-brand-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.1),_transparent_70%)]" />
        <div className="relative z-10 flex flex-col small:flex-row items-center justify-between px-8 small:px-16 py-12 small:py-16 gap-8">
          <div className="text-center small:text-left">
            <h2 className="font-display text-3xl small:text-4xl text-white mb-3">
              Diskretne balenie
            </h2>
            <p className="text-zinc-400 text-lg max-w-md">
              Kazda objednavka je balena v neutralnom obale bez akychkolvek oznaceni. Vasa sukromnost je nasa priorita.
            </p>
          </div>
          <div className="flex gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-400 mb-1">24h</div>
              <div className="text-zinc-500 text-sm">Odoslanie</div>
            </div>
            <div className="w-px bg-zinc-800" />
            <div>
              <div className="text-3xl font-bold text-brand-400 mb-1">100%</div>
              <div className="text-zinc-500 text-sm">Diskretne</div>
            </div>
            <div className="w-px bg-zinc-800" />
            <div>
              <div className="text-3xl font-bold text-brand-400 mb-1">SK</div>
              <div className="text-zinc-500 text-sm">Dorucenie</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoBanner
