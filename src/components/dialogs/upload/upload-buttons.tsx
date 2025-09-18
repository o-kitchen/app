"use client"

import { Box, Text, useMantineTheme, Stack } from "@mantine/core"

interface UploadButtonProps {
  label: string
  description: string
  icon: string
  color: string
  onClick: () => void
  disabled?: boolean
}

export function UploadButton({ label, description, icon, color, onClick, disabled = false }: UploadButtonProps) {
  const theme = useMantineTheme()

  return (
    <Box
      style={{
        flex: 1,
        minWidth: 0,
        maxWidth: "200px",
        height: "140px",
        background: theme.colors.dark[7],
        borderRadius: theme.radius.lg,
        border: `1px solid ${theme.colors.dark[6]}`,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: "translateY(0)",
        opacity: 1,
        position: "relative",
        overflow: "hidden",
        padding: theme.spacing.lg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.sm,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.cursor = disabled ? "not-allowed" : "pointer"
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(-2px)"
          e.currentTarget.style.background = theme.colors.dark[6]
          e.currentTarget.style.borderColor = color
          e.currentTarget.style.boxShadow = `0 8px 25px -8px ${color}40`
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.cursor = "pointer"
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.background = theme.colors.dark[7]
          e.currentTarget.style.borderColor = theme.colors.dark[6]
          e.currentTarget.style.boxShadow = "none"
        }
      }}
      onClick={disabled ? undefined : onClick}
    >
      {/* Icon */}
      <Box
        style={{
          fontSize: "2rem",
          lineHeight: 1,
          transition: "all 0.3s ease",
        }}
      >
        {icon}
      </Box>

      {/* Label */}
      <Text
        size="lg"
        fw={600}
        c="white"
        ta="center"
        style={{
          fontFamily: theme.fontFamily,
          letterSpacing: "-0.025em",
          lineHeight: 1.2,
        }}
      >
        {label}
      </Text>

      {/* Description */}
      <Text
        size="sm"
        c="gray.5"
        ta="center"
        style={{
          fontFamily: theme.fontFamily,
          lineHeight: 1.3,
        }}
      >
        {description}
      </Text>

      {/* Hover Effect Overlay */}
      {!disabled && (
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
            opacity: 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
            borderRadius: theme.radius.lg,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0"
          }}
        />
      )}

    </Box>
  )
}
