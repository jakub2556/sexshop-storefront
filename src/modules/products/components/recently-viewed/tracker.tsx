"use client"

import { useEffect } from "react"
import { trackRecentlyViewed } from "./index"

const RecentlyViewedTracker = ({ product }: { product: { id: string; title: string; handle: string; thumbnail?: string | null } }) => {
  useEffect(() => {
    trackRecentlyViewed(product)
  }, [product])

  return null
}

export default RecentlyViewedTracker
