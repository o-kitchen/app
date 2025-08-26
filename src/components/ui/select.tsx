import { Select as MantineSelect, SelectProps as MantineSelectProps } from '@mantine/core';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends MantineSelectProps {
  className?: string;
}

const Select = forwardRef<HTMLInputElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <MantineSelect
        ref={ref}
        className={cn('transition-all duration-300', className)}
        classNames={{
          input: 'border-moebius-200/30 bg-white/80 backdrop-blur-sm focus:border-moebius-400 transition-all duration-300 hover:scale-[1.01]',
          dropdown: 'bg-white/95 backdrop-blur-xl border-moebius-200/20 shadow-xl transition-all duration-300',
          option: 'hover:bg-moebius-50/50 transition-colors duration-200'
        }}
        {...props}
      />
    );
  }
);

Select.displayName = 'Select';

// Legacy compatibility exports
const SelectGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectValue = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectLabel = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectItem = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectSeparator = () => null;
const SelectScrollUpButton = () => null;
const SelectScrollDownButton = () => null;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
export type { SelectProps };
