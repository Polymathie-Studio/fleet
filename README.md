# FLEET

FLEET is delivery: the markup, head tags, and config that make a shipped page load fast and stable. A page can look finished and still be slow and janky, an oversized hero image that arrives late, content that jumps as images and fonts load, a render blocked behind scripts. That damage is invisible until measured, which is exactly when a fast build skips it. FLEET emits the correct markup and configuration, and audits a page for the misses, against the Core Web Vitals (Largest Contentful Paint, Cumulative Layout Shift, Interaction to Next Paint).

It is **in progress** toward its delivery set (see the scope note). This is Tier 1: the responsive-image and picture emitter, with reserved dimensions and correct scheduling. Resource hints, fonts, a cache-header config generator, and a delivery auditor follow.

## What FLEET is, and is not

FLEET is honest about a boundary the other Polymathie primitives do not have. A zero-dependency, native-first primitive can emit correct delivery markup, correct head tags, and correct config text, and it can audit HTML. It cannot compress an image, bundle JavaScript, or set a cache header, because those are build-tool and server work. So FLEET emits the `<img>` and `<picture>` markup that points at your optimized files, generates the cache config your host applies, and audits the result; it does not encode the pixels or ship the bytes. Producing the optimized images and bundles stays with your build; FLEET makes sure the markup and config around them are correct.

## Quickstart

### Any site, no framework

```js
import { img, picture, srcset } from 'fleet-ui'

// The hero (LCP) image: reserved dimensions, eager, high priority, never lazy.
img({
  src: '/hero-1200.jpg',
  alt: 'The product on a desk',
  width: 1200,
  height: 800,
  srcset: srcset('/hero.jpg', [600, 900, 1200]),
  sizes: '(max-width: 700px) 100vw, 1200px',
  priority: true,
})

// An offscreen image: lazy, async decode, dimensions reserved.
img({ src: '/photo.jpg', alt: 'A photo', width: 800, height: 600, lazy: true })

// Format negotiation with a fallback:
picture({
  src: '/photo.jpg', alt: 'A photo', width: 800, height: 600,
  avif: '/photo.avif', webp: '/photo.webp', lazy: true,
})
```

### React

```tsx
import { Img, Picture, srcset } from 'fleet-ui/react'

<Img src="/hero-1200.jpg" alt="The product on a desk" width={1200} height={800}
     srcset={srcset('/hero.jpg', [600, 900, 1200])} sizes="(max-width: 700px) 100vw, 1200px"
     priority />

<Picture src="/photo.jpg" alt="A photo" width={800} height={600} avif="/photo.avif" webp="/photo.webp" lazy />
```

## The LCP image rule

The single most common delivery anti-pattern is lazy-loading the Largest Contentful Paint image, the hero, which delays the very element that defines the metric. FLEET makes the choice explicit: mark the LCP image `priority: true` (eager, `fetchpriority="high"`) and mark offscreen images `lazy: true`. An image that is neither is left at the browser default (eager), which is safe for the LCP image. Always set `width` and `height` so the box is reserved and nothing shifts as the image loads.

## Part of the Polymathie family

FLEET is one of the [Polymathie](https://github.com/Polymathie-Studio) primitives: small, dependency-free pieces for building websites, dashboards, and tools, where each protects one posture that fast, AI-assisted building tends to drop. Its siblings are [TEMPER](https://github.com/Polymathie-Studio/temper) (legibility and design tokens), [LUCID](https://github.com/Polymathie-Studio/lucid) (honest disclosure), [HASP](https://github.com/Polymathie-Studio/hasp) (bring-your-own-key privacy), [GRACE](https://github.com/Polymathie-Studio/grace) (off-happy-path states), [GRASP](https://github.com/Polymathie-Studio/grasp) (operable interaction components), and [BEACON](https://github.com/Polymathie-Studio/beacon) (findability). Like BEACON, FLEET is a build and SSR-time generator, and it is honest that delivery has levers a drop-in primitive cannot pull.

## License

Apache-2.0. Copyright 2026 Regis Lloyd Chapman. See `LICENSE` and `NOTICE`.
