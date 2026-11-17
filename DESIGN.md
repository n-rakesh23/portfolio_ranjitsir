# DESIGN.md — Dual-Identity Website Design System

## 1. Design Concept

**"One person, two lenses."**
The page layout (the skeleton) stays the same in both modes. The **skin** changes: colour, type, texture, imagery and tone of voice. When a visitor flips the switch, it should feel like the same room with different lighting.

| | Engineer Mode | Social Mode |
|---|---|---|
| Mood | Precise, modern, confident | Warm, human, hopeful |
| Metaphor | Blueprint / terminal / circuit | Earth / hands / community |
| Background | Dark (near-black navy) | Light (warm cream) |
| Shapes | Sharp corners, grids, thin lines | Rounded corners, organic blobs, soft shadows |
| Imagery | Diagrams, code, product screenshots | Real field photos, people, places |
| Voice | Short, technical, results-first | Story-led, empathetic, inviting |

---

## 2. Colour Tokens

All colours are CSS variables on `html[data-mode="..."]`. Tailwind reads them as `bg-[var(--bg)]` or through `theme.extend.colors`.

### Engineer Mode (dark)
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0B1020` | Page background |
| `--surface` | `#121A2F` | Cards |
| `--surface-2` | `#1A2440` | Hover, inputs |
| `--border` | `#24304F` | Lines, dividers |
| `--text` | `#E6EAF2` | Body text |
| `--text-muted` | `#8A96B0` | Secondary text |
| `--primary` | `#38BDF8` | Cyan: links, buttons |
| `--accent` | `#A78BFA` | Violet: highlights, gradients |
| `--success` | `#34D399` | Terminal "ok", status |

### Social Mode (light)
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FBF7F0` | Page background (cream) |
| `--surface` | `#FFFFFF` | Cards |
| `--surface-2` | `#F3ECE0` | Hover, inputs |
| `--border` | `#E6DCCB` | Lines |
| `--text` | `#2B2420` | Body text |
| `--text-muted` | `#6E625A` | Secondary |
| `--primary` | `#C2553A` | Terracotta: buttons, links |
| `--accent` | `#5E8C6A` | Sage green: highlights |
| `--warm` | `#E9A84C` | Marigold: badges, stats |

Check contrast for every text/background pair (target AA: 4.5:1 for body, 3:1 for large text).

---

## 3. Typography

| Role | Engineer | Social |
|---|---|---|
| Display / H1–H2 | **Space Grotesk** 600–700 | **Fraunces** 600 (serif) |
| Body | **IBM Plex Sans** 400/500 | **Source Sans 3** 400/500 |
| Mono / labels | **JetBrains Mono** 400 | Not used (use Source Sans 3 italic for small labels) |

Type scale (rem): `0.75 · 0.875 · 1 · 1.125 · 1.25 · 1.5 · 2 · 2.5 · 3.5 · 4.5`
- H1: 3.5 mobile → 4.5 desktop, line-height 1.05
- H2: 2 → 2.5, line-height 1.15
- Body: 1.0625, line-height 1.65, max width 68ch

Font tokens: `--font-display`, `--font-body`, `--font-mono`, swapped per mode.

---

## 4. Spacing, Grid, Radius, Shadow

- **Container:** max-width 1200px, padding 20px mobile, 32px desktop
- **Section padding:** 96px desktop, 64px mobile
- **Grid:** 12 columns, 24px gap
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96
- **Radius:** Engineer `--radius: 6px` · Social `--radius: 20px`
- **Shadows:** Engineer uses glows (`0 0 0 1px var(--border), 0 8px 30px rgba(56,189,248,.08)`); Social uses soft drop shadows (`0 10px 30px rgba(43,36,32,.08)`)

---

## 5. The Mode Switch (signature element)

- Lives in the navbar on the right; on mobile it stays visible next to the menu icon.
- Pill-shaped toggle, about 220×44px, with two labels: `</> Engineer` | `♥ Social`.
- A sliding thumb moves under the active label (Framer Motion `layoutId`).
- On switch:
  1. A circular reveal starts from the toggle position and covers the screen in the new `--bg` colour (about 600ms, eased).
  2. Section content crossfades with a slight upward motion (y: 12 → 0, opacity 0 → 1, staggered).
  3. The URL updates to `?mode=...`; the page title updates.
- With reduced motion, a plain 150ms colour fade replaces all of this.
- First visit: a small tooltip ("Switch to see my other world →") pulses once, then is dismissed and remembered.
- Accessibility: `role="switch"`, `aria-checked`, `aria-label="Switch to social worker mode"`, keyboard Space/Enter.

---

## 6. Section-by-Section Layout

### 6.1 Navbar
- Sticky, 72px high; transparent at the top, then blurred surface + border after 40px of scroll.
- Left: monogram logo (initials). Engineer: in a bracket `[RK]`. Social: in a circle.
- Centre: About · Journey · Work · Insights · Contact (labels change per mode, e.g. Work becomes Initiatives).
- Right: Mode Switch + CTA button ("Hire me" / "Get involved").
- Mobile: hamburger opens a full-screen sheet.
- A scroll-progress bar (2px, `--primary`) sits at the top.

### 6.2 Hero
- **Engineer:** two columns. Left: eyebrow `// software engineer · 20 yrs`, H1 "Building systems that scale.", subline, two buttons (View work / Download CV). Right: an animated terminal card that types `whoami`, `experience --years`, `stack --top`. Background: faint dot grid and a slow-moving gradient glow.
- **Social:** two columns. Left: eyebrow "Social worker · 10 years in the field", H1 "Building communities that last." in Fraunces, subline, buttons (See the impact / Volunteer). Right: a portrait in an organic blob mask with a small floating card ("12,000+ lives reached"). Background: soft paper texture and hand-drawn underline on a key word.
- Scroll cue at the bottom.

