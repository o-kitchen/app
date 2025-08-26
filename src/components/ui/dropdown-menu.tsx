import { Menu } from '@mantine/core';
import React from 'react';

export const DropdownMenu = Menu;
export const DropdownMenuTrigger = Menu.Target;
export const DropdownMenuContent = Menu.Dropdown;
export const DropdownMenuItem = Menu.Item;
export const DropdownMenuLabel = Menu.Label;
export const DropdownMenuSeparator = Menu.Divider;

export interface DropdownMenuProps {
  children: React.ReactNode;
}

export interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export interface DropdownMenuItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
}