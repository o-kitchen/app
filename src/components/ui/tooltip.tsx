import { Tooltip as MantineTooltip, TooltipProps } from '@mantine/core';
import React from 'react';

export const Tooltip = MantineTooltip;
export const TooltipTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const TooltipContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export type { TooltipProps };