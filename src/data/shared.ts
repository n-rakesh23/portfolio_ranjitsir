import { placeholder } from './placeholder';
import type { SharedContent } from './types';

// TODO: replace with client content
export const shared: SharedContent = {
  name: 'Ranjit Kumar Swain',
  initials: 'RK',
  email: 'hello@ranjitkumar.example',
  location: 'Bengaluru, India',
  // Must end with '/' so relative paths resolve inside the sub-folder.
  siteUrl: 'https://n-rakesh23.github.io/portfolio_ranjitsir/',
  cvUrl: `${import.meta.env.BASE_URL}ranjit-kumar-cv.pdf`,
  socials: [
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/example' },
    { platform: 'github', label: 'GitHub', url: 'https://github.com/example' },
    { platform: 'x', label: 'X', url: 'https://x.com/example' },
    { platform: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@example' },
    { platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/example' },
  ],
  photos: {
    engineer: placeholder('Portrait — formal', 'Ranjit Kumar Swain in a formal shirt, smiling at the camera', 800, 1000, 'engineer'),
    social: placeholder('Portrait — field', 'Ranjit Kumar Swain talking with villagers outside a community centre', 800, 1000, 'social'),
  },
  tagline: 'Engineer by training. Social worker by choice.',
  firstVisitTooltip: 'Switch to see my other world →',
  intersection: [
    {
      id: 'shiksha-app',
      title: 'Shiksha Offline',
      problem: 'Rural schools had tablets but no reliable internet, so lessons never reached students.',
      built: 'An offline-first learning app that syncs lesson packs over SMS and local Wi-Fi hotspots.',
      helped: '4,200 students across 38 village schools now learn with up-to-date material.',
      techBadge: 'React Native · SQLite',
      impactBadge: '4,200 students',
    },
    {
      id: 'ngo-ledger',
      title: 'Open NGO Ledger',
      problem: 'Small NGOs lost donor trust because their spending was hard to verify.',
      built: 'A free, open-source donation tracker with public dashboards and receipt uploads.',
      helped: '27 partner NGOs raised 3x more in recurring donations within a year.',
      techBadge: 'Next.js · Postgres',
      impactBadge: '27 NGOs',
    },
    {
      id: 'sakhi-skills',
      title: 'Sakhi Digital Skills',
      problem: 'Women in self-help groups wanted to sell online but had never used a smartphone.',
      built: 'A voice-guided, vernacular training programme with a simple storefront builder.',
      helped: '1,100 women now run their own online micro-businesses.',
      techBadge: 'PWA · Voice UI',
      impactBadge: '1,100 women',
    },
  ],
};
