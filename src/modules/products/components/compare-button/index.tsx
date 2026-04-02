"use client"

import { useState, useEffect } from "react"

const CompareButton = ({ productId }: { productId: string }) => {
  const [isCompared, setIsCompared] = useState(false)

  useEffect(() => {
    const compare = JSON.parse(localStorage.getItem("compare") || "[]")
    setIsCompared(compare.includes(productId))
  }, [productId])

  const toggle = () => {
    const compare = JSON.parse(localStorage.getItem("compare") || "[]")
    let updated
    if (compare.includes(productId)) {
      updated = compare.filter((id: string) => id !== productId)
    } else {
      if (compare.length >= 4) {
        alert("Maximálne 4 produkty na porovnanie")
        return
      }
      updated = [...compare, productId]
    }
    localStorage.setItem("compare", JSON.stringify(updated))
    setIsCompared(!isCompared)
    // Dispatch event for compare bar
    window.dispatchEvent(new Event("compare-updated"))
  }

  return (
    <button
      onClick={toggle}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
      style={{ background: isCompared ? "#7c3aed" : "var(--bg-elevated)", border: `1px solid ${isCompared ? "transparent" : "var(--border)"}` }}
      title={isCompared ? "Odstrániť z porovnania" : "Pridať do porovnania"}
    >
      <svg
        className={`w-5 h-5 ${isCompared ? "text-white" : "text-purple-400"}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    </button>
  )
}

export default CompareButton
