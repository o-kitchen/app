## Task Overview: Eliminate Mantine UI Full Imports

Goal: Replace full Mantine package imports with specific node module imports to optimize bundle size and improve tree-shaking effectiveness.

KPIs:
- Bundle size reduction > 30%  
- Import statements converted from full packages to specific modules
- All components maintain functionality  
- Zero build warnings or errors

Rollback: `git restore src/components/providers/mantine-theme-provider.tsx src/components/ui/*.tsx`

Updated: 2025-08-26T00:00:00.000Z