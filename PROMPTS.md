# PROMPTS.md — Section-by-Section Code Generation Prompts

Use these prompts **in order**, in one chat or coding session. Attach or paste `README.md` and `DESIGN.md` with Prompt 0. After each prompt, run the app and check it before moving to the next one.

Replace `[NAME]` and `[INITIALS]` with the client's details.

---

## Prompt 0 — Context (send first)

```
I'm building a React single-page personal website for [NAME], a software engineer with 20 years of experience who has also done social work for 10 years. The site has a mode switch: "Engineer" and "Social". Each section changes content, colours and fonts by mode.

I've attached README.md (stack, structure, sections) and DESIGN.md (design system). Follow them exactly. Use Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion + lucide-react. All colours and fonts must come from CSS variables defined per mode. All text content must come from data files, never hard-coded in components.

I'll ask for one part at a time. For each part, give me complete files with their full paths, no placeholders like "// rest of code". Confirm you understand, then wait for Prompt 1.
```

---

## Prompt 1 — Project setup, theme tokens, Tailwind config

```
Create the project foundation:
1. tailwind.config.ts: content paths; extend colors to map to CSS variables (bg, surface, surface-2, border, text, text-muted, primary, accent, success, warm); fontFamily display/body/mono mapped to CSS variables; borderRadius 'theme' = var(--radius); container settings.
2. src/index.css: Tailwind directives; :root and html[data-mode="engineer"] and html[data-mode="social"] blocks with every token from DESIGN.md sections 2–4; base styles for body, headings, focus-visible rings, selection colour; a .dot-grid background utility (engineer) and a .paper-texture utility (social); prefers-reduced-motion rules.
3. index.html: Google Fonts link for Space Grotesk, IBM Plex Sans, JetBrains Mono, Fraunces, Source Sans 3 (with display=swap and preconnect); set <html data-mode="engineer">.
4. src/main.tsx with HelmetProvider.
Give me the install commands too.
```

---

## Prompt 2 — Data layer (types + content files)

```
Create the data layer in src/data/:
1. types.ts: TypeScript interfaces for Mode ('engineer' | 'social'), HeroContent, AboutContent, Stat, TimelineItem, SkillGroup / Cause, Project (with problem, approach, outcome, tags, images, techStack?, beneficiaries?), Testimonial, Insight (type: article | talk | podcast | story | media), GalleryImage, Offer (Get Involved cards), NavLink, ModeContent (one object holding everything for a mode).
2. shared.ts: name, initials, email, location, socials, photos, the Intersection ("Tech for Good") projects.
3. engineer.ts and social.ts: full ModeContent objects with realistic sample content for a 20-year engineer and a 10-year social worker (6 timeline items, 4 stats, skill groups / 6 causes, 5 projects, 4 testimonials, 3 insights, offers, nav labels, SEO title and description). Mark sample values clearly with a comment "// TODO: replace with client content".
4. index.ts exporting getContent(mode).
```

---

## Prompt 3 — Mode context, hooks, and App shell

```
Create:
1. src/context/ModeContext.tsx: provides mode, setMode, toggleMode. Initial mode order: URL ?mode= → localStorage → 'engineer'. On change: set document.documentElement.dataset.mode, save to localStorage, update the URL with history.replaceState (no reload).
2. src/hooks/useMode.ts (returns mode + content from getContent), useScrollSpy.ts (returns the active section id using IntersectionObserver), useReducedMotion.ts.
3. src/components/ui/: Container, Section (id, className, children; handles padding and scroll-margin-top for the sticky nav), SectionHeading (eyebrow, title, subtitle, align), Button (variants primary/secondary/ghost, sizes, as link or button), Card, Badge, Chip, Reveal (Framer Motion wrapper: fade + y on scroll into view, once, respects reduced motion).
4. src/App.tsx: wraps everything in ModeProvider, sets <Helmet> title/description per mode, and renders the sections in the order from README section 3 (use placeholder components for now, I'll replace them one by one). Wrap the main content in AnimatePresence keyed by mode for the crossfade.
```

---

## Prompt 4 — Navbar + Mode Switch + Scroll Progress

```
Build src/components/layout/Navbar.tsx, ModeSwitch.tsx and ScrollProgress.tsx following DESIGN.md sections 5 and 6.1:
- Sticky navbar, transparent at the top, blurred surface + border after 40px of scroll.
- Monogram logo: [INITIALS] in brackets for engineer, in a circle for social.
- Nav links come from content.nav; active link highlighted with useScrollSpy; smooth scroll on click.
- CTA button on the right ("Hire me" / "Get involved") from content.
- ModeSwitch: pill toggle with two labels and a sliding thumb (Framer Motion layoutId), role="switch", aria-checked, keyboard support. On toggle, run a circular reveal overlay that expands from the switch's position in the new mode's --bg colour (600ms), then switch mode. Under reduced motion, just switch with a 150ms fade.
- First-visit tooltip "Switch to see my other world →" that shows once (remember dismissal in localStorage).
- Mobile: hamburger opens a full-screen sheet with links, the switch stays visible in the top bar. Lock body scroll when open; close on Escape and on link click.
- ScrollProgress: 2px bar at the very top in --primary.
```

