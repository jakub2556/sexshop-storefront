"use client"

import { HttpTypes } from "@medusajs/types"
import { useState, useRef, useCallback } from "react"

type ImageGalleryProps = { images: HttpTypes.StoreProductImage[] }

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const allImages = images || []
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  const activeImage = allImages[activeIndex]?.url

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainRef.current) return
    const rect = mainRef.current.getBoundingClientRect()
    setZoomPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < allImages.length - 1) setActiveIndex(activeIndex + 1)
      if (diff < 0 && activeIndex > 0) setActiveIndex(activeIndex - 1)
    }
    setTouchStart(null)
  }

  const prevImage = () => setActiveIndex(Math.max(0, activeIndex - 1))
  const nextImage = () => setActiveIndex(Math.min(allImages.length - 1, activeIndex + 1))

  if (!allImages.length) return (
    <div className="w-full aspect-square rounded-2xl flex items-center justify-center" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}>Žiadne obrázky</div>
  )

  return (
    <>
      <div className="flex gap-3">
        {/* Desktop thumbnails - vertical, wrapping */}
        {allImages.length > 1 && (
          <div className="hidden small:flex flex-col gap-2 w-20 flex-shrink-0 max-h-[600px] overflow-y-auto no-scrollbar">
            {allImages.map((image, index) => (
              <button key={image.id || index}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${index === activeIndex ? "border-rose-500 opacity-100" : "opacity-40 hover:opacity-80"}`}
                style={index !== activeIndex ? { borderColor: "var(--border)" } : {}}
                onMouseEnter={() => setActiveIndex(index)} onClick={() => setActiveIndex(index)}>
                {image.url && <img src={image.url} alt="" className="w-full h-full object-cover" draggable={false} loading="lazy" />}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 relative">
          {/* Main image - desktop zoom, mobile swipe */}
          <div ref={mainRef}
            className="relative w-full aspect-square rounded-2xl overflow-hidden"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
            onMouseEnter={() => setIsZoomed(true)} onMouseLeave={() => setIsZoomed(false)} onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {activeImage && (
              <img src={activeImage} alt="Produkt"
                className="w-full h-full object-contain hidden small:block"
                draggable={false} loading="eager"
                style={isZoomed ? { transform: "scale(2.5)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transition: "transform-origin 0.05s" } : { transform: "scale(1)", transition: "transform 0.3s ease" }} />
            )}
            {/* Mobile: no zoom, just display */}
            {activeImage && (
              <img src={activeImage} alt="Produkt" className="w-full h-full object-contain small:hidden" draggable={false} loading="eager" />
            )}

            {/* Lightbox button */}
            <button onClick={() => setLightboxOpen(true)}
              className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-opacity"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <svg className="w-4 h-4" style={{ color: "var(--text-primary)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </button>

            {/* Mobile arrows */}
            {allImages.length > 1 && (
              <div className="small:hidden absolute bottom-3 left-3 flex gap-1">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.5)", color: "#fff" }}>
                  {activeIndex + 1} / {allImages.length}
                </span>
              </div>
            )}
          </div>

          {/* Mobile thumbnails - horizontal wrap */}
          {allImages.length > 1 && (
            <div className="flex small:hidden flex-wrap gap-2 mt-3">
              {allImages.map((image, index) => (
                <button key={image.id || index}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${index === activeIndex ? "border-rose-500 opacity-100" : "opacity-40"}`}
                  style={index !== activeIndex ? { borderColor: "var(--border)" } : {}}
                  onClick={() => setActiveIndex(index)}>
                  {image.url && <img src={image.url} alt="" className="w-full h-full object-cover" draggable={false} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.9)" }} onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.1)" }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {activeIndex > 0 && (
            <button onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 w-12 h-12 rounded-full flex items-center justify-center text-white/80 hover:text-white" style={{ background: "rgba(255,255,255,0.1)" }}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
          )}

          {activeIndex < allImages.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 w-12 h-12 rounded-full flex items-center justify-center text-white/80 hover:text-white" style={{ background: "rgba(255,255,255,0.1)" }}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          )}

          <img src={allImages[activeIndex]?.url} alt="Produkt" className="max-w-[90vw] max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />

          <div className="absolute bottom-4 flex gap-1.5">
            {allImages.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setActiveIndex(i) }}
                className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "bg-rose-500 w-6" : "bg-white/30"}`} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ImageGallery
