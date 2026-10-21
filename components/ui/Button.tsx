import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'onCobalt' | 'onAccent';
export type ButtonSize = 'md' | 'lg';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-tile text-ink hover:bg-[#dfe4f7]',
  quiet: 'bg-transparent text-ink hover:bg-tile',
  onCobalt: 'bg-white text-primary hover:bg-[#e6e9ff]',
  onAccent: 'bg-ink text-white hover:bg-[#1b2440]',
};

const SIZES: Record<ButtonSize, string> = {
  md: 'min-h-12 px-6 text-[16px]',
  lg: 'min-h-[52px] px-7 text-[16px]',
};

/**
 * One button shape for the whole site: 12px corners, no outline, colour carried by the surface.
 * Links that look like buttons use `buttonClass` so both stay identical.
 */
export function buttonClass({
  variant = 'primary',
  size = 'md',
  full = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  className?: string;
} = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200',
    'disabled:cursor-not-allowed disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    full && 'w-full',
    className,
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  className,
  type = 'button',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
}) {
  return <button type={type} className={buttonClass({ variant, size, full, className })} {...rest} />;
}
