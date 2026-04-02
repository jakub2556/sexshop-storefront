"use client"

import { useState, useEffect } from "react"

const WishlistButton = ({ productId }: { productId: string }) => {
  const [isWished, setIsWished] = useState(false)

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setIsWished(wishlist.includes(productId))
  }, [productId])

  const toggle = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    let updated
    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id: string) => id !== productId)
    } else {
      updated = [...wishlist, productId]
    }
    localStorage.setItem("wishlist", JSON.stringify(updated))
    setIsWished(!isWished)
  }

  return (
    <button
      onClick={toggle}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
      style={{ background: isWished ? "var(--accent)" : "var(--bg-elevated)", border: `1px solid ${isWished ? "transparent" : "var(--border)"}` }}
      title={isWished ? "Odstrániť z obľúbených" : "Pridať do obľúbených"}
    >
      <svg
        className={`w-5 h-5 transition-colors ${isWished ? "text-white" : "text-rose-400"}`}
        fill={isWished ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={isWished ? 0 : 1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    </button>
  )
}

export default WishlistButton
