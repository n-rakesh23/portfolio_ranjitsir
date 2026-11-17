export type Mode = 'engineer' | 'social';

export type SectionId =
  | 'hero'
  | 'about'
  | 'stats'
  | 'journey'
  | 'skills'
  | 'work'
  | 'intersection'
  | 'testimonials'
  | 'insights'
  | 'gallery'
  | 'get-involved'
  | 'contact';

/** Keys of the lucide icon map in components/ui/Icon.tsx. */
export type IconName =
  | 'code'
  | 'terminal'
  | 'server'
  | 'cloud'
  | 'database'
  | 'layers'
  | 'cpu'
  | 'git-branch'
  | 'rocket'
  | 'award'
  | 'briefcase'
  | 'users'
  | 'globe'
  | 'shield'
  | 'zap'
  | 'trending-up'
  | 'target'
  | 'compass'
  | 'lightbulb'
  | 'heart'
  | 'hand-heart'
  | 'handshake'
  | 'gift'
  | 'graduation-cap'
  | 'stethoscope'
  | 'sprout'
  | 'leaf'
  | 'laptop'
  | 'home'
  | 'sparkles'
  | 'smile'
  | 'mic'
  | 'book-open'
  | 'newspaper'
  | 'headphones'
  | 'play'
  | 'message-square'
  | 'map-pin'
  | 'calendar'
  | 'mail'
  | 'phone'
  | 'download'
  | 'external-link'
  | 'linkedin'
  | 'github'
  | 'x'
  | 'youtube'
  | 'instagram';

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Cta {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
}

/** Heading copy for a section, rendered by SectionHeading. */
export interface SectionLabels {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export interface NavLink {
  id: SectionId;
  label: string;
  href: `#${SectionId}`;
}

export interface SeoContent {
  title: string;
  description: string;
  /** Absolute or root-relative path to the per-mode OG image. */
  ogImage: string;
}

export interface TerminalLine {
  command: string;
  output: string[];
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  /** A word (or phrase) inside `title` to emphasise / underline. Must appear verbatim in title. */
  highlightWord: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  /** Engineer: terminal script typed in the hero card. Empty array in social mode. */
  terminal: TerminalLine[];
  /** Engineer: title bar text of the terminal card. */
  terminalTitle?: string;
  /** Social: portrait shown in the blob mask. */
  image?: ImageAsset;
  /** Social: floating stat card next to the portrait. */
  floatingStat?: { value: string; label: string };
  scrollCueLabel: string;
}

export interface AboutPoint {
  /** Engineer: mono label such as "01". Social: short label (may be unused). */
  label: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface AboutContent {
  image: ImageAsset;
  paragraphs: string[];
  /** Engineer: 3 principles. Social: 3 values. */
  points: AboutPoint[];
  /** Engineer: signature role badges (Architect, CTO, Mentor). Empty in social. */
  roles: string[];
  /** Social: pull-quote in Fraunces italic. */
  pullQuote?: string;
}

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: IconName;
}

export interface TimelineItem {
  id: string;
  years: string;
  org: string;
  role: string;
  location?: string;
  achievements: string[];
  tags: string[];
  /** Engineer: company logo (greyscale until hover). */
  logo?: ImageAsset;
  /** Social: small milestone photo. */
  image?: ImageAsset;
}

export interface SkillItem {
  name: string;
  icon: IconName;
  /** Years of use, out of 20. */
  years: number;
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: SkillItem[];
}

export interface Cause {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  keyNumber: { value: string; label: string };
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  image: ImageAsset;
  tags: string[];
  problem: string;
  approach: string;
  outcome: string;
  /** Engineer only. */
  techStack?: string[];
  /** Engineer only. */
  diagram?: ImageAsset;
  /** Social only. */
  beneficiaries?: { value: string; label: string };
  /** Social only: carousel images. */
  images?: ImageAsset[];
  link?: Cta;
}

export interface IntersectionProject {
  id: string;
  title: string;
  problem: string;
  built: string;
  helped: string;
  techBadge: string;
  impactBadge: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  /** Engineer: job title. Social: role, e.g. "Programme Director". */
  title: string;
  org: string;
  /** Social: relationship, e.g. "Beneficiary", "Partner NGO", "Volunteer". */
  relationship?: string;
  photo?: ImageAsset;
}

export type InsightType = 'article' | 'talk' | 'podcast' | 'story' | 'media';

export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  excerpt: string;
  /** ISO date, e.g. "2025-03-14". */
  date: string;
  readTime: string;
  url: string;
  thumbnail: ImageAsset;
}

