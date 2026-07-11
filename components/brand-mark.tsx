import { cn } from '@/lib/utils';

interface BrandMarkProps {
  className?: string;
  size?: number;
}

export function BrandMark({ className, size = 32 }: BrandMarkProps) {
  return (
    <svg
      className={cn('text-primary', className)}
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
    >
      <rect x="10" y="14" width="10" height="36" rx="3" fill="currentColor" />
      <rect x="27" y="24" width="10" height="26" rx="3" fill="currentColor" />
      <rect x="44" y="8" width="10" height="42" rx="3" fill="currentColor" />
      <path d="M12 12h34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 18l8-8-8-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}