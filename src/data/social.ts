import { blurSrc, placeholder } from './placeholder';
import { shared } from './shared';
import type { GalleryImage, ModeContent } from './types';

const img = (label: string, alt: string, w = 1280, h = 800) => placeholder(label, alt, w, h, 'social');
const photo = (label: string, alt: string) => placeholder(label, alt, 320, 320, 'social');

const galleryShapes: Array<[number, number]> = [
  [800, 1000], [800, 600], [800, 800], [800, 1100], [800, 600], [800, 900],
  [800, 700], [800, 1000], [800, 600], [800, 800], [800, 1100], [800, 650],
];

const galleryCaptions: Array<[string, string, string]> = [
  ['Evening reading circle with girls from the learning centre', 'Kolar, Karnataka', '2026-08'],
  ['Health camp volunteers checking blood pressure', 'Tumakuru, Karnataka', '2026-06'],
  ['Women from a self-help group packing millet snacks for sale', 'Mandya, Karnataka', '2026-04'],
  ['Students presenting their first coding project', 'Bengaluru Rural', '2026-02'],
  ['Planting saplings along the village tank', 'Chikkaballapur, Karnataka', '2025-11'],
  ['Mothers attending a nutrition workshop', 'Ramanagara, Karnataka', '2025-09'],
  ['Volunteers painting a primary school classroom', 'Kolar, Karnataka', '2025-07'],
  ['A farmer learning to check crop prices on a phone', 'Hassan, Karnataka', '2025-05'],
  ['Community meeting to plan a new water filter', 'Tumakuru, Karnataka', '2025-03'],
  ['Graduation day at the digital literacy centre', 'Mandya, Karnataka', '2024-12'],
  ['Children playing during a summer camp', 'Chikkaballapur, Karnataka', '2024-05'],
  ['Partner NGO staff at a training day', 'Bengaluru', '2024-02'],
];

const gallery: GalleryImage[] = galleryCaptions.map(([caption, location, date], i) => {
  const [w, h] = galleryShapes[i];
  return {
    id: `g${i + 1}`,
    ...placeholder(`Field photo ${i + 1}`, caption, w, h, 'social'),
    caption,
    location,
    date,
    placeholder: blurSrc('social'),
  };
});

