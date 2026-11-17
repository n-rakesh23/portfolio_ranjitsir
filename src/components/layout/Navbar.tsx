import { AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { useMode } from '../../hooks/useMode';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { cn } from '../../lib/cn';
import { Button, Container } from '../ui';
import ModeSwitch from './ModeSwitch';
import { Logo } from './navbar/Logo';
import { MobileMenu } from './navbar/MobileMenu';
import { scrollToHash } from './navbar/scroll';

const SCROLL_THRESHOLD = 40;
const MENU_ID = 'mobile-menu';

export default function Navbar() {
  const { mode, content } = useMode();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const active = useScrollSpy(content.nav.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu(true);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => {
      if (desktop.matches) closeMenu(false);
    };
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [open, closeMenu]);

  const onNavigate = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith('#')) return;
      e.preventDefault();
      setOpen(false);
      // Wait for the body scroll lock to release before scrolling.
      requestAnimationFrame(() => scrollToHash(href, reduced));
    },
    [reduced],
  );

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 h-[var(--nav-height)] border-b transition-[background-color,border-color,backdrop-filter] duration-200 ease-theme',
          solid
            ? 'border-border bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] backdrop-blur-md'
            : 'border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-full items-center justify-between gap-3">
          <Logo mode={mode} onNavigate={onNavigate} />

          <nav aria-label={content.labels.navPrimary} className="hidden lg:block">
            <ul className="m-0 flex list-none items-center gap-1 p-0">
              {content.nav.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(e) => onNavigate(e, link.href)}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'relative rounded-theme px-3 py-2 text-sm font-medium no-underline transition-colors duration-150',
                        isActive ? 'text-primary' : 'text-text-muted hover:text-text',
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary transition-transform duration-200 ease-theme',
                          isActive ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ModeSwitch />
            <Button
              href={content.navCta.href}
              external={content.navCta.external}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                if (!content.navCta.external) onNavigate(e, content.navCta.href);
              }}
              size="sm"
              className="hidden md:inline-flex"
            >
              {content.navCta.label}
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={MENU_ID}
              aria-label={open ? content.labels.close : content.labels.menu}
              className="flex h-11 w-11 items-center justify-center rounded-theme text-text transition-colors hover:bg-surface-2 lg:hidden"
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <MobileMenu
            id={MENU_ID}
            links={content.nav}
            cta={content.navCta}
            active={active}
            reduced={reduced}
            onNavigate={onNavigate}
          />
        )}
      </AnimatePresence>
    </>
  );
}