---

## Prompt 5 — Hero section

```
Build src/components/sections/Hero.tsx following DESIGN.md 6.2.
- Reads content.hero (eyebrow, title, highlightWord, subtitle, primaryCta, secondaryCta).
- Engineer variant: two columns; left text; right an animated TerminalCard component that types commands (whoami, experience --years, stack --top) and their outputs line by line with a blinking cursor, then stops. Background: dot grid + slow-moving radial gradient glow in primary/accent.
- Social variant: two columns; left text with Fraunces H1 and an SVG hand-drawn underline that draws under highlightWord; right a portrait in an organic SVG blob mask with a floating stat card that bobs gently. Background: paper texture + soft blurred blobs in warm/accent.
- Staggered entrance animation; scroll cue at the bottom that scrolls to #about.
- Fully responsive (stack on mobile, image above text for social, terminal below text for engineer). Respect reduced motion (terminal shows full text immediately).
```

---

## Prompt 6 — About section

```
Build src/components/sections/About.tsx following DESIGN.md 6.3.
- Image 40% / text 60% on desktop; stacked on mobile.
- Engineer: photo with a thin bordered frame offset behind it; philosophy paragraphs; 3 principle cards with mono labels (01, 02, 03); a row of role badges.
- Social: photo with rounded corners and a sage accent shape behind it; personal story paragraphs; 3 value items with lucide icons; a pull-quote in Fraunces italic.
- Bottom line shared across modes from shared.ts (tagline).
- Wrap blocks in Reveal with stagger.
```

---

## Prompt 7 — Stats / Impact Counter

```
Build src/components/sections/Stats.tsx following DESIGN.md 6.4.
- 4 stats from content.stats (value, suffix, label, icon).
- Counter component: counts from 0 to value over 1.5s with ease-out when scrolled into view (once); formats numbers with commas; shows the final value immediately under reduced motion.
- Engineer: mono numbers in thin bordered boxes with a subtle glow on hover.
- Social: large Fraunces numbers on tinted cards (alternate warm and accent tints).
- 2x2 grid on mobile, 4 across on desktop.
```

---

## Prompt 8 — Experience / Journey Timeline

```
Build src/components/sections/Timeline.tsx and TimelineItem.tsx following DESIGN.md 6.5.
- Items from content.timeline (years, org, role, location, achievements[], tags[], logo? or image?).
- Desktop: centred vertical line with items alternating left and right. Mobile: line on the left, all items on the right.
- Engineer: straight solid line, square nodes, greyscale logos that colour on hover, mono year labels.
- Social: dashed line, round nodes in warm colour, small rounded photo per item, Fraunces year labels.
- The line "draws" downward as the user scrolls (Framer Motion useScroll + scaleY).
- Show first 5 items, then a "Show full journey" button that expands the rest with animation.
- Section heading labels from content (e.g. "Experience" vs "Journey").
```

---

## Prompt 9 — Skills (Engineer) / Focus Areas (Social)

```
Build src/components/sections/Skills.tsx following DESIGN.md 6.6. Render a different layout per mode:
- Engineer: accessible tabs (role="tablist", arrow-key navigation) for skill groups (Languages, Cloud & DevOps, Data, Architecture, Leadership). Each tab shows a grid of chips: icon, skill name, years of use, and a small bar showing years relative to 20. Animate the tab panel change.
- Social: grid of 6 cause cards (icon in a soft tinted circle, title, one-line description, key number). Cards lift on hover.
- Content from content.skills (engineer) / content.causes (social).
```

---

## Prompt 10 — Projects / Initiatives with modal

```
Build src/components/sections/Projects.tsx, ProjectCard.tsx and ProjectModal.tsx following DESIGN.md 6.7.
- Filter chips at the top built from all project tags + "All"; filtering animates with Framer Motion layout.
- Card grid: 1 / 2 / 3 columns by breakpoint. Card: image (lazy, aspect 16:10), title, summary, up to 3 tags, "Read more".
- Modal: opens on card click; accessible (focus trap, Escape to close, return focus, aria-modal, body scroll lock). Shows Problem → Approach → Outcome; engineer adds a techStack chip list and optional diagram image; social adds a beneficiaries highlight and an image carousel with swipe support.
- Section labels from content ("Selected Work" vs "Initiatives").
```

---

## Prompt 11 — Intersection: "Tech for Good"

```
Build src/components/sections/Intersection.tsx following DESIGN.md 6.8.
- Shows in both modes using shared.intersection projects; only the heading and intro text change per mode (from content.intersectionIntro).
- Visual: a full-width band whose background is a gradient blending the engineer navy and the social cream (use fixed colours here, not mode variables), with a thin animated line that "connects" a code icon on one side to a heart icon on the other.
- 2–3 project cards in a row: title, the problem, what was built, the people it helped, and two small badges ("Tech" + "Impact").
- Make sure text contrast passes AA on the gradient (use a solid card background for text).
```

