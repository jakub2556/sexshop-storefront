"use client"

import { useState, useEffect, useCallback } from "react"
import { createRoot } from "react-dom/client"

type ToastType = "success" | "error"

type ToastItem = {
  id: number
  message: string
  type: ToastType
}

let addToastFn: ((message: string, type: ToastType) => void) | null = null
let toastContainerMounted = false

function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  useEffect(() => {
    addToastFn = addToast
    return () => {
      addToastFn = null
    }
  }, [addToast])

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: "0.75rem",
            background: toast.type === "error" ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)",
            border: `1px solid ${toast.type === "error" ? "rgba(239,68,68,0.4)" : "rgba(34,197,94,0.4)"}`,
            color: toast.type === "error" ? "#f87171" : "#4ade80",
            fontSize: "0.875rem",
            fontWeight: 500,
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            animation: "toast-slide-in 0.3s ease-out",
            pointerEvents: "auto",
          }}
        >
          {toast.message}
        </div>
      ))}
      <style>{`
        @keyframes toast-slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
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

function ensureToastContainer() {
  if (toastContainerMounted || typeof window === "undefined") return
  toastContainerMounted = true
  const div = document.createElement("div")
  div.id = "toast-container"
  document.body.appendChild(div)
  const root = createRoot(div)
  root.render(<ToastContainer />)
}

export function showToast(message: string, type: ToastType = "success") {
  ensureToastContainer()
  // Small delay to ensure container is mounted
  setTimeout(() => {
    addToastFn?.(message, type)
  }, 50)
}

export default ToastContainer
