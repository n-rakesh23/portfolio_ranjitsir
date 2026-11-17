import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-contrast hover:brightness-110',
  secondary: 'border border-border bg-surface text-text hover:border-primary hover:text-primary',
  ghost: 'text-text hover:bg-surface-2',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-14 px-7 text-lg',
};

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-theme font-medium no-underline',
    'transition-[transform,filter,background-color,border-color,color] duration-150 ease-theme',
    'hover:scale-[1.03] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  );
}
