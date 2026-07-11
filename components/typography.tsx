import * as React from 'react';
import { cn } from '@/lib/utils';
import type { HTMLAttributes, RefAttributes } from 'react';

type AsProp = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'lead';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: AsProp;
  className?: string;
}

const variantStyles: Record<AsProp, string> = {
  h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight',
  h2: 'text-3xl sm:text-4xl font-bold tracking-tight',
  h3: 'text-2xl sm:text-3xl font-semibold tracking-tight',
  h4: 'text-xl sm:text-2xl font-semibold',
  lead: 'text-lg sm:text-xl text-muted-foreground',
  p: 'text-base leading-7',
  span: 'inline',
  div: 'block',
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as = 'p', className, children, ...props }, ref) => {
    const baseStyles = 'font-sans-tamil';
    const Component = as as React.ElementType;
    return (
      <Component
        ref={ref}
        className={cn(baseStyles, variantStyles[as], className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
);

Typography.displayName = 'Typography';

export { Typography };