import { Helmet } from 'react-helmet-async';
import { shared } from '../../data/shared';
import { getContent } from '../../data';
import type { Mode } from '../../data/types';

// Browser chrome colour; mirrors --bg in index.css (meta tags can't read CSS variables).
const THEME_COLOR: Record<Mode, string> = { engineer: '#0B1020', social: '#FBF7F0' };

const absolute = (path: string) => new URL(path, shared.siteUrl).toString();

function pageUrl(mode: Mode) {
  return absolute(mode === 'social' ? '/?mode=social' : '/');
}

export default function Seo({ mode }: { mode: Mode }) {
  const { seo } = getContent(mode);
  const url = pageUrl(mode);
  const image = absolute(seo.ogImage);

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: shared.name,
    url: absolute('/'),
    image: absolute(getContent('engineer').seo.ogImage),
    email: `mailto:${shared.email}`,
    jobTitle: [getContent('engineer').seo.title, getContent('social').seo.title].map((t) =>
      t.replace(`${shared.name} — `, ''),
    ),
    address: { '@type': 'PostalAddress', addressLocality: shared.location },
    sameAs: shared.socials.map((s) => s.url),
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={url} />
      <meta name="theme-color" content={THEME_COLOR[mode]} />

      <meta property="og:type" content="profile" />
      <meta property="og:site_name" content={shared.name} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seo.title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(person)}</script>
    </Helmet>
  );
}