export interface GalleryImage extends ImageAsset {
  id: string;
  caption: string;
  location: string;
  date: string;
  /** Tiny blurred data URI shown while the full image loads. */
  placeholder?: string;
}

export interface Offer {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  /** "#contact" to scroll to the form, or an external URL. */
  ctaHref: string;
  external?: boolean;
  /** Enquiry value to pre-select in the contact form when ctaHref is "#contact". */
  enquiryType?: string;
  /** Visually emphasised card (engineer "Most requested", social Donate). */
  highlight?: boolean;
  /** Badge text on highlighted card, e.g. "Most requested". */
  badge?: string;
}

export interface EnquiryOption {
  value: string;
  label: string;
}

export interface ContactFormLabels {
  name: string;
  email: string;
  enquiryType: string;
  message: string;
  honeypot: string;
  sending: string;
  sendAnother: string;
  retry: string;
  errors: {
    nameRequired: string;
    emailInvalid: string;
    enquiryRequired: string;
    messageMin: string;
  };
  emailLabel: string;
  locationLabel: string;
  socialsLabel: string;
  copyEmail: string;
}

export interface ContactContent {
  line: string;
  enquiryOptions: EnquiryOption[];
  defaultEnquiry: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  errorMessage: string;
  form: ContactFormLabels;
}

export interface FooterContent {
  bio: string;
  /** e.g. "You're viewing the engineer side". */
  switchPrompt: string;
  /** e.g. "Switch to social". */
  switchLabel: string;
  /** Social only. */
  ngoRegistration?: string;
  /** Social only. */
  donateLink?: Cta;
  builtWith: string;
}

export interface ModeSwitchContent {
  /** aria-label for the switch, e.g. "Switch to social worker mode". */
  ariaLabel: string;
  engineerLabel: string;
  socialLabel: string;
}

/** Small reusable UI strings. */
export interface UiLabels {
  readMore: string;
  viewAll: string;
  filterAll: string;
  showMore: string;
  showLess: string;
  close: string;
  previous: string;
  next: string;
  copy: string;
  copied: string;
  backToTop: string;
  menu: string;
  skipToContent: string;
  mostRequested: string;
  problem: string;
  approach: string;
  outcome: string;
  techStack: string;
  beneficiaries: string;
  /** Screen-reader suffix on links that open in a new tab. */
  opensInNewTab: string;
  /** Joins slide counters, e.g. "1 of 4". */
  of: string;
  testimonialsCarousel: string;
  skillCategories: string;
  filterByTag: string;
  photos: string;
  tags: string;
  footerQuickLinks: string;
  footerConnect: string;
  navPrimary: string;
  navMobile: string;
  insightTypes: Record<InsightType, string>;
}

export interface ModeContent {
  mode: Mode;
  seo: SeoContent;
  nav: NavLink[];
  navCta: Cta;
  modeSwitch: ModeSwitchContent;
  sections: Record<Exclude<SectionId, 'hero'>, SectionLabels>;
  hero: HeroContent;
  about: AboutContent;
  stats: Stat[];
  timeline: TimelineItem[];
  /** Engineer only; empty array in social. */
  skills: SkillGroup[];
  /** Social only; empty array in engineer. */
  causes: Cause[];
  projects: Project[];
  intersectionIntro: SectionLabels;
  testimonials: Testimonial[];
  insights: Insight[];
  insightsAllUrl: string;
  /** Social only; empty array in engineer. */
  gallery: GalleryImage[];
  offers: Offer[];
  contact: ContactContent;
  footer: FooterContent;
  labels: UiLabels;
}

export type SocialPlatform = 'linkedin' | 'github' | 'x' | 'youtube' | 'instagram';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
}

export interface SharedContent {
  name: string;
  initials: string;
  email: string;
  location: string;
  siteUrl: string;
  cvUrl: string;
  socials: SocialLink[];
  photos: Record<Mode, ImageAsset>;
  /** Shared line at the bottom of About, e.g. "Engineer by training. Social worker by choice." */
  tagline: string;
  intersection: IntersectionProject[];
  firstVisitTooltip: string;
}
