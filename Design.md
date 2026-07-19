
Action: file_editor create /app/design.md --file-text "# Figment — Design Handoff (`design.md`)

A build-ready spec for the Figment collaborative-whiteboard landing page. Hand this to any agent (or designer/dev) and they should be able to recreate the look, feel, and motion without further guidance.

---

## 1. Art direction

**Name of the style:** *Neo-Brutalist Playful × Modern SaaS.*

Three ideas hold the whole page together — everything else is a consequence of them:

1. **Sharp structure, soft content.** Thick 2px borders, hard block shadows, no gradients — but the *content* inside is warm (rounded stickies, hand-drawn cursors, italic display type, floating shapes).
2. **One loud color, one weird color, one calm base.** Orange (`#FF5C00`) does 90% of the accent work. A \"weird\" secondary swaps between themes (butter yellow in light, mint cyan in dark) to keep it playful. Everything else is bone / void.
3. **Motion is a design element, not decoration.** Every reveal is deliberate: masked line-by-line, parallax, staggered cards. Nothing fades in generically.

If you cut any of these three, the design becomes generic. Keep the trinity.

---

## 2. Brand & voice

- **Name:** Figment
- **Wordmark:** `Figment` in Clash Display Semibold, tight tracking (`-0.03em`). Logo mark is an \"F\" in a 32×32 orange square with 2px border + 3px block shadow.
- **Tone:** Confident, editorial, human. Short sentences. One dry joke per page (see footer: *\"All ideas remain yours.\"*). Never uses corporate-SaaS filler (\"empower\", \"seamless\", \"revolutionize\").

---

## 3. Color system

Full HSL values in `frontend/src/index.css`. Solid colors only — **no gradients** anywhere.

### Light (default)
| Token | Hex | HSL | Use |
|---|---|---|---|
| background | `#F4F4F0` | `60 20% 94%` | Page bg — bone/off-white, warmer than pure white |
| foreground | `#111111` | `0 0% 7%` | Body text, borders |
| card | `#FFFFFF` | `0 0% 100%` | Elevated surfaces, sticky notes |
| primary | `#FF5C00` | `22 100% 50%` | Signature orange, primary CTAs, italic accent word |
| secondary | `#FFE873` | `51 100% 73%` | Butter yellow — sticky-note bg, highlight bar under \"form\" |
| accent | `#4D9FFF` | `213 100% 65%` | Cool blue — occasional pop, cursor bubble |
| border | `#111111` | `0 0% 7%` | All borders are foreground color — creates the brutalist edge |

### Dark
| Token | Hex | HSL | Notes |
|---|---|---|---|
| background | `#0A0A0A` | `0 0% 4%` | True void black. **Not** `#000` (too flat) |
| foreground | `#F4F4F0` | `60 20% 94%` | Bone as text |
| card | `#151515` | `0 0% 8%` | Barely lifted from bg |
| primary | `#FF5C00` | `22 100% 50%` | Orange stays constant across modes (brand anchor) |
| secondary | `#A5FFEB` | `166 100% 82%` | **Swaps to mint cyan** — the playful surprise |
| accent | `#FF4D9C` | `331 100% 65%` | Hot pink accent (replaces blue) |
| border | `#F4F4F0` | `60 20% 94%` | Bone borders on dark bg keep the \"cut-out\" look |

### Rules
- Primary orange is used **sparingly** — one CTA, one italic word per section, one small dot in the eyebrow.
- Never place primary text on secondary bg without a border (contrast trap).
- Block shadows change with theme: `6px 6px 0 0 #111` in light, `6px 6px 0 0 #F4F4F0` in dark.

---

## 4. Typography

Two families. No third.

| Family | Weights | Where |
|---|---|---|
| **Clash Display** (Fontshare) | 500 / 600 / 700 | All headings, mega numbers, wordmark, sticky-note titles |
| **Manrope** (Google Fonts) | 400 / 500 / 600 | Body copy, buttons, nav, labels |

### Scale
| Role | Class | Notes |
|---|---|---|
| Hero H1 | `text-[14vw] sm:text-[12vw] md:text-[9.5vw] lg:text-[9vw]` | Fluid. Never wraps to more than 3 lines. |
| Section H2 | `text-4xl md:text-6xl lg:text-7xl` | Always paired with a muted continuation line (`text-foreground/40`) |
| Chapter number | `text-[10rem]` in orange | 01, 02, 03, 04 |
| H3 (card) | `text-2xl md:text-3xl lg:text-4xl` | |
| Body | `text-base md:text-lg`, `text-foreground/70` | Leading `relaxed` |
| Label / eyebrow | `text-xs uppercase tracking-widest` | Inside pill borders |

### Rules
- **`tracking-tighter` on all display type**, `leading-[0.92]` for the hero.
- One italic word per heading in orange (`italic text-primary`) — the signature move.
- The muted line technique: `<span className=\"text-foreground/40\">continuation</span>` — softens brutalism.

---

## 5. Layout & spacing

- **Container:** `max-w-[1440px] mx-auto px-6 md:px-10`. Never wider than 1440.
- **Section padding:** `py-24 md:py-40`. This is the \"2–3× more space than feels comfortable\" rule.
- **Grid:** 12-col on desktop. Asymmetric splits (4/8, 5/7, 7/5). Center-aligned blocks only inside cards.
- **Radius:** `rounded-2xl` (16px) for large surfaces, `rounded-full` for pills, `rounded-md` for the small logo mark.
- **Borders:** every card / button has `border-2 border-border`. This is non-negotiable — it's the whole aesthetic.

### Shadow system
```
shadow-brutal-sm: 3px 3px 0 0 <border-color>
shadow-brutal:    6px 6px 0 0 <border-color>
```
Cards start with `shadow-brutal-sm`, animate to `shadow-brutal` on hover. Primary CTA starts at `shadow-brutal` and goes to `10px 10px 0 0`.

---

## 6. Motion choreography

Libraries: **framer-motion** + **lenis** + **react-fast-marquee**.

### Signature moment (hero on-load)
Masked line-by-line reveal, ~2s total:
```jsx
const line = {
  hidden: { y: \"110%\" },
  show: (i) => ({
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};
// Wrap each line in overflow-hidden, animate child y from 110% → 0
```
The custom ease `[0.22, 1, 0.36, 1]` (Vercel's ease) is used for **every** important transition. It's what makes motion feel \"designed\" instead of default.

### Rules
1. **Never** use `transition: all` — animate specific properties.
2. Hover on cards: `whileHover={{ y: -6 }}` + shadow upgrade. No scale.
3. Tap: `whileTap={{ scale: 0.96 }}` on every interactive.
4. Scroll reveals: `whileInView` with `viewport={{ once: true, margin: \"-80px\" }}`.
5. Parallax uses `useScroll` + `useTransform` — max 180px translate. Any more feels laggy.
6. Lenis wraps the whole app for momentum scroll — 1.2s duration, exponential ease.

### Small delights
- Animated SVG `pathLength` on the connector lines in the hero product mock.
- Live cursors move with `x: [0, 30, 10, 40]` on infinite mirror loop.
- Theme toggle icon rotates & fades — sun/moon crossfade in a rotating capsule.
- Hero orange dot has a `blink` CSS keyframe animation.

---

## 7. Section-by-section blueprint

1. **Header** — Fixed, `backdrop-blur-xl bg-background/70`, 2px bottom border, drops from `y: -40` on load.
2. **Hero** — `pt-36 pb-24`, grid-paper bg. Masked line-by-line title, floating parallax circle (secondary) and rotated square (accent), CTAs, then a full **live product board mockup** below with sticky notes, animated cursors and SVG connectors.
3. **Editorial marquee** — Solid orange band, Clash Display uppercase, `Asterisk` icon separators, `speed={38}`.
4. **How it works (manifesto)** — 4 numbered chapters, alternating left/right. Massive orange numbers, small icon chip, sticker overlay on image, stat pinned to a `border-t` rule.
5. **Features (bento)** — 6 tiles in a 12-col grid with intentional asymmetry (`col-span-7`, `col-span-5`, `col-span-8`, `col-span-4`). Each tile has its own bg color (`primary`, `secondary`, `accent`, `card`).
6. **Testimonials** — 3-col grid of quote cards rotated `-2°` / `+1°` / `+2°`. On hover: `rotate-0` + `y: -8`. Initials avatar in a bordered circle.
7. **Pricing** — 3 tiers. Middle is highlighted with orange bg + \"Most rooms\" sticker in secondary color absolutely positioned above the card.
8. **Final CTA** — Inverted section (`bg-foreground text-background`), giant type `text-[9vw]`, two parallax shapes moving on scroll.
9. **Footer** — 12-col columns, socials as bordered circle buttons, mega ghost wordmark `text-[18vw] text-foreground/6` at the bottom (the \"concert poster\" move).

---

## 8. Iconography & imagery

- **Icons:** `lucide-react`, stroke `2.25`. No emoji. Ever.
- **Product imagery:** Real photos of teams collaborating, sourced from Pexels/Unsplash. Always inside a bordered `overflow-hidden` container with a subtle `mix-blend-multiply bg-primary/10` tint to unify tone.
- **3D abstract shapes:** Used sparingly for the \"chapter 03/04\" images — geometric, colorful.
- **Rule:** Never use placeholder gradients or Midjourney-looking abstract renders. Real photography + our own vector shapes only.

---

## 9. Accessibility & responsiveness

- Contrast: All text pairs pass WCAG AA (foreground on background is `#111` on `#F4F4F0` = 16.4:1).
- Focus states: All interactive elements inherit `:focus-visible` from shadcn base.
- Reduced motion: Lenis + framer-motion respect `prefers-reduced-motion` automatically for smooth-scroll; long animations should be conditionally shortened for users with the preference set.
- Mobile: hero drops to `text-[14vw]`, grids collapse to 1 or 2 cols, floating shapes are `hidden md:block`.

---

## 10. File structure the agent should follow

```
frontend/src/
├── App.js                    # ThemeProvider + SmoothScroll + Router
├── index.css                 # Font imports, CSS vars (light + .dark), utility classes
├── lib/
│   ├── ThemeProvider.jsx     # localStorage + prefers-color-scheme
│   └── SmoothScroll.jsx      # Lenis wrapper
├── pages/
│   └── Landing.jsx           # Assembles all sections in order
└── components/
    ├── Header.jsx
    ├── Hero.jsx              # Includes the product board mock
    ├── Marquee.jsx
    ├── HowItWorks.jsx
    ├── Features.jsx
    ├── Testimonials.jsx
    ├── Pricing.jsx
    ├── FinalCTA.jsx
    ├── Footer.jsx
    └── ThemeToggle.jsx
```

Dependencies to add:
```bash
yarn add framer-motion lenis react-fast-marquee lucide-react
```

---

## 11. Reference sites (study these)

Grouped by what to steal from each.

### Neo-brutalist / editorial SaaS
- **[gumroad.com](https://gumroad.com)** — the OG modern brutalism. Study borders, shadows, playful color blocks.
- **[linear.app](https://linear.app)** — restrained motion, section-by-section reveal choreography, kinetic type on the changelog page.
- **[readymag.com](https://readymag.com)** — editorial layouts, wild typography, hard grid.
- **[tally.so](https://tally.so)** — friendly brutalism, illustrations + real product screenshots.
- **[posthog.com](https://posthog.com)** — dense pages that still feel playful; look at their pricing and manifesto pages.

### Motion & kinetic type
- **[igloo.inc](https://igloo.inc)** *(Awwwards SotY 2024)* — the gold standard for line-by-line masked reveals + Lenis smooth scroll.
- **[www.rauno.me](https://rauno.me)** — micro-interactions taught as essays.
- **[emilkowal.ski](https://emilkowal.ski)** — Emil Kowalski, the framer-motion whisperer. Study his article demos.
- **[cuberto.com](https://cuberto.com)** — heavy custom cursor + smooth scroll; overkill in places but a masterclass.
- **[hover.dev](https://hover.dev)** — copy-paste motion recipes; look at \"kinetic type\" and \"masked reveal\" specifically.

### Collaborative / whiteboard products (direct competitors, look but don't imitate)
- **[figma.com](https://figma.com)** — clean SaaS, restrained. Study their product mock treatment.
- **[figjam.com](https://www.figma.com/figjam/)** — playful sibling; sticker energy, sticky note styling.
- **[miro.com](https://miro.com)** — enterprise-safe; useful for what to *avoid* if you want distinctive.
- **[tldraw.com](https://tldraw.com)** — genuinely charming brand. Their \"make real\" demo page is a masterclass in product-first landing.
- **[excalidraw.com](https://excalidraw.com)** — hand-drawn aesthetic; steal the informal cursor labels.

### Bold typography landings
- **[vercel.com](https://vercel.com)** — the ease-out curve `cubic-bezier(0.22, 1, 0.36, 1)` you see across our site comes from them.
- **[stripe.com/press](https://stripe.com/press)** — enormous type + serious spacing.
- **[framer.com](https://framer.com)** — bento grids, huge headlines, gradient-free.
- **[apple.com/newsroom](https://apple.com/newsroom)** — editorial hierarchy, quiet confidence.

### Awwwards galleries to browse weekly
- **[awwwards.com/websites/typography/](https://www.awwwards.com/websites/typography/)** — filter by \"typography\" and \"clean\"
- **[godly.website](https://godly.website)** — curated inspiration, updated daily
- **[siteinspire.com](https://siteinspire.com)** — filter by \"Portfolio\" + \"Grid\"
- **[minimal.gallery](https://minimal.gallery)** — restraint school
- **[land-book.com](https://land-book.com)** — SaaS landings, well categorized

### Design systems to steal patterns from
- **[shadcn/ui](https://ui.shadcn.com)** — the component base we heavily customize
- **[tailwindui.com](https://tailwindui.com)** *(paid)* — layout patterns worth studying even if you don't buy
- **[refactoringui.com](https://www.refactoringui.com)** — the book. Read chapters 1–4 before touching type again.

---

## 12. What \"done\" looks like

Ship-check for the agent:
- [ ] Both themes toggle cleanly, no flash of wrong theme on load
- [ ] Hero title masks and reveals in exactly 3 lines
- [ ] All interactive elements have `data-testid`
- [ ] Marquee runs at a slow, editorial pace (not carnival-fast)
- [ ] Chapters alternate left/right, images have the sticker overlay
- [ ] Pricing \"Team\" tier is the visually loudest tier
- [ ] Final CTA is inverted (dark on light page, or vice versa)
- [ ] Ghost wordmark in footer at ~6% opacity
- [ ] No gradients. Anywhere. If you see one, delete it.
- [ ] `prefers-reduced-motion` doesn't break anything

If all boxes tick and it *still* feels generic — the culprit is almost always: not enough spacing, or too many orange elements. Cut both in half.
"
