"use client"

import { Modal, Group, Text, Stack } from "@mantine/core"
import { CookButton } from "./cook-buttons"

interface CookDialogProps {
  opened: boolean
  onClose: () => void
  onButtonClick: (action: string) => void
  selectedAction: string | null
}

export function CookDialog({ opened, onClose, onButtonClick, selectedAction }: CookDialogProps) {
  const cookOptions = [
    {
      label: "Cook Moment",
      color: "#ff6b6b",
      bgColor: "rgba(255, 107, 107, 0.1)",
      borderColor: "rgba(255, 107, 107, 0.3)",
    },
    {
      label: "Cook Work",
      color: "#ff6b6b",
      bgColor: "rgba(255, 107, 107, 0.1)",
      borderColor: "rgba(255, 107, 107, 0.3)",
    },
    {
      label: "Cook Event",
      color: "#ff6b6b",
      bgColor: "rgba(255, 107, 107, 0.1)",
      borderColor: "rgba(255, 107, 107, 0.3)",
    },
  ]

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      overlayProps={{
        backgroundOpacity: 0.25,
        blur: 3,
      }}
      styles={{
        content: {
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
      }}
    >
      <Stack gap="lg" pt="md">

        <Group justify="center" gap="sm" wrap="nowrap">
          {cookOptions.map((option) => (
            <CookButton
              key={option.label}
              label={option.label}
              color={option.color}
              bgColor={option.bgColor}
              borderColor={option.borderColor}
              onClick={() => onButtonClick(option.label)}
              disabled={option.label === "Cook Moment" || option.label === "Cook Event"}
            />
          ))}
        </Group>

      </Stack>
    </Modal>
  )
}
