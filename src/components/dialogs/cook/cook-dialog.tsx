"use client"

import { Modal, Group, Stack, useMantineTheme, Text, Box, ActionIcon } from "@mantine/core"
import { useState } from "react"
import { X, Plus } from "lucide-react"
import { CookButton } from "./cook-buttons"
import { ArtDialog } from "../art/art-dialog"

interface CookDialogProps {
  opened: boolean
  onClose: () => void
  onButtonClick: (action: string) => void
  selectedAction: string | null
}

export function CookDialog({ opened, onClose, onButtonClick, selectedAction }: CookDialogProps) {
  const theme = useMantineTheme()
  const [artDialogOpened, setArtDialogOpened] = useState(false)

  const cookOptions = [
    {
      label: "Moment",
      description: "Capture memories",
      icon: "🩵",
      color: "#8b5cf6", // Purple
      disabled: true,
    },
    {
      label: "Art", 
      description: "Create & share",
      icon: "🎨",
      color: "#06b6d4", // Cyan
      disabled: false,
    },
    {
      label: "Event",
      description: "Virtual & IRL",
      icon: "🎫",
      color: "#8b5cf6", // Purple
      disabled: true,
    },
  ]

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        size="md"
        withCloseButton={false}
        title=""
        overlayProps={{
          backgroundOpacity: 0.4,
          blur: 4,
        }}
        styles={{
          content: {
            background: theme.colors.dark[8],
            borderRadius: theme.radius.xl,
            border: `1px solid ${theme.colors.dark[6]}`,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            padding: 0,
          },
        }}
      >
        <Box
          style={{
            padding: theme.spacing.xl,
            background: theme.colors.dark[7],
            borderRadius: `${theme.radius.xl}px ${theme.radius.xl}px 0 0`,
            position: "relative",
          }}
        >
          {/* Header Actions */}
          <Group justify="space-between" mb="xl">
            <ActionIcon
              size="lg"
              variant="filled"
              color="dark.6"
              radius="xl"
              style={{
                background: theme.colors.dark[6],
                border: `1px solid ${theme.colors.dark[5]}`,
              }}
            >
              <Plus size={16} color={theme.colors.gray[3]} />
            </ActionIcon>
            
            <ActionIcon
              size="lg"
              variant="filled"
              color="dark.6"
              radius="xl"
              onClick={onClose}
              style={{
                background: theme.colors.dark[6],
                border: `1px solid ${theme.colors.dark[5]}`,
              }}
            >
              <X size={16} color={theme.colors.gray[3]} />
            </ActionIcon>
          </Group>

          {/* Title Section */}
          <Stack gap="sm" align="center" mb="lg">
            <Text
              size="2rem"
              fw={700}
              c="white"
              style={{
                fontFamily: theme.fontFamily,
                letterSpacing: "-0.025em",
              }}
            >
              Create
            </Text>
            <Text
              size="lg"
              c="gray.4"
              style={{
                fontFamily: theme.fontFamily,
                fontWeight: 400,
              }}
            >
              What are we creating today?
            </Text>
          </Stack>
        </Box>

        {/* Content Area */}
        <Box
          style={{
            padding: theme.spacing.xl,
            background: theme.colors.dark[8],
            borderRadius: `0 0 ${theme.radius.xl}px ${theme.radius.xl}px`,
          }}
        >
          <Group justify="center" gap="md" wrap="nowrap">
            {cookOptions.map((option, index) => (
              <CookButton
                key={option.label}
                label={option.label}
                description={option.description}
                icon={option.icon}
                color={option.color}
                onClick={() => {
                  if (option.label === "Art") {
                    setArtDialogOpened(true)
                  } else {
                    onButtonClick(option.label)
                  }
                }}
                disabled={option.disabled}
              />
            ))}
          </Group>
        </Box>
      </Modal>
      
      {/* Art Dialog */}
      <ArtDialog 
        opened={artDialogOpened} 
        onClose={() => setArtDialogOpened(false)} 
        onComplete={() => {
          setArtDialogOpened(false)  
          onClose()                  
        }}
      />
    </>
  )
}
