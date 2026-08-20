# Changelog

All notable changes to FLEET are recorded here. This project has not yet cut a numbered release; changes below are unreleased. FLEET is in progress toward its primitizable delivery set (see the scope note); this is Tier 1.

## Unreleased

### Added

- Tier 1, the responsive-image and picture emitter: `img(data)` returns an `<img>` with reserved width and height, `srcset`, `sizes`, `decoding="async"`, and correct scheduling: `priority: true` marks the LCP image eager and high priority, `lazy: true` marks offscreen images, and an image that is neither is left at the browser default (eager), so FLEET never emits a lazy LCP image by default. `picture(data)` negotiates AVIF and WebP formats (as `avif`/`webp` shortcuts or a full `sources` array) with the fallback `<img>` built from the same data. `srcset(base, widths)` builds a srcset string. The React binding (`fleet-ui/react`) adds `Img` and `Picture` and re-exports `srcset`.
- The boundary, stated in code and docs: FLEET emits delivery markup, and does not compress images, bundle JavaScript, or set cache headers, which are build-tool and server work. FLEET emits the markup that points at the built assets.
- Family hygiene: Apache-2.0 license and notice, zero-dependency core, framework binding as an optional peer, and the Polymathie family section in the README.
