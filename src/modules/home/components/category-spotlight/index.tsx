import LocalizedClientLink from "@modules/common/components/localized-client-link"

const spots = [
  { title: "BDSM", desc: "Putá, bičíky, masky a doplnky", handle: "bdsm", gradient: "from-gray-700/30 to-gray-900/30" },
  { title: "Lubrikácia", desc: "Gély a oleje na vodnej báze", handle: "lubrikacne-gely", gradient: "from-blue-700/20 to-indigo-900/20" },
  { title: "Masturbátory", desc: "Pre mužov - Fleshlight, Tenga", handle: "masturbatory", gradient: "from-orange-700/20 to-red-900/20" },
]

const CategorySpotlight = () => {
  return (
    <div className="content-container py-8">
      <div className="grid grid-cols-1 small:grid-cols-3 gap-4">
        {spots.map((s) => (
          <LocalizedClientLink key={s.handle} href={`/categories/${s.handle}`} className="group">
            <div className={`bg-gradient-to-br ${s.gradient} rounded-2xl p-6 h-[140px] flex flex-col justify-end transition-all hover:-translate-y-1 hover:shadow-lg`} style={{ border: "1px solid var(--border)" }}>
              <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">{s.title}</h3>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}

export default CategorySpotlight
