"use client"

import { Button, Text } from "@mantine/core"

interface CookButtonProps {
  label: string
  color: string
  bgColor: string
  borderColor: string
  onClick: () => void
  disabled?: boolean
}

export function CookButton({ label, color, bgColor, borderColor, onClick, disabled = false }: CookButtonProps) {
  return (
    <Button
      variant="light"
      size="md"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        background: disabled ? "rgba(0, 0, 0, 0.05)" : bgColor,
        border: `1px solid ${disabled ? "rgba(0, 0, 0, 0.1)" : borderColor}`,
        backdropFilter: "blur(5px)",
        transition: "all 0.2s ease",
        flex: 1,
        minWidth: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
      styles={{
        root: {
          "&:hover": disabled ? {} : {
            background: bgColor.replace("0.1", "0.2"),
            transform: "translateY(-2px)",
          },
        },
      }}
    >
      <Text size="xs" fw={500} truncate c={color}>
        {label}
      </Text>
    </Button>
  )
}
