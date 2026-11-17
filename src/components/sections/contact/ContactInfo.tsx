import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { shared } from '../../../data';
import { useMode } from '../../../hooks/useMode';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { DURATION, EASE } from '../../../lib/motion';
import { Icon } from '../../ui';

export function ContactInfo() {
  const { content } = useMode();
  const S = content.contact.form;
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shared.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; the mailto link still works.
    }
  };

  return (
    <div className="space-y-8">
      <p className="max-w-prose text-lg text-text-muted">{content.contact.line}</p>

      <dl className="space-y-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-theme bg-surface-2 text-primary">
            <Icon name="mail" size={18} />
          </span>
          <div className="min-w-0">
            <dt className="eyebrow mb-1">{S.emailLabel}</dt>
            <dd className="relative flex flex-wrap items-center gap-2">
              <a href={`mailto:${shared.email}`} className="break-all font-medium text-text hover:text-primary">
                {shared.email}
              </a>
              <button
                type="button"
                onClick={copy}
                aria-label={S.copyEmail}
                className="inline-flex h-8 w-8 items-center justify-center rounded-theme text-text-muted transition-colors hover:bg-surface-2 hover:text-primary"
              >
                {copied ? <Check aria-hidden size={16} /> : <Copy aria-hidden size={16} />}
              </button>
              <span role="status" aria-live="polite" className="inline-flex">
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DURATION.fast, ease: EASE }}
                      className="rounded-theme bg-primary px-2.5 py-1 text-xs font-medium text-primary-contrast"
                    >
                      {content.labels.copied}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-theme bg-surface-2 text-primary">
            <Icon name="map-pin" size={18} />
          </span>
          <div>
            <dt className="eyebrow mb-1">{S.locationLabel}</dt>
            <dd className="font-medium text-text">{shared.location}</dd>
          </div>
        </div>
      </dl>

      <nav aria-label={S.socialsLabel}>
        <ul className="flex flex-wrap gap-3">
          {shared.socials.map((s) => (
            <li key={s.platform}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-theme border border-border bg-surface text-text-muted transition-colors hover:border-primary hover:text-primary"
              >
                <Icon name={s.platform} size={18} label={`${s.label} ${content.labels.opensInNewTab}`} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
