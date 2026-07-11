import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'bordered';
  id?: string;
}

export function Section({ children, className, variant = 'default', id }: SectionProps) {
  const variantClasses = {
    default: '',
    muted: 'bg-muted/50',
    bordered: 'border-y border-border',
  };

  return (
    <section id={id} className={cn('py-12 sm:py-16 lg:py-20', variantClasses[variant], className)}>
      {children}
    </section>
  );
}