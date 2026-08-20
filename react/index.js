// FLEET - the React binding. Same fields and output as the core, rendered as
// elements. Img reserves dimensions and schedules loading correctly; Picture
// negotiates formats. The srcset helper is re-exported from the core. No build step.

import { createElement as h } from 'react'

export { srcset } from '../fleet.js'

export function Img({ src, alt = '', width, height, srcset, sizes, decoding = 'async', priority, lazy, className, ...rest }) {
  const props = { src, alt, width, height, srcSet: srcset, sizes, decoding, className, ...rest }
  if (priority) { props.loading = 'eager'; props.fetchPriority = 'high' }
  else if (lazy) props.loading = 'lazy'
  return h('img', props)
}

export function Picture({ avif, webp, sources = [], ...imgData }) {
  const srcs = []
  if (avif) srcs.push({ srcset: avif, type: 'image/avif' })
  if (webp) srcs.push({ srcset: webp, type: 'image/webp' })
  for (const s of sources) srcs.push(s)
  return h('picture', null,
    ...srcs.map((s, i) => h('source', { key: i, srcSet: s.srcset, type: s.type, media: s.media, sizes: s.sizes })),
    h(Img, imgData),
  )
}
