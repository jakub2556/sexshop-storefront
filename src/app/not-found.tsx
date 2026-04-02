import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404 - Stránka nenájdená",
  description: "Stránka ktorú hľadáte neexistuje.",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-[calc(100vh-64px)] px-6 text-center">
      <div className="text-8xl font-bold text-rose-500/20">404</div>
      <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: "'DM Serif Display', serif" }}>
        Stránka nenájdená
      </h1>
      <p className="text-sm max-w-md" style={{ color: "var(--text-secondary)" }}>
        Stránka ktorú hľadáte neexistuje alebo bola presunutá. Skúste sa vrátiť na hlavnú stránku.
      </p>
      <Link href="/" className="btn-primary">
        Späť na hlavnú stránku
      </Link>
    </div>
  )
}
