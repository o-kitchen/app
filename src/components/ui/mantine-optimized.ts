// Complete Mantine UI migration - optimized exports
// All components now use Mantine UI instead of Radix UI

// Core UI components with Möbius styling
export { Button } from './button';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
export { Avatar, AvatarImage, AvatarFallback } from './avatar';
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
  DialogClose
} from './dialog';

// Direct Mantine exports - optimized for tree shaking - specific imports only
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
  AspectRatio,
  Text,
  Title,
  Highlight,
  Code,
  Mark,
  Blockquote,
  TextInput,
  Textarea,
  NumberInput,
  PasswordInput,
  Select,
  MultiSelect,
  Checkbox,
  Switch,
  Radio,
  RadioGroup,
  Slider,
  RangeSlider,
  ColorInput,
  FileInput,
  PinInput,
  Rating,
  Tabs,
  TabsList as MantineTabsList,
  TabsTab as MantineTabsTab,
  TabsPanel as MantineTabsPanel,
  Stepper,
  Breadcrumbs,
  Pagination,
  NavLink,
  Alert,
  Notification,
  Loader,
  Progress,
  RingProgress,
  Skeleton,
  Modal,
  Drawer,
  Popover,
  HoverCard,
  Tooltip,
  Menu,
  Badge,
  Table,
  List,
  Timeline,
  ThemeIcon,
  Image,
  BackgroundImage,
  Divider,
  ScrollArea,
  Affix,
  Transition,
  Collapse,
  Accordion,
  Burger,
  ActionIcon,
  SegmentedControl,
  AppShell,
  VisuallyHidden,
  FocusTrap,
  Portal,
  Overlay
} from '@mantine/core';

// DateInput and TimeInput are from @mantine/dates
export {
  DateInput,
  TimeInput
} from '@mantine/dates';

// Spotlight is from @mantine/spotlight
export {
  Spotlight
} from '@mantine/spotlight';

// Carousel is from @mantine/carousel
export {
  Carousel
} from '@mantine/carousel';

// Mantine hooks - optimized exports - specific imports only
export {
  useToggle,
  useDisclosure,
  useLocalStorage,
  useSessionStorage,
  usePrevious,
  useSetState,
  useListState,
  useCounter,
  useClickOutside,
  useFocusWithin,
  useHover,
  useFocusTrap,
  useHotkeys,
  useWindowEvent,
  useDocumentTitle,
  usePageLeave,
  useViewportSize,
  useWindowScroll,
  useResizeObserver,
  useElementSize,
  useMediaQuery,
  useInterval,
  useTimeout,
  useIdle,
  useOs,
  useColorScheme,
  useId,
  useUncontrolled,
  useInputState,
  useValidatedState
} from '@mantine/hooks';

// Form utilities - specific imports only
export {
  useForm,
  hasLength,
  isEmail,
  isNotEmpty,
  matches,
  matchesField,
  isInRange
} from '@mantine/form';

// Notifications - specific imports only
export {
  notifications,
  showNotification,
  hideNotification,
  cleanNotifications,
  updateNotification,
  cleanNotificationsQueue
} from '@mantine/notifications';

// Modals - specific imports only
export {
  modals,
  openModal,
  closeModal,
  openConfirmModal,
  openContextModal,
  closeAllModals,
  ModalsProvider
} from '@mantine/modals';

// Types - using export type for isolatedModules compatibility - specific imports only
export type {
  ButtonProps,
  CardProps,
  AvatarProps,
  DialogProps,
  MantineTheme,
  MantineColor,
  MantineSize,
  DefaultMantineColor,
  //ContextModalProps
} from '@mantine/core';