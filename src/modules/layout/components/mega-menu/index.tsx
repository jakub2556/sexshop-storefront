"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const PK = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const BACKEND =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://173.249.39.158:9000"

type Category = {
  id: string
  name: string
  handle: string
  parent_category_id: string | null
  category_children?: Category[]
}

export default function MegaMenu() {
  const [categories, setCategories] = useState<Category[]>([])
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fetch categories once on mount
  useEffect(() => {
    fetch(
      `${BACKEND}/store/product-categories?fields=*category_children&limit=100`,
      {
        headers: {
          "x-publishable-api-key": PK || "",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.product_categories) {
          setCategories(data.product_categories)
        }
      })
      .catch((err) => console.error("MegaMenu: failed to fetch categories", err))
  }, [])

  // Derive top-level (root) categories and a map for children
  const rootCategories = categories.filter((c) => !c.parent_category_id)

  const activeCategory = rootCategories.find((c) => c.id === activeId)
  const children = activeCategory?.category_children ?? []

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  // Close on click outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", onClick)
    }
    return () => document.removeEventListener("mousedown", onClick)
  }, [open])

  const handleTriggerEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }, [])

  const handleTriggerLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200)
  }, [])

  const handleMenuEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  const handleMenuLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200)
  }, [])

  if (rootCategories.length === 0) return null

  return (
    <div ref={menuRef} className="relative h-full flex items-center">
      {/* Trigger */}
      <button
        onMouseEnter={handleTriggerEnter}
        onMouseLeave={handleTriggerLeave}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 transition-colors hover:text-rose-400"
        style={{ color: "var(--text-secondary)" }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        Kategórie
      </button>

      {/* Dropdown panel */}
      <div
        onMouseEnter={handleMenuEnter}
        onMouseLeave={handleMenuLeave}
        className="absolute top-full left-0 mt-2 z-50"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0)" : "translateY(-4px)",
          transition: "opacity 200ms ease, transform 200ms ease",
        }}
      >
        <div
          className="flex rounded-lg border shadow-2xl overflow-hidden"
          style={{
            background: "var(--bg-elevated)",
            borderColor: "var(--border)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            minWidth: children.length > 0 ? "600px" : "260px",
          }}
        >
          {/* Left column: root categories */}
          <div
            className="flex flex-col py-2 min-w-[220px] border-r"
            style={{ borderColor: "var(--border)" }}
          >
            {rootCategories.map((cat) => (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveId(cat.id)}
                className="relative"
              >
                <LocalizedClientLink
                  href={`/categories/${cat.handle}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm transition-colors"
                  style={{
                    color:
                      activeId === cat.id
                        ? "rgb(251 113 133)" /* rose-400 */
                        : "var(--text-primary)",
                    background:
                      activeId === cat.id
                        ? "var(--bg-card)"
                        : "transparent",
                  }}
                >
                  <span className="flex items-center justify-between">
                    {cat.name}
                    {(cat.category_children?.length ?? 0) > 0 && (
                      <svg
                        className="w-3.5 h-3.5 opacity-50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    )}
                  </span>
                </LocalizedClientLink>
              </div>
            ))}
          </div>

          {/* Right panel: subcategories in columns */}
          {children.length > 0 && (
            <div
              className="py-3 px-5 min-w-[340px]"
              style={{
                background: "var(--bg-card)",
                animation: "megaMenuFadeIn 150ms ease",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3 px-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {activeCategory?.name}
              </p>
              <div
                className="grid gap-x-6 gap-y-1"
                style={{
                  gridTemplateColumns:
                    children.length > 6
                      ? "repeat(3, 1fr)"
                      : children.length > 3
                      ? "repeat(2, 1fr)"
                      : "1fr",
                }}
              >
                {children.map((sub) => (
                  <LocalizedClientLink
                    key={sub.id}
                    href={`/categories/${sub.handle}`}
                    onClick={() => setOpen(false)}
                    className="block px-1 py-1.5 text-sm rounded transition-colors hover:text-rose-400"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {sub.name}
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyframe for subcategory fade-in */}
      <style jsx global>{`
        @keyframes megaMenuFadeIn {
          from {
            opacity: 0;
            transform: translateX(-4px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