---

## Prompt 12 — Testimonials carousel

```
Build src/components/sections/Testimonials.tsx following DESIGN.md 6.9.
- Content from content.testimonials (quote, name, title, org, photo?).
- Carousel: 1 card on mobile, 2 on desktop; arrows, dots, swipe; auto-advance every 6s, paused on hover/focus and under reduced motion. Accessible: region with aria-roledescription="carousel", slide labels "x of n", live region announcing the change only on manual navigation.
- Engineer card: quote styled like a code comment (/* ... */ in mono for the marks), name + title + company.
- Social card: large Fraunces quotation mark in warm colour, round photo, name and relationship.
```

---

## Prompt 13 — Insights / Blog

```
Build src/components/sections/Insights.tsx following DESIGN.md 6.10.
- Content from content.insights (type, title, excerpt, date, readTime, url, thumbnail).
- 3 cards in a row (stacked on mobile) + "View all" button linking to content.insightsAllUrl.
- Type badge with an icon per type (article, talk with a play-button overlay on the thumbnail, podcast, story, media).
- External links open in a new tab with rel="noopener noreferrer".
```

---

## Prompt 14 — Gallery (Social only) with lightbox

```
Build src/components/sections/Gallery.tsx and Lightbox.tsx following DESIGN.md 6.11.
- Only renders when mode === 'social' (animate in/out on mode change).
- Masonry layout with CSS columns (1/2/3 by breakpoint); lazy-loaded images with a blurred placeholder.
- Lightbox: full screen, image + caption + location/date, prev/next buttons, arrow keys, swipe, Escape to close, focus trap, counter "3 / 18".
- Content from content.gallery (src, alt, caption, location, date).
```

---

## Prompt 15 — Get Involved / Work With Me

```
Build src/components/sections/GetInvolved.tsx following DESIGN.md 6.12.
- 3 offer cards from content.offers (icon, title, description, bullets[], ctaLabel, ctaHref, external?).
- Engineer: Consulting, Mentoring, Speaking; cards with bordered style and glow on hover; the middle card is marked "Most requested".
- Social: Volunteer, Donate, Partner; rounded warm cards; Donate is visually emphasised with the primary colour background.
- CTAs either scroll to #contact with the enquiry type pre-set (pass it via a small shared state in ModeContext or a URL hash like #contact?type=mentoring) or open external links.
```

---

## Prompt 16 — Contact form

```
Build src/components/sections/Contact.tsx following DESIGN.md 6.13.
- Left: heading, short line, email (copy-to-clipboard button with a "Copied" toast), location, social icon links.
- Right: form with React Hook Form + Zod: name (required), email (valid), enquiryType (select; options differ per mode; default from the mode and from any CTA that sent the user here), message (min 20 chars), and a hidden honeypot field for spam.
- Submit to Formspree using import.meta.env.VITE_FORMSPREE_ID (show me the .env.example). States: idle, submitting (button spinner, disabled), success (friendly message + "Send another"), error (message + retry).
- Inline errors with aria-describedby; labels always visible.
```

---

## Prompt 17 — Footer

```
Build src/components/layout/Footer.tsx following DESIGN.md 6.14.
- Three columns (stacked on mobile): short bio + logo; quick links (from content.nav); socials.
- A line "You're viewing the engineer side · Switch to social" that calls toggleMode and scrolls to the top.
- Bottom bar: © year [NAME], NGO registration text in social mode (from content), "Built with React".
- A "Back to top" button.
```

---

## Prompt 18 — Final assembly, SEO, performance, accessibility

```
Now finalise:
1. Replace all placeholder components in App.tsx with the real sections; add a skip-to-content link.
2. SEO: Helmet per mode (title, description, canonical, Open Graph and Twitter tags with a per-mode OG image), JSON-LD Person schema (jobTitle lists both roles), robots.txt and sitemap.xml in /public, favicon set and web manifest.
3. Performance: lazy-load Gallery, ProjectModal and Lightbox with React.lazy + Suspense; image components with width/height, loading="lazy", decoding="async"; preload the hero image and display fonts.
4. Accessibility pass: check every interactive element for keyboard access and focus styles; check heading order (one h1); check aria on switch, tabs, carousel, modal, lightbox.
5. Add a 404-safe vercel.json / netlify.toml.
6. Give me a final checklist to test both modes at 360, 768, 1024 and 1440 px.
```

---

## Optional follow-ups

- **Dark/light inside each mode:** "Add a secondary light/dark toggle that works inside each mode."
- **CMS:** "Move content from src/data to Sanity / Contentful and fetch it at build time."
- **Blog pages:** "Add React Router and MDX blog post pages while keeping the home page as the SPA."
- **Analytics:** "Add privacy-friendly analytics (Plausible) and track mode switches as an event."
- **Multilingual:** "Add i18n (English + Hindi) with a language switch."