### 6.3 About
- Image left (40%), text right (60%).
- Engineer: philosophy paragraph, 3 "principles" as mono-labelled bullet cards, signature roles (Architect, CTO, Mentor).
- Social: personal story ("why I left the boardroom for the field"), 3 values with icons, a pull-quote.
- Shared footer line: "Engineer by training. Social worker by choice." (adapt as the client prefers).

### 6.4 Stats / Impact Counter
- Band of 4 stats; numbers count up when they scroll into view.
- Engineer: mono numbers, thin border boxes. Social: big Fraunces numbers on marigold/sage tinted cards.

### 6.5 Experience / Journey Timeline
- Vertical timeline, centred on desktop, left-aligned on mobile.
- Each item: years, organisation, role, 2–3 achievement bullets, tags.
- Engineer: straight line with square nodes; company logos in greyscale.
- Social: dotted curved line with round nodes; small photo per milestone.
- Items reveal on scroll; "Show more" after 5 items.

### 6.6 Skills / Focus Areas
- Engineer: tabbed grid (Languages · Cloud · Data · Architecture · Leadership); each skill is a chip with icon and years-of-use bar.
- Social: 6 cause cards (Education, Health, Women's empowerment, Livelihood, Environment, Digital literacy) with an icon, a short line and one key number.

### 6.7 Projects / Initiatives
- Filter chips at the top; 2–3 column card grid.
- Card: image, title, one-line summary, tags, "Read more".
- Clicking opens a modal (or expanding panel) with Problem → Approach → Outcome; engineer adds a tech stack list and a diagram, social adds a beneficiaries count and a photo carousel.

### 6.8 Intersection — "Tech for Good" (same content in both modes)
- A full-width band that visually blends both palettes (gradient from engineer navy to social cream, or a split layout).
- 2–3 projects where engineering served social work (e.g. an app for an NGO, digital-literacy programmes).
- This section ties the two identities together, so it shows in both modes with only the framing text changed.

### 6.9 Testimonials
- Carousel: one large quote at a time on mobile, 2 on desktop.
- Engineer: quote in a code-comment style card, name, title, company.
- Social: quote with large serif quotation mark, photo, name, relationship (beneficiary / partner).
- Auto-advance pauses on hover/focus; dots + arrows.

### 6.10 Insights / Blog
- 3 latest items + "View all".
- Engineer: articles, conference talks (with a video thumbnail), podcasts.
- Social: field stories, media coverage, reflections.
- Cards show type badge, date, read time.

### 6.11 Gallery (Social Mode only)
- Masonry grid of field photos; lightbox on click with captions.
- In Engineer Mode this section is hidden (or replaced by "Architecture Sketches").

### 6.12 Get Involved / Work With Me
- Engineer: 3 offer cards: Consulting · Mentoring · Speaking, each with a CTA.
- Social: 3 cards: Volunteer · Donate · Partner, each with a CTA; Donate opens an external link.

### 6.13 Contact
- Two columns: left has heading, email, location, socials; right has the form.
- Form fields: Name, Email, Enquiry type (pre-selected by mode), Message.
- Validation inline; success state with a friendly message; error state with a retry option.

### 6.14 Footer
- Three columns: short bio, quick links, socials.
- A small mode switch link: "Viewing engineer side · switch".
- Copyright, NGO registration (social), "Built with React".

---

## 7. Motion Guidelines

| Element | Animation | Duration |
|---|---|---|
| Section reveal | fade + y 24→0 on scroll into view (once) | 500ms, stagger 80ms |
| Mode switch | circular reveal + crossfade | 600ms |
| Buttons | scale 1→1.03 on hover, 0.98 on press | 150ms |
| Cards | lift -4px + shadow/glow on hover | 200ms |
| Counters | count up | 1.5s ease-out |
| Terminal | typewriter, 30ms/char | — |

Easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Turn off everything except fades under `prefers-reduced-motion`.

---

## 8. Components Library

`Container`, `Section` (id, padding, heading), `SectionHeading` (eyebrow, title, subtitle), `Button` (primary / secondary / ghost; sm / md / lg), `Card`, `Badge`, `Chip`, `Modal`, `Carousel`, `Lightbox`, `Counter`, `TimelineItem`, `IconBox`, `ModeSwitch`, `ScrollProgress`, `Reveal` (motion wrapper).

Every component reads theme values only from CSS variables. No hard-coded colours.

---

## 9. Responsive Breakpoints

| Name | Width | Changes |
|---|---|---|
| sm | 640px | Single column → some 2-col grids |
| md | 768px | Timeline goes two-sided; hero goes two-column |
| lg | 1024px | Full nav links shown; 3-col grids |
| xl | 1280px | Max container width |

---

## 10. Imagery and Content Tone

- **Engineer:** product screenshots in device frames, architecture diagrams, abstract grids. No stock "hacker" photos.
- **Social:** real photos only, natural light, people's faces with consent; avoid images that show people only as helpless or in poverty. Show dignity and agency.
- Alt text on every image describes what is happening, not just "photo".
- Copy: Engineer uses verbs and numbers ("Cut infra cost 40%"). Social uses people and stories ("Priya now teaches 30 girls in her village").
