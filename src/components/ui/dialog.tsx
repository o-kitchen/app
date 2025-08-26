import { Modal, ModalProps, Text, Group, Divider } from '@mantine/core';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface DialogProps extends Omit<ModalProps, 'opened'> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  className?: string;
}

const Dialog = ({ children, open, onOpenChange }: { 
  children: React.ReactNode; 
  open?: boolean; 
  onOpenChange?: (open: boolean) => void; 
}) => <>{children}</>;

const DialogTrigger = ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => <>{children}</>;

const DialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const DialogOverlay = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const DialogClose = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const DialogContent = forwardRef<HTMLDivElement, DialogProps>(
  ({ open = false, onOpenChange, onClose, className, children, title, ...props }, ref) => {
    const handleClose = () => {
      onOpenChange?.(false);
      onClose?.();
    };

    return (
      <Modal
        opened={open}
        onClose={handleClose}
        className={cn('', className)}
        classNames={{
          overlay: 'backdrop-blur-md bg-black/40',
          content: cn(
            'bg-white/95 backdrop-blur-xl border border-moebius-200/20',
            'shadow-2xl shadow-moebius-500/20'
          ),
          header: 'border-b border-moebius-200/20 pb-4',
          title: 'cyber-text text-xl font-bold',
          close: 'hover:bg-moebius-100/50 transition-colors'
        }}
        overlayProps={{
          blur: 4,
          backgroundOpacity: 0.4
        }}
        title={title}
        {...props}
      >
        {children}
      </Modal>
    );
  }
);

DialogContent.displayName = 'DialogContent';

const DialogHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

const DialogFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <>
    <Divider my="md" />
    <Group justify="flex-end" className={className} {...props}>
      {children}
    </Group>
  </>
);

const DialogTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Text size="xl" fw={600} className={cn('cyber-text', className)} {...props}>
    {children}
  </Text>
);

const DialogDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <Text size="sm" c="dimmed" className={className} {...props}>
    {children}
  </Text>
);

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
export type { DialogProps };
