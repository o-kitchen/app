'use client';

import React from 'react';
import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

// Möbius sci-fi color palette inspired by cyberpunk and futuristic themes
const moebius: MantineColorsTuple = [
  '#f0f3ff', // lightest
  '#e0e7ff',
  '#c7d2fe', 
  '#a5b4fc',
  '#818cf8', // main brand color
  '#6366f1',
  '#4f46e5',
  '#4338ca', // darker shades
  '#3730a3',
  '#312e81'  // darkest
];

const cyberGold: MantineColorsTuple = [
  '#fef3c7',
  '#fde68a',
  '#fcd34d',
  '#fbbf24',
  '#f59e0b', // main accent
  '#d97706',
  '#b45309',
  '#92400e',
  '#78350f',
  '#451a03'
];

const neonGreen: MantineColorsTuple = [
  '#dcfce7',
  '#bbf7d0', 
  '#86efac',
  '#4ade80',
  '#22c55e', // main success
  '#16a34a',
  '#15803d',
  '#166534',
  '#14532d',
  '#052e16'
];

const theme = createTheme({
  primaryColor: 'moebius',
  colors: {
    moebius,
    'cyber-gold': cyberGold,
    'neon-green': neonGreen,
  },
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", sans-serif',
  headings: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", sans-serif',
    fontWeight: '600',
  },
  focusRing: 'auto',
  radius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0 3px 6px rgba(99, 102, 241, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
    lg: '0 10px 20px rgba(99, 102, 241, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    xl: '0 14px 28px rgba(99, 102, 241, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
  },
  components: {
    Paper: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
      },
      styles: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(99, 102, 241, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px) scale(1.01)',
            boxShadow: '0 20px 40px rgba(99, 102, 241, 0.15), 0 15px 15px rgba(0, 0, 0, 0.1)',
            borderColor: 'rgba(99, 102, 241, 0.2)',
          },
        },
      },
    },
    Button: {
      styles: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontWeight: '500',
          borderRadius: '8px',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&[data-variant="filled"]': {
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
              boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
            },
          },
        },
      },
    },
    Card: {
      styles: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(99, 102, 241, 0.1)',
          '&:hover': {
            transform: 'translateY(-4px) scale(1.02)',
            background: 'rgba(255, 255, 255, 0.95)',
            borderColor: 'rgba(99, 102, 241, 0.2)',
            boxShadow: '0 25px 50px rgba(99, 102, 241, 0.15), 0 20px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    Modal: {
      styles: {
        content: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(99, 102, 241, 0.15)',
        },
        overlay: {
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
        },
      },
    },
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
  },

});

interface MantineThemeProviderProps {
  children: React.ReactNode;
}

export function MantineThemeProvider({ children }: MantineThemeProviderProps) {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Notifications position="top-right" zIndex={1000} />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
