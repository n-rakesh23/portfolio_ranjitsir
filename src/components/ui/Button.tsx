import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { useMode } from '../../hooks/useMode';
import { buttonClasses, type ButtonSize, type ButtonVariant } from './button-classes';

export type { ButtonSize, ButtonVariant };

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
}

type AsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
/** Renders an <a>. `external` adds target="_blank" rel="noopener noreferrer". */
type AsLink = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean };

export type ButtonProps = AsButton | AsLink;

export function Button({ variant, size, iconLeft, iconRight, className, children, ...rest }: ButtonProps) {
  const { content } = useMode();
  const classes = buttonClasses(variant, size, className);
  const inner = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if (rest.href !== undefined) {
    const { external, ...anchor } = rest as Omit<AsLink, keyof BaseProps>;
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a className={classes} {...ext} {...anchor}>
        {inner}
        {external && <span className="sr-only"> {content.labels.opensInNewTab}</span>}
      </a>
    );
  }

  const { type, ...button } = rest as Omit<AsButton, keyof BaseProps>;
  return (
    <button type={type ?? 'button'} className={classes} {...button}>
      {inner}
    </button>
  );
}
