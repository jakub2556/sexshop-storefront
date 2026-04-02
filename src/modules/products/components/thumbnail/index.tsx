import { Container, clx } from "@medusajs/ui"
import React from "react"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({ thumbnail, images, size = "small", isFeatured, className, "data-testid": dataTestid }) => {
  const initialImage = thumbnail || images?.[0]?.url
  return (
    <Container className={clx("relative w-full overflow-hidden p-0 shadow-none rounded-xl aspect-square", className, { "w-[180px]": size === "small", "w-[290px]": size === "medium", "w-[440px]": size === "large", "w-full": size === "full" })} style={{ background: "var(--bg-elevated)" }} data-testid={dataTestid}>
      {initialImage ? (
        <img src={initialImage} alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover object-center" draggable={false} loading={isFeatured ? "eager" : "lazy"} />
      ) : (
        <div className="w-full h-full absolute inset-0 flex items-center justify-center" style={{ background: "var(--bg-elevated)" }}><PlaceholderImage size={24} /></div>
      )}
    </Container>
  )
}

export default Thumbnail
