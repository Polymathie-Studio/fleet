/*
 * FLEET - the framework-agnostic core. Zero dependencies.
 *
 * Delivery: a build and SSR-time generator for the markup, head tags, and config
 * that make a page load fast and stable against the Core Web Vitals (LCP, CLS,
 * INP). It emits correct strings and audits HTML; it does not, and a zero-
 * dependency primitive cannot, compress images, bundle JavaScript, or set cache
 * headers. Those levers are build-tool and server work; FLEET emits the markup
 * that points at the built assets and generates the config that a host applies.
 *
 * Tier 1: the responsive-image and picture emitter, with reserved dimensions
 * and correct loading, decoding, and fetchpriority scheduling. The LCP image is
 * a special case: mark it priority so it is eager and high-priority, never lazy.
 *
 * License: Apache-2.0.
 */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ESC[c]);

// Emit an <img> with reserved dimensions and correct scheduling. Set width and
// height (or aspect-ratio in CSS) to prevent layout shift. Mark the LCP image
// (the hero, above the fold) with priority: true, so it is eager and high
// priority; mark offscreen images lazy: true. An image that is neither is left
// at the browser default (eager), which is safe for the LCP image.
export function img(d = {}) {
  const a = [`src="${esc(d.src)}"`, `alt="${esc(d.alt || '')}"`];
  if (d.width != null) a.push(`width="${esc(d.width)}"`);
  if (d.height != null) a.push(`height="${esc(d.height)}"`);
  if (d.srcset) a.push(`srcset="${esc(d.srcset)}"`);
  if (d.sizes) a.push(`sizes="${esc(d.sizes)}"`);
  a.push(`decoding="${esc(d.decoding || 'async')}"`);
  if (d.priority) a.push('loading="eager"', 'fetchpriority="high"');
  else if (d.lazy) a.push('loading="lazy"');
  if (d.className) a.push(`class="${esc(d.className)}"`);
  if (d.id) a.push(`id="${esc(d.id)}"`);
  return `<img ${a.join(' ')}>`;
}

// Emit a <picture> for format negotiation (and art direction). Pass avif and/or
// webp as shortcuts for type-negotiated sources, or a sources array of
// { srcset, type, media, sizes } for full control; the fallback <img> is built
// from the same data (src, alt, width, height, loading, etc.).
export function picture(d = {}) {
  const sources = [];
  const add = (srcset, type) => { if (srcset) sources.push({ srcset, type }); };
  add(d.avif, 'image/avif');
  add(d.webp, 'image/webp');
  for (const s of (d.sources || [])) sources.push(s);
  const rendered = sources.map((s) => {
    const sa = [`srcset="${esc(s.srcset)}"`];
    if (s.type) sa.push(`type="${esc(s.type)}"`);
    if (s.media) sa.push(`media="${esc(s.media)}"`);
    if (s.sizes) sa.push(`sizes="${esc(s.sizes)}"`);
    return `  <source ${sa.join(' ')}>`;
  });
  return `<picture>\n${rendered.join('\n')}${rendered.length ? '\n' : ''}  ${img(d)}\n</picture>`;
}

// Build a srcset string from a base path and a list of widths, given a naming
// pattern. By default `photo.jpg` with [400, 800] becomes
// "photo-400.jpg 400w, photo-800.jpg 800w". Pass a name function for other
// schemes. FLEET names the files; your build step still has to produce them.
export function srcset(base, widths = [], name) {
  const dot = base.lastIndexOf('.');
  const stem = dot === -1 ? base : base.slice(0, dot);
  const ext = dot === -1 ? '' : base.slice(dot);
  const fn = name || ((w) => `${stem}-${w}${ext}`);
  return widths.map((w) => `${fn(w)} ${w}w`).join(', ');
}
