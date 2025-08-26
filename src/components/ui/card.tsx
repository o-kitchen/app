import { Card as MantineCard, Text } from '@mantine/core';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'holographic' | 'glow' | 'minimal';
  padding?: string | number;
  radius?: string | number;
  withBorder?: boolean;
  shadow?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const variantClasses = {
      default: '',
      holographic: 'holographic-card',
      glow: 'moebius-glow',
      minimal: 'bg-white/50 backdrop-blur-sm border border-moebius-200/30'
    };

    return (
      <MantineCard
        ref={ref}
        className={cn(
          'transition-all duration-300',
          variantClasses[variant],
          className
        )}
        padding="md"
        radius="md"
        withBorder
        shadow="sm"
        {...props}
      >
        {children}
      </MantineCard>
    );
  }
);

Card.displayName = 'Card';

// Legacy components for compatibility
const CardHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props}>{children}</div>
);

const CardTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <Text fw={600} size="lg" className={cn('cyber-text', className)} {...props}>
    {children}
  </Text>
);

const CardDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <Text size="sm" c="dimmed" className={className} {...props}>
    {children}
  </Text>
);

const CardContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className} {...props}>{children}</div>
);

const CardFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-4 pt-4 border-t border-gray-200/50', className)} {...props}>{children}</div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type { CardProps };
