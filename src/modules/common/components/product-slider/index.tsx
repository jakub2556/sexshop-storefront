"use client"

import { useRef, useEffect, useState, useCallback } from "react"

type ProductSliderProps = {
  children: React.ReactNode
  autoScroll?: boolean
  autoScrollInterval?: number
}

const ProductSlider = ({ children, autoScroll = true, autoScrollInterval = 4000 }: ProductSliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const getCardWidth = useCallback(() => {
    if (!scrollRef.current) return 240
    const firstChild = scrollRef.current.firstElementChild as HTMLElement
    if (!firstChild) return 240
    return firstChild.offsetWidth + 16
  }, [])

  useEffect(() => {
    if (!autoScroll || isPaused || !scrollRef.current) return
    const interval = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      const { scrollLeft, scrollWidth, clientWidth } = el
      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        el.scrollBy({ left: getCardWidth(), behavior: "smooth" })
      }
    }, autoScrollInterval)
    return () => clearInterval(interval)
  }, [autoScroll, autoScrollInterval, isPaused, getCardWidth])

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const cardW = getCardWidth()
    if (dir === "right") {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        el.scrollBy({ left: cardW, behavior: "smooth" })
      }
    } else {
      if (el.scrollLeft <= 10) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" })
      } else {
        el.scrollBy({ left: -cardW, behavior: "smooth" })
      }
    }
  }

  return (
    <div className="relative group" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {/* Left arrow */}
      <button onClick={() => scroll("left")}
        className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <svg className="w-5 h-5" style={{ color: "var(--text-primary)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
      </button>
      {/* Right arrow */}
      <button onClick={() => scroll("right")}
        className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <svg className="w-5 h-5" style={{ color: "var(--text-primary)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
      </button>

      {/* Scrollable container - no snap, overflow visible for cards */}
      <div className="overflow-hidden">
        <div ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2"
          style={{ paddingLeft: "2px", paddingRight: "2px" }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ProductSlider
