"use client"

import { useState, useEffect } from "react"

const AgeGate = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem("age_verified")
    if (!verified) {
      setShow(true)
      document.body.style.overflow = "hidden"
    }
  }, [])

  const handleConfirm = () => {
    localStorage.setItem("age_verified", "true")
    setShow(false)
    document.body.style.overflow = ""
  }

  const handleDecline = () => {
    window.location.href = "https://www.google.com"
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="glass rounded-3xl p-8 small:p-12 max-w-md mx-4 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "var(--accent-soft)" }}>
          <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="section-heading text-2xl small:text-3xl mb-3">Overenie veku</h2>
        <p className="mb-8 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Tento web obsahuje materiály určené výhradne pre osoby staršie ako 18 rokov.
          Vstupom potvrdzujete, že ste dosiahli vek 18 rokov.
        </p>
        <div className="flex flex-col small:flex-row gap-3 justify-center">
          <button onClick={handleConfirm} className="btn-primary">Mám 18 a viac rokov</button>
          <button onClick={handleDecline} className="btn-outline">Odísť</button>
        </div>
      </div>
    </div>
  )
}

export default AgeGate