// TODO: replace with client content
export const social: ModeContent = {
  mode: 'social',
  seo: {
    title: `${shared.name} — Social Worker & Community Builder`,
    description:
      'Ten years in the field building communities that last: education, health, livelihood and digital literacy across rural Karnataka.',
    ogImage: '/og-social.png',
  },
  nav: [
    { id: 'about', label: 'Story', href: '#about' },
    { id: 'journey', label: 'Journey', href: '#journey' },
    { id: 'work', label: 'Initiatives', href: '#work' },
    { id: 'insights', label: 'Stories', href: '#insights' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],
  navCta: { label: 'Get involved', href: '#get-involved' },
  modeSwitch: { ariaLabel: 'Social worker mode', engineerLabel: 'Engineer', socialLabel: 'Social' },
  sections: {
    about: { eyebrow: 'My story', title: 'Why I chose the field.', subtitle: 'From boardrooms to village squares.' },
    stats: { eyebrow: 'Impact so far', title: 'Ten years, counted in people.' },
    journey: { eyebrow: 'The journey', title: 'Journey', subtitle: 'Organisations and milestones along the way.' },
    skills: { eyebrow: 'Focus areas', title: 'Causes I work on', subtitle: 'Six areas where small changes add up.' },
    work: { eyebrow: 'On the ground', title: 'Initiatives', subtitle: 'Programmes built with communities, not for them.' },
    intersection: { eyebrow: 'Tech for good', title: 'When technology serves people' },
    testimonials: { eyebrow: 'In their words', title: 'Voices from the field' },
    insights: { eyebrow: 'Stories', title: 'Field stories & media', subtitle: 'Reflections, reports and coverage.' },
    gallery: { eyebrow: 'Gallery', title: 'Moments from the field', subtitle: 'Shared with the consent of everyone pictured.' },
    'get-involved': { eyebrow: 'Get involved', title: 'Join the work' },
    contact: { eyebrow: 'Say hello', title: "Let's work together", subtitle: 'Volunteer, partner or just say hello.' },
  },
  hero: {
    eyebrow: 'Social worker · 10 years in the field',
    title: 'Building communities that last.',
    highlightWord: 'communities',
    subtitle:
      'I work alongside villages, schools and women-led groups across Karnataka so that every person has the chance to learn, earn and thrive.',
    primaryCta: { label: 'See the impact', href: '#work' },
    secondaryCta: { label: 'Volunteer', href: '#get-involved' },
    terminal: [],
    image: shared.photos.social,
    floatingStat: { value: '12,000+', label: 'lives reached' },
    scrollCueLabel: 'Scroll to my story',
  },
  about: {
    image: shared.photos.social,
    paragraphs: [
      'In 2016 I spent a weekend teaching coding to children in my grandmother\'s village. They learned faster than any team I had managed, and they had nothing: no laptops, no internet, no library.',
      'That weekend became a monthly visit, then a weekly one. Today I split my time between engineering and the field, and the field is where I learn the most.',
    ],
    points: [
      { label: 'Dignity', title: 'Dignity first', description: 'People are partners, never projects.', icon: 'heart' },
      { label: 'Listen', title: 'Listen before acting', description: 'The community sets the agenda.', icon: 'message-square' },
      { label: 'Last', title: 'Build to last', description: 'Every programme is designed to run without me.', icon: 'sprout' },
    ],
    roles: [],
    pullQuote: '"The best thing I ever built was a reading room with no software in it."',
  },
  stats: [
    { value: 10, suffix: '+', label: 'Years in the field', icon: 'calendar' },
    { value: 12000, suffix: '+', label: 'Lives reached', icon: 'heart' },
    { value: 650, suffix: '+', label: 'Volunteers trained', icon: 'users' },
    { value: 45, label: 'Villages & partner NGOs', icon: 'home' },
  ],
  timeline: [
    {
      id: 's1', years: '2024 — Present', org: 'Sahaya Foundation', role: 'Founder & Director', location: 'Bengaluru',
      achievements: ['Registered the foundation and built a board of 7 trustees', 'Runs 6 programmes across 45 villages'],
      tags: ['Leadership', 'Livelihood'], image: photo('Sahaya', 'Ranjit with the Sahaya team at their first office'),
    },
    {
      id: 's2', years: '2022 — 2024', org: 'Gram Vikas Network', role: 'Programme Lead, Digital Literacy', location: 'Mandya',
      achievements: ['Trained 3,000 adults to use smartphones safely', 'Set up 12 community digital centres'],
      tags: ['Digital literacy', 'Education'], image: photo('Gram Vikas', 'Adults learning at a digital centre'),
    },
    {
      id: 's3', years: '2020 — 2022', org: 'Arogya Seva', role: 'Volunteer Coordinator', location: 'Tumakuru',
      achievements: ['Coordinated 400 volunteers during the pandemic relief drive', 'Delivered 20,000 food and medicine kits'],
      tags: ['Health', 'Relief'], image: photo('Arogya Seva', 'Volunteers loading relief kits onto a van'),
    },
    {
      id: 's4', years: '2019 — 2020', org: 'Sakhi Collective', role: 'Mentor, Women\'s Enterprise', location: 'Kolar',
      achievements: ['Mentored 14 self-help groups to start micro-businesses', 'Linked groups to 3 bank credit schemes'],
      tags: ["Women's empowerment", 'Livelihood'], image: photo('Sakhi', 'Women from a self-help group at a market stall'),
    },
    {
      id: 's5', years: '2017 — 2019', org: 'Vidya Village Schools', role: 'Weekend Teacher', location: 'Kolar',
      achievements: ['Started a weekend coding club with 25 children', 'Built a community reading room with donated books'],
      tags: ['Education'], image: photo('Vidya', 'Children reading in the community reading room'),
    },
    {
      id: 's6', years: '2016', org: 'First field visit', role: 'Volunteer', location: 'Kolar',
      achievements: ['A weekend of teaching that changed everything'],
      tags: ['Beginning'], image: photo('2016', 'A village school courtyard'),
    },
  ],
  skills: [],
  causes: [
    { id: 'education', title: 'Education', description: 'Reading rooms, coding clubs and teacher support in village schools.', icon: 'book-open', keyNumber: { value: '4,200', label: 'students' } },
    { id: 'health', title: 'Health', description: 'Health camps, nutrition workshops and pandemic relief.', icon: 'stethoscope', keyNumber: { value: '20,000', label: 'kits delivered' } },
    { id: 'women', title: "Women's empowerment", description: 'Mentoring self-help groups to start and grow businesses.', icon: 'sparkles', keyNumber: { value: '1,100', label: 'women entrepreneurs' } },
    { id: 'livelihood', title: 'Livelihood', description: 'Market links, credit access and skills for rural families.', icon: 'handshake', keyNumber: { value: '850', label: 'families' } },
    { id: 'environment', title: 'Environment', description: 'Tree planting, water tanks and clean-village drives.', icon: 'leaf', keyNumber: { value: '15,000', label: 'trees planted' } },
    { id: 'digital', title: 'Digital literacy', description: 'Safe, confident smartphone use for every generation.', icon: 'laptop', keyNumber: { value: '3,000', label: 'adults trained' } },
  ],
  projects: [
    {
      id: 'sp1', title: 'Village Reading Rooms', summary: 'Twelve community-run libraries where children read, play and learn.',
      image: img('Reading Rooms', 'Children reading on mats in a brightly painted room'), tags: ['Education'],
      problem: 'Most children in the area had never held a storybook outside a textbook.',
      approach: 'Parents chose the location, volunteers donated books, and teenagers were trained as librarians.',
      outcome: 'Reading levels in partner schools rose 35% in two years.',
      beneficiaries: { value: '2,400', label: 'children' },
      images: [img('Reading room 1', 'A girl reading aloud to younger children'), img('Reading room 2', 'Volunteer librarians sorting books')],
    },
    {
      id: 'sp2', title: 'Sakhi Enterprise Circles', summary: 'Mentoring women-led self-help groups into thriving micro-businesses.',
      image: img('Enterprise Circles', 'Women laughing while packing products at a table'), tags: ["Women's empowerment", 'Livelihood'],
      problem: 'Self-help groups had savings but no path to a sustainable business.',
      approach: 'Monthly mentoring circles, bookkeeping training and links to local markets and banks.',
      outcome: '62 businesses launched; average household income up 28%.',
      beneficiaries: { value: '1,100', label: 'women' },
      images: [img('Sakhi 1', 'A woman selling millet snacks at a weekly market'), img('Sakhi 2', 'Group members reviewing their accounts')],
    },
    {
      id: 'sp3', title: 'Arogya Relief Drive', summary: 'Food and medicine kits for families during the pandemic.',
      image: img('Relief Drive', 'Volunteers in masks handing out kits'), tags: ['Health', 'Relief'],
      problem: 'Lockdowns cut off daily-wage families from food and medicine.',
      approach: 'A volunteer network mapped every household and delivered kits door to door.',
      outcome: '20,000 kits delivered in 14 weeks with no family left out of the survey.',
      beneficiaries: { value: '8,000', label: 'families' },
      images: [img('Relief 1', 'Kits stacked in a community hall')],
    },
    {
      id: 'sp4', title: 'Digital Didi', summary: 'Teaching safe smartphone use, from payments to telemedicine.',
      image: img('Digital Didi', 'An older woman using a smartphone with a trainer beside her'), tags: ['Digital literacy'],
      problem: 'Families were losing money to phone scams and missing government benefits.',
      approach: 'Trained local women as "Digital Didis" who teach neighbours in their own language.',
      outcome: '3,000 adults trained; reported scam losses in partner villages dropped sharply.',
      beneficiaries: { value: '3,000', label: 'adults' },
      images: [img('Didi 1', 'A Digital Didi teaching a small group'), img('Didi 2', 'A certificate ceremony')],
    },
    {
      id: 'sp5', title: 'Green Tanks', summary: 'Reviving village water tanks and planting along their banks.',
      image: img('Green Tanks', 'A restored village tank with saplings planted around it'), tags: ['Environment'],
      problem: 'Silted tanks left villages without water through the dry months.',
      approach: 'Community labour days, local panchayat funding and a tree-planting pledge per household.',
      outcome: '9 tanks restored and 15,000 trees planted; groundwater levels rising.',
      beneficiaries: { value: '14', label: 'villages' },
      images: [img('Tanks 1', 'Villagers desilting a tank together')],
    },
  ],
  intersectionIntro: {
    eyebrow: 'Tech for good',
    title: 'When technology serves people',
    subtitle: 'Sometimes the right tool is a reading room. Sometimes it is an app. These are the times both worlds met.',
  },
  testimonials: [
    { id: 'st1', quote: 'Ranjit sir never told us what to do. He asked us what we wanted, and then helped us get there.', name: 'Lakshmi Devi', title: 'Self-help group leader', org: 'Sakhi Collective', relationship: 'Beneficiary', photo: photo('Lakshmi', 'Portrait of Lakshmi Devi') },
    { id: 'st2', quote: 'As a partner NGO, we have never worked with someone so transparent about money and results.', name: 'Joseph Mathew', title: 'Executive Director', org: 'Gram Vikas Network', relationship: 'Partner NGO', photo: photo('Joseph', 'Portrait of Joseph Mathew') },
    { id: 'st3', quote: 'I came to volunteer for one weekend. Three years later I run the reading room in my own village.', name: 'Priya S.', title: 'Volunteer librarian', org: 'Village Reading Rooms', relationship: 'Volunteer', photo: photo('Priya', 'Portrait of Priya') },
    { id: 'st4', quote: 'He brings the planning of an engineer and the patience of a teacher.', name: 'Dr. Kavitha Rao', title: 'Medical Officer', org: 'Arogya Seva', relationship: 'Partner', photo: photo('Kavitha', 'Portrait of Dr. Kavitha Rao') },
  ],
  insights: [
    {
      id: 'si1', type: 'story', title: "Priya's reading room", excerpt: 'How one volunteer turned a storeroom into the busiest place in her village.',
      date: '2026-08-21', readTime: '6 min read', url: 'https://example.com/priya',
      thumbnail: img('Field story', 'Priya reading to a group of children', 800, 500),
    },
    {
      id: 'si2', type: 'media', title: 'Featured: the engineer who teaches on weekends', excerpt: 'A regional newspaper profile on the Sahaya Foundation.',
      date: '2026-05-10', readTime: '4 min read', url: 'https://example.com/press',
      thumbnail: img('Media coverage', 'Newspaper clipping', 800, 500),
    },
    {
      id: 'si3', type: 'story', title: 'What ten years taught me about listening', excerpt: 'A reflection on the mistakes that shaped how I work with communities.',
      date: '2026-01-15', readTime: '9 min read', url: 'https://example.com/reflection',
      thumbnail: img('Reflection', 'A village path at sunrise', 800, 500),
    },
  ],
  insightsAllUrl: 'https://example.com/stories',
  gallery,
  offers: [
    {
      id: 'volunteer', icon: 'hand-heart', title: 'Volunteer', description: 'Teach, mentor or help run a programme for a weekend or a year.',
      bullets: ['Weekend teaching', 'Skills mentoring', 'Remote tech help'], ctaLabel: 'Sign up to volunteer', ctaHref: '#contact', enquiryType: 'volunteer',
    },
    {
      id: 'donate', icon: 'gift', title: 'Donate', description: 'Every rupee is tracked publicly on our open ledger.',
      bullets: ['₹500 buys 10 storybooks', '₹2,000 funds a health camp seat', 'Tax-deductible under 80G'], ctaLabel: 'Donate now', ctaHref: 'https://example.com/donate', external: true,
      highlight: true,
    },
    {
      id: 'partner', icon: 'handshake', title: 'Partner', description: 'NGOs, CSR teams and schools: let\'s build programmes together.',
      bullets: ['CSR partnerships', 'NGO collaborations', 'School programmes'], ctaLabel: 'Become a partner', ctaHref: '#contact', enquiryType: 'partner',
    },
  ],
  contact: {
    line: 'Whether you want to volunteer, partner or simply learn more, I would love to hear from you.',
    enquiryOptions: [
      { value: 'volunteer', label: 'Volunteering' },
      { value: 'partner', label: 'Partnership' },
      { value: 'donation', label: 'Donation question' },
      { value: 'media', label: 'Media enquiry' },
      { value: 'other-social', label: 'Something else' },
    ],
    defaultEnquiry: 'volunteer',
    submitLabel: 'Send message',
    successTitle: 'Thank you!',
    successMessage: 'Your message is on its way. I read every one and will reply soon.',
    errorMessage: "Your message didn't go through. Please try again, or write to me directly.",
    form: {
      name: 'Your name',
      email: 'Email',
      enquiryType: 'How would you like to help?',
      message: 'Message',
      honeypot: 'Leave this field empty',
      sending: 'Sending…',
      sendAnother: 'Send another message',
      retry: 'Try again',
      errors: {
        nameRequired: 'Please tell me your name.',
        emailInvalid: 'Please enter a valid email address.',
        enquiryRequired: 'Please choose an option.',
        messageMin: 'Please write at least 20 characters.',
      },
      emailLabel: 'Email',
      locationLabel: 'Based in',
      socialsLabel: 'Find me on',
      copyEmail: 'Copy email address',
    },
  },
  footer: {
    bio: 'Social worker and founder of the Sahaya Foundation, building communities that last.',
    switchPrompt: "You're viewing the social side",
    switchLabel: 'Switch to engineer',
    ngoRegistration: 'Sahaya Foundation · Reg. No. KA/2024/0000000 · 80G & 12A registered', // TODO: replace with client content
    donateLink: { label: 'Donate', href: 'https://example.com/donate', external: true },
    builtWith: 'Built with React',
  },
  labels: {
    readMore: 'Read more',
    viewAll: 'View all stories',
    filterAll: 'All',
    showMore: 'Show full journey',
    showLess: 'Show less',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    copy: 'Copy email',
    copied: 'Copied',
    backToTop: 'Back to top',
    menu: 'Menu',
    skipToContent: 'Skip to content',
    mostRequested: 'Most needed',
    problem: 'The challenge',
    approach: 'What we did',
    outcome: 'What changed',
    techStack: 'Tools used',
    beneficiaries: 'People reached',
    opensInNewTab: '(opens in new tab)',
    of: 'of',
    testimonialsCarousel: 'Voices from the field',
    skillCategories: 'Focus areas',
    filterByTag: 'Filter by theme',
    photos: 'Photos',
    tags: 'Themes',
    footerQuickLinks: 'Quick links',
    footerConnect: 'Connect',
    navPrimary: 'Primary',
    navMobile: 'Mobile',
    insightTypes: { article: 'Article', talk: 'Talk', podcast: 'Podcast', story: 'Field story', media: 'In the media' },
  },
};
