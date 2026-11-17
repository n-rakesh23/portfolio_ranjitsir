import { motion } from 'framer-motion';
import { useEffect, useRef, type MouseEvent } from 'react';
import type { Cta, NavLink } from '../../../data/types';
import { useMode } from '../../../hooks/useMode';
import { cn } from '../../../lib/cn';
import { DURATION, EASE, STAGGER } from '../../../lib/motion';
import { Button } from '../../ui';

interface MobileMenuProps {
  id: string;
  links: NavLink[];
  cta: Cta;
  active: string | null;
  reduced: boolean;
  onNavigate: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function MobileMenu({ id, links, cta, active, reduced, onNavigate }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const { content } = useMode();

  useEffect(() => {
    firstLinkRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: reduced ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -8 }}
      transition={{ duration: reduced ? DURATION.fast : 0.25, ease: EASE }}
      className="fixed inset-x-0 bottom-0 top-[var(--nav-height)] z-30 overflow-y-auto border-t border-border bg-bg lg:hidden"
    >
      <nav aria-label={content.labels.navMobile} className="mx-auto flex w-full max-w-container flex-col gap-2 px-5 py-8 md:px-8">
        {links.map((link, i) => (
          <motion.a
            key={link.id}
            ref={i === 0 ? firstLinkRef : undefined}
            href={link.href}
            onClick={(e) => onNavigate(e, link.href)}
            aria-current={active === link.id ? 'location' : undefined}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? DURATION.fast : 0.3, ease: EASE, delay: reduced ? 0 : i * STAGGER }}
            className={cn(
              'rounded-theme px-3 py-3 font-display text-3xl no-underline transition-colors hover:bg-surface-2',
              active === link.id ? 'text-primary' : 'text-text',
            )}
          >
            {link.label}
          </motion.a>
        ))}
        <Button
          href={cta.href}
          external={cta.external}
          onClick={(e: MouseEvent<HTMLAnchorElement>) => {
            if (!cta.external) onNavigate(e, cta.href);
          }}
          size="lg"
          className="mt-6 self-start"
        >
          {cta.label}
        </Button>
      </nav>
    </motion.div>
  );
}
