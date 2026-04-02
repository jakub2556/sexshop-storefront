"use client"

import { useState, useEffect } from "react"

const StickyAddToCart = ({ title, price, onAdd, disabled }: {
  title: string
  price?: string
  onAdd: () => void
  disabled?: boolean
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const addBtn = document.querySelector("[data-testid='add-product-button']")
      if (addBtn) {
        const rect = addBtn.getBoundingClientRect()
        setShow(rect.bottom < 0)
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 small:hidden animate-fade-in" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between p-3 gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{title}</p>
          {price && <p className="text-sm font-bold text-rose-400">{price}</p>}
        </div>
        <button
          onClick={onAdd}
          disabled={disabled}
          className="btn-primary !py-2.5 !px-5 text-sm whitespace-nowrap flex-shrink-0"
        >
          Do košíka
        </button>
      </div>
    </div>
  )
}

export default StickyAddToCart
