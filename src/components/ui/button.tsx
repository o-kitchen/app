import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';
import { forwardRef } from 'react';
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<MantineButtonProps, 'variant'> {
  variant?: 'filled' | 'light' | 'outline' | 'subtle' | 'transparent' | 'gradient' | 'neon' | 'default' | 'destructive' | 'secondary' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'compact-xs' | 'compact-sm' | 'compact-md' | 'compact-lg' | 'compact-xl';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'filled', size = 'md', className, children, asChild, ...props }, ref) => {
    // If asChild is true, just return children (for compatibility)
    if (asChild && React.isValidElement(children)) {
      return children;
    }

    // Map legacy variants to Mantine variants
    const variantMap = {
      default: 'filled',
      destructive: 'filled',
      outline: 'outline',
      secondary: 'light',
      ghost: 'subtle',
      link: 'transparent',
      neon: 'gradient',
      gradient: 'gradient'
    } as const;

    const mappedVariant = variantMap[variant as keyof typeof variantMap] || variant;
    
    // Special styling for custom variants
    const customVariants = {
      neon: {
        gradient: { from: 'moebius.6', to: 'moebius.7', deg: 135 }
      },
      gradient: {
        gradient: { from: 'moebius.4', to: 'cyber-gold.4', deg: 135 }
      },
      destructive: {
        color: 'red'
      }
    };

    if (variant === 'neon') {
      return (
        <MantineButton
          ref={ref}
          variant="gradient"
          gradient={customVariants.neon.gradient}
          size={size}
          className={cn('neon-button transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5', className)}
          {...props}
        >
          {children}
        </MantineButton>
      );
    }

    if (variant === 'gradient') {
      return (
        <MantineButton
          ref={ref}
          variant="gradient"
          gradient={customVariants.gradient.gradient}
          size={size}
          className={cn('transition-all duration-300 hover:scale-105', className)}
          {...props}
        >
          {children}
        </MantineButton>
      );
    }

    if (variant === 'destructive') {
      return (
        <MantineButton
          ref={ref}
          variant="filled"
          color="red"
          size={size}
          className={cn('transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5', className)}
          {...props}
        >
          {children}
        </MantineButton>
      );
    }

    if (variant === 'link') {
      return (
        <MantineButton
          ref={ref}
          variant="transparent"
          size={size}
          className={cn('underline-offset-4 hover:underline p-0 h-auto', className)}
          {...props}
        >
          {children}
        </MantineButton>
      );
    }

    return (
      <MantineButton
        ref={ref}
        variant={mappedVariant}
        size={size}
        className={cn(
          'transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5',
          className
        )}
        {...props}
      >
        {children}
      </MantineButton>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
