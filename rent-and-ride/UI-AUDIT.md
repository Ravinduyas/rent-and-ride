# UI Quality Audit — Rent & Ride

_Polish & consistency pass. No framework, design-system, or palette changes._

## Step 0 — Stack & tokens (what I found)

- **Framework:** Next.js 14.2.5 (App Router, RSC), React 18, TypeScript.
- **Styling:** Tailwind CSS 3.4 + a small layer of component classes in `app/globals.css`.
- **Animation:** framer-motion via the `AnimateIn` wrapper + `PageTransition`.
- **Icons:** `react-icons` (fa, fa6, hi, md).
- **Fonts:** Poppins (`next/font/google`), exposed as `--font-poppins` → `font-sans`.

### Color tokens (`tailwind.config.ts` → `theme.extend.colors.brand`)
`orange #C76D4A` · `orangeDeep #A85332` · `dark/navy #0B261A` · `navyDeep #06160F` ·
`navyLight #15462E` · `silver #C7CBD3` · `silverLight #E8EBF0` · `muted #7A7A85` · `line #E6E6E6`

### Reusable classes (`globals.css`)
`container-x`, `section-title`, `section-eyebrow`, `section-divider`, `btn-pill`, `btn-orange`,
`btn-circle`, `bg-navy-grad`, `text-silver-grad`, `glass`, `shadow-3d`, `animate-float`, `animate-wheel-slow`.

### Type scale in use
Standard Tailwind (`text-sm`…`text-6xl`) **plus** a recurring micro-label scale written as arbitrary
values: `text-[9px]`, `text-[10px]`, `text-[11px]`, `text-[12px]` — used consistently for uppercase
tracked labels, but off-token.

---

## Step 1 — Audit (issues, highest impact first)

### A. Accessibility
1. **No visible focus indicator anywhere.** Nav links, hero CTAs, filter buttons, category tiles,
   testimonial arrows/dots, vehicle "Book" links, footer links — none show a focus ring. Keyboard
   users are lost. (WCAG 2.4.7) — _fix: global `:focus-visible` ring._
2. **Form fields kill the outline.** `ContactForm` inputs/select/textarea and the `Newsletter` input use
   `focus:outline-none` with no replacement (inputs only shift border color; the newsletter input shows
   nothing). — _fix: focus ring on all fields._
3. **Icon-only footer social links have no accessible name.** `<Link><Icon/></Link>` with `href="#"` →
   screen readers announce nothing useful. — _fix: `aria-label` per platform._
4. **Newsletter email input has no label** (placeholder only). — _fix: `sr-only` label._
5. **No status announcement** when the contact / newsletter forms "send". — _fix: `role="status"` live region._
6. **Reduced-motion not honored.** Heavy entrance/parallax animation with no `prefers-reduced-motion` opt-out.

### B. Contrast (WCAG AA)
7. **`brand-muted #7A7A85` body text fails AA** on white (~4.24:1) and on `silverLight` (~4.0:1). It is the
   primary body-copy color across About, Services, Categories, Location, Testimonials, Newsletter, Contact.
   — _fix: darken the token minimally to clear 4.5:1 on both backgrounds._
8. **Footer copyright** `text-brand-silver/60` (~3.8:1 on navy) is below AA. — _fix: bump opacity._

### C. Hardcoded colors (should be tokens)
9. **Off-palette hex** `#8B3E22` in the About wheel SVG (not a brand token). — _fix → `orangeDeep`._
10. **Palette hex hardcoded in components:** `#0B261A` / `rgba(11,38,26,…)` in `Hero`, `PageHeader`,
    `Weligama` inline gradients; `from-[#0B261A]` arbitrary class in `Weligama`; `#C76D4A` in the About SVG.
    — _fix: expose brand values as CSS variables and reference them; use the `brand-navy` token for the class._
11. **Repeated brand-orange glow shadow** `shadow-[0_…_rgba(199,109,74,0.45)]` copy-pasted in 7 places.
    — _fix: single `.shadow-orange` utility (dedupe + de-hardcode the brand color)._

### D. Type / spacing consistency
12. **Off-token micro font sizes** `text-[9/10/11/12px]` scattered across ~14 files. — _fix: add named
    `text-4xs/3xs/2xs` tokens (exact same px) and map `text-[12px]` → `text-xs`._

### E. States (loading / empty)
13. **Vehicle list views have no loading or empty state** (`/bikes`, `/three-wheelers` map a static array
    directly). — _fix: add `loading.tsx` skeletons + an empty-state fallback._

### F. Responsive / layout
14. **Horizontal scroll risk at 375px.** `AnimateIn` entrance variants translate on X (`x: ±60`); sections
    that aren't `overflow-hidden` (About, Categories, Services, Location, Footer) can push the page wider
    than the viewport mid-animation. — _fix: clip horizontal overflow on `<main>`._

---

## Decisions (ambiguous calls, logged)
- **Darkening `brand-muted`** (#7A7A85 → #69697A): the palette *roles/names* are unchanged; one value is
  nudged the minimum needed to meet AA on both white and `silverLight`. Treated as an accessibility fix,
  not a palette redesign.
- **Micro font sizes → named tokens** rather than left arbitrary: adding `text-2xs/3xs/4xs` at the exact
  existing px is the conventional Tailwind way to make them "part of the scale" with zero visual change.
- **Letter-spacing** (`tracking-[…em]`) left as-is: heavily and consistently used by the design; not called
  out by the goal and tokenizing it would be a redesign.
- **Neutral black elevation shadows** (`rgba(0,0,0,…)`) left as-is: standard depth shadows, not palette colors.
- **Presentational filter buttons** on the vehicle pages keep their existing (non-filtering) behavior —
  business logic is out of scope; they only gain a visible focus style.
- **Bespoke multi-stop gradients** keep their exact stops, now sourced from CSS variables instead of literals.

## Changes applied
See commits. Summary at the end of the session.
