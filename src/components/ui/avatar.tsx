import { Avatar as MantineAvatar, AvatarProps as MantineAvatarProps } from '@mantine/core';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends MantineAvatarProps {
  className?: string;
  src?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, children, src, ...props }, ref) => {
    return (
      <MantineAvatar
        ref={ref}
        src={src}
        className={cn('transition-all duration-300 hover:scale-105', className)}
        {...props}
      >
        {children}
      </MantineAvatar>
    );
  }
);

Avatar.displayName = 'Avatar';

// Legacy components for compatibility
const AvatarImage = ({ src, className, ...props }: { src?: string; className?: string; [key: string]: any }) => null; 
const AvatarFallback = ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => <>{children}</>;

export { Avatar, AvatarImage, AvatarFallback };
export type { AvatarProps };
