# Dual-Identity Personal Website — Software Engineer × Social Worker

A single-page React website for a professional with **20 years in software engineering** and **10 years in social work**. One site, two identities: visitors switch between **Engineer Mode** and **Social Mode** with a toggle. Every section changes its content, colours, typography and imagery to match the selected mode.

---

## 1. Goals

| Goal | How the site achieves it |
|---|---|
| Present both careers equally | A mode switch in the navbar; neither mode is "secondary" |
| Build credibility (engineering) | Experience timeline, tech stack, case studies, open source, talks |
| Build trust (social work) | Causes, initiatives, impact numbers, stories, volunteer and donate calls to action |
| Show the link between the two | An "Intersection" section: tech for social good |
| Easy to update | All content lives in typed data files, not in components |
| Fast and accessible | Lighthouse 95+, WCAG 2.1 AA, works without animation |

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Build tool | **Vite** | Fast dev server, simple config |
| Framework | **React 18 + TypeScript** | Type-safe content and components |
| Styling | **Tailwind CSS** + CSS variables | Theme tokens swap per mode |
| Animation | **Framer Motion** | Mode transitions, scroll reveals |
| Icons | **lucide-react** | Light, consistent icon set |
| Forms | **React Hook Form + Zod** | Contact and volunteer form validation |
| Form delivery | Formspree / EmailJS / serverless function | No backend needed |
| SEO | **react-helmet-async** | Title and meta tags per mode |
| Hosting | Vercel / Netlify | Free tier, CI from GitHub |

No router is needed: it is a single page with anchor navigation. The mode is stored in **React Context**, saved to **localStorage**, and mirrored in the URL (`?mode=engineer` / `?mode=social`), so each mode can be shared as a link.

---

## 3. Site Sections

| # | Section | Engineer Mode | Social Mode |
|---|---|---|---|
| 1 | Navbar + Mode Switch | Logo, links, toggle | Same, warm theme |
| 2 | Hero | "Building systems that scale" + terminal-style intro | "Building communities that last" + portrait and mission line |
| 3 | About | Engineering philosophy, roles, leadership | Why he serves, personal story, values |
| 4 | Stats / Impact Counter | 20+ yrs, 50+ products, teams led, users served | 10+ yrs, lives reached, volunteers, villages/NGOs |
| 5 | Experience / Journey | Career timeline (companies, roles) | Social-work timeline (organisations, milestones) |
| 6 | Skills / Focus Areas | Tech-stack grid by category | Causes: education, health, livelihood, etc. |
| 7 | Projects / Initiatives | Case studies with tech, problem, outcome | Initiatives with beneficiaries, photos, outcomes |
| 8 | Intersection (shared) | "Tech for Good": projects where both worlds meet | Same section, social framing |
| 9 | Testimonials | Colleagues, clients, CTOs | Beneficiaries, partner NGOs, volunteers |
| 10 | Insights / Blog | Tech articles, talks, podcasts | Field stories, reflections, media coverage |
| 11 | Gallery | (hidden or architecture diagrams) | Photos from field work |
| 12 | Get Involved / Hire Me | Consulting, mentoring, speaking CTA | Volunteer, donate, partner CTA |
| 13 | Contact | Contact form (enquiry type: tech) | Contact form (enquiry type: social) |
| 14 | Footer | Links, socials, GitHub, LinkedIn | Links, socials, NGO registration, donate link |

---

## 4. Folder Structure

```
src/
├── main.tsx
├── App.tsx
├── index.css                 # Tailwind + theme CSS variables
├── context/
│   └── ModeContext.tsx       # mode state, toggle, persistence
├── hooks/
│   ├── useMode.ts
│   ├── useScrollSpy.ts
│   └── useReducedMotion.ts
├── data/                     # ALL editable content lives here
│   ├── types.ts
│   ├── shared.ts             # name, photo, socials, contact
│   ├── engineer.ts           # engineer-mode content
│   └── social.ts             # social-mode content
├── components/
│   ├── ui/                   # Button, Card, Badge, SectionHeading, Container
│   ├── layout/               # Navbar, ModeSwitch, Footer, ScrollProgress
│   └── sections/             # Hero, About, Stats, Timeline, Skills,
│                             # Projects, Intersection, Testimonials,
│                             # Insights, Gallery, GetInvolved, Contact
└── assets/
    ├── images/
    └── fonts/
```

---

## 5. Mode System (how it works)

1. `ModeContext` holds `mode: 'engineer' | 'social'`.
2. On load the mode is read in this order: URL param, then localStorage, then the default (`engineer`).
3. `<html data-mode="engineer">` is set, so CSS variables in `index.css` swap the whole palette and fonts.
4. Every section calls `useMode()` and picks its content from `data/engineer.ts` or `data/social.ts`.
5. Framer Motion `AnimatePresence` crossfades section content on switch.
6. Page `<title>` and meta description update per mode.

---

## 6. Getting Started

```bash
npm create vite@latest dual-portfolio -- --template react-ts
cd dual-portfolio
npm install
npm install framer-motion lucide-react react-hook-form zod @hookform/resolvers react-helmet-async
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

Scripts:

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |

---

## 7. Content Checklist (collect from the client)

- [ ] Full name, preferred title for each mode, short bio (both modes)
- [ ] 2 professional photos (formal for engineer, field or candid for social)
- [ ] Career history: company, role, years, 2–3 achievements each
- [ ] Tech skills list, grouped by category
- [ ] 4–6 engineering case studies
- [ ] Social work organisations, roles, years
- [ ] 4–6 social initiatives with numbers (people reached, funds raised)
- [ ] Impact numbers for both modes
- [ ] 6+ testimonials (3 per mode), with permission
- [ ] Blog posts, talks, media links
- [ ] 12–20 field photos, with consent from the people shown
- [ ] NGO registration details, donation link (if any)
- [ ] Social links: LinkedIn, GitHub, X, YouTube, Instagram
- [ ] Contact email and form delivery service

---

## 8. Quality Targets

- Lighthouse: Performance, Accessibility, Best Practices, SEO all 95+
- Fully responsive at 360px, 768px, 1024px and 1440px
- Keyboard navigable; visible focus rings; mode switch has `role="switch"` and `aria-checked`
- Respects `prefers-reduced-motion`
- Images in WebP/AVIF, lazy-loaded, with alt text
- Colour contrast AA in both modes

---

## 9. Deployment

1. Push to GitHub.
2. Import the repo in Vercel or Netlify (build: `npm run build`, output: `dist`).
3. Add a custom domain and HTTPS.
4. Add env vars for the form service (`VITE_FORMSPREE_ID` and similar).

---

## 10. Related Docs

- `DESIGN.md`: visual design system, both themes, section-by-section layout
- `PROMPTS.md`: step-by-step prompts to generate each section's code
