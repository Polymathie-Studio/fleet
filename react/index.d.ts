import type { ReactElement } from 'react'

export interface ImgData {
  src: string
  alt?: string
  /** Set width and height (or CSS aspect-ratio) to reserve space and prevent layout shift. */
  width?: number | string
  height?: number | string
  srcset?: string
  sizes?: string
  decoding?: 'async' | 'sync' | 'auto'
  /** The LCP image (hero, above the fold): eager and high priority, never lazy. */
  priority?: boolean
  /** Offscreen images: loading="lazy". Never set this on the LCP image. */
  lazy?: boolean
  className?: string
  id?: string
}
export function Img(data: ImgData): ReactElement

export interface SourceSpec {
  srcset: string
  type?: string
  media?: string
  sizes?: string
}
export interface PictureData extends ImgData {
  /** Shortcut for a type="image/avif" source. */
  avif?: string
  /** Shortcut for a type="image/webp" source. */
  webp?: string
  /** Additional sources for art direction or full control. */
  sources?: SourceSpec[]
}
export function Picture(data: PictureData): ReactElement

/** Build a srcset string from a base path and widths, e.g. srcset('photo.jpg', [400, 800]). */
export function srcset(base: string, widths?: number[], name?: (w: number) => string): string
