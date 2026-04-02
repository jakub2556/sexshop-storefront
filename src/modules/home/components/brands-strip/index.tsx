const brands = [
  "Satisfyer", "Durex", "Lovense", "LELO", "We-Vibe",
  "Womanizer", "Svakom", "Fleshlight", "Tenga", "Cottelli",
]

const BrandsStrip = () => {
  return (
    <div className="content-container py-12">
      <p className="text-center text-xs uppercase tracking-[0.2em] mb-8" style={{ color: "var(--text-secondary)" }}>
        Značky ktorým dôverujeme
      </p>
      <div className="flex flex-wrap justify-center gap-6 small:gap-10">
        {brands.map((brand) => (
          <span
            key={brand}
            className="text-sm font-semibold tracking-wide opacity-40 hover:opacity-100 hover:text-rose-400 transition-all duration-300 cursor-default"
            style={{ color: "var(--text-primary)" }}
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  )
}

export default BrandsStrip
