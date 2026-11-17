import { ArrowUp, Repeat } from 'lucide-react';
import { shared } from '../../data';
import { useMode } from '../../hooks/useMode';
import { useModeTransition } from '../../hooks/useModeTransition';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Button, Container, Icon } from '../ui';
import { FooterMonogram } from './footer/FooterMonogram';

export default function Footer() {
  const { mode, content } = useMode();
  const { start } = useModeTransition();
  const reduced = useReducedMotion();
  const { footer, nav, labels } = content;
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

  const switchSides = () => {
    // Jump to the top while the transition covers the screen, so the new mode opens on its hero.
    start(mode === 'engineer' ? 'social' : 'engineer', { onSwap: () => window.scrollTo({ top: 0, behavior: 'auto' }) });
  };

  return (
    <footer className="border-t border-border bg-surface text-text">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <a href="#hero" className="inline-flex items-center gap-3 rounded-theme">
              <FooterMonogram initials={shared.initials} mode={mode} />
              <span className="font-display text-lg font-semibold">{shared.name}</span>
            </a>
            <p className="mt-4 text-text-muted">{footer.bio}</p>
            {footer.donateLink && (
              <Button
                href={footer.donateLink.href}
                external={footer.donateLink.external}
                size="sm"
                className="mt-6"
                iconLeft={<Icon name="hand-heart" size={16} />}
              >
                {footer.donateLink.label}
              </Button>
            )}
          </div>

          <nav aria-labelledby="footer-links-heading">
            <h2 id="footer-links-heading" className="eyebrow mb-4 !text-sm">
              {labels.footerQuickLinks}
            </h2>
            <ul className="space-y-2.5">
              {nav.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="text-text-muted transition-colors hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 id="footer-socials-heading" className="eyebrow mb-4 !text-sm">
              {labels.footerConnect}
            </h2>
            <ul className="flex flex-wrap gap-3" aria-labelledby="footer-socials-heading">
              {shared.socials.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-theme border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon name={s.platform} size={18} label={`${s.label} ${labels.opensInNewTab}`} />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${shared.email}`}
              className="mt-5 inline-flex items-center gap-2 text-text-muted transition-colors hover:text-primary"
            >
              <Icon name="mail" size={16} />
              {shared.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-3 rounded-theme border border-border bg-surface-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-text-muted">{footer.switchPrompt}</p>
          <button
            type="button"
            onClick={switchSides}
            className="inline-flex items-center gap-2 rounded-theme font-medium text-primary-strong underline-offset-4 hover:underline"
          >
            <Repeat size={16} aria-hidden="true" />
            {footer.switchLabel}
          </button>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-4 py-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>
              © {year} {shared.name} · {footer.builtWith}
            </p>
            {footer.ngoRegistration && <p>{footer.ngoRegistration}</p>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            iconRight={<ArrowUp size={16} aria-hidden="true" />}
            className="self-start md:self-auto"
          >
            {labels.backToTop}
          </Button>
        </Container>
      </div>
    </footer>
  );
}
