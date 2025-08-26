// Legacy compatibility exports - all now based on Mantine UI
// This file provides backward compatibility while using Mantine under the hood

export { Button, type ButtonProps } from './button';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, type CardProps } from './card';
export { Avatar, AvatarImage, AvatarFallback, type AvatarProps } from './avatar';
export { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  type DialogProps
} from './dialog';

// Re-export Mantine components directly for new usage - specific imports only
export {
  Container,
  Group,
  Stack,
  Grid,
  SimpleGrid,
  Flex,
  Box,
  Paper,
  Center,
  Text,
  Title,
  TextInput,
  Textarea,
  NumberInput,
  Select,
  Checkbox,
  Switch,
  Tabs,
  Modal,
  Loader,
  Progress,
  Alert,
  Divider,
  Badge,
  Tooltip,
  Menu,
  ActionIcon,
  ScrollArea,
  Skeleton,
  Image,
  Transition
} from '@mantine/core';

// Essential hooks - specific imports only
export {
  useToggle,
  useDisclosure,
  useClickOutside,
  useViewportSize,
  useMediaQuery
} from '@mantine/hooks';

// Form utilities - specific imports only
export {
  useForm,
  hasLength,
  isEmail,
  isNotEmpty
} from '@mantine/form';

// Notifications - specific imports only
export {
  notifications,
  showNotification
} from '@mantine/notifications';

// Legacy type exports for compatibility - specific imports only
export type {
  MantineTheme,
  MantineSize,
  MantineColor
} from '@mantine/core';