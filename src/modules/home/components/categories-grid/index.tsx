import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categories = [
  { name: "Vibrátory", handle: "vibratory" },
  { name: "Dildá", handle: "dilda" },
  { name: "Sexy bielizeň", handle: "sexy-bielizen" },
  { name: "BDSM", handle: "bdsm" },
  { name: "Lubrikačné gély", handle: "lubrikacne-gely" },
  { name: "Kondómy", handle: "kondomy" },
  { name: "Masturbátory", handle: "masturbatory" },
  { name: "Erotické hračky", handle: "eroticke-hracky" },
]

const CategoriesGrid = () => {
  return (
    <div className="content-container py-16 small:py-24">
      <div className="text-center mb-12">
        <h2 className="section-heading mb-3">Nakupujte podľa kategórií</h2>
        <p style={{ color: "var(--text-secondary)" }}>Vyberte si z našej širokej ponuky produktov</p>
      </div>
      <div className="grid grid-cols-2 small:grid-cols-4 gap-3">
        {categories.map((cat) => (
          <LocalizedClientLink key={cat.handle} href={`/categories/${cat.handle}`} className="group">
            <div className="dark-card p-5 text-center hover:-translate-y-1 transition-all duration-300">
              <h3 className="font-semibold text-sm group-hover:text-rose-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                {cat.name}
              </h3>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}

export default CategoriesGrid
