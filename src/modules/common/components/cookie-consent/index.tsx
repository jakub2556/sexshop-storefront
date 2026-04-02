"use client"

import { useState, useEffect } from "react"

const CookieConsent = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      setTimeout(() => setShow(true), 1500)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted")
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined")
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-fade-in">
      <div className="content-container">
        <div className="glass rounded-2xl p-5 flex flex-col small:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>
              Používame cookies na zlepšenie vášho zážitku z nákupu. Pokračovaním v prehliadaní súhlasíte s ich používaním.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button onClick={decline} className="text-sm px-4 py-2 rounded-xl transition-colors" style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
              Odmietnuť
            </button>
            <button onClick={accept} className="btn-primary !py-2 !px-5 text-sm">
              Súhlasím
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
