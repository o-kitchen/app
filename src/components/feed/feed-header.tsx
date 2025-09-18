"use client"

import { Group, ActionIcon, Tabs, Box } from "@mantine/core"
import { Search, Filter } from "lucide-react"
import { useState } from "react"
import { useDisabled } from "@/utils/disabled"
import { FilterDialog } from "@/components/dialogs/filter-dialog"
import { SearchDialog } from "@/components/dialogs/search/search-dialog"
//import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl";


export function FeedHeader() {
  //const [opened, { toggle }] = useDisclosure(false)
  const [activeTab, setActiveTab] = useState("latest")
  const [searchOpened, setSearchOpened] = useState(false)
  const feedHeaderT = useTranslations("feedHeader");
  const mainTabs = [
    { value: "follow", label: feedHeaderT("follow"), disabled: true },
    { value: "latest", label: feedHeaderT("latest"), disabled: false },
    { value: "explore", label: feedHeaderT("explore"),disabled: true },
  ]

  //const router = useRouter()

  return (
    <Box>
      {/* Main Header */}
      <Box
        h={"auto"}
        px={{ base: "sm", sm: "md" }}
        style={{
          //borderBottom: "1px solid #f0f0f0",
          backgroundColor: "transparent",
          //position: "sticky",
          //top: 0,
          //zIndex: 100,
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Group justify="space-between" h="auto" align="center" wrap="nowrap">
          {/* Left: Search Icon */}
          <ActionIcon 
            variant="transparent" 
            size="lg"
            className="text-gray-600 hover:text-orange-600 cursor-pointer dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
            onClick={() => setSearchOpened(true)}
          >
            <Search size={20} />
          </ActionIcon>

          {/* Center: Main Navigation Tabs */}
          <Tabs value={activeTab} onChange={(value) => setActiveTab(value || "latest")} variant="unstyled">
            <Tabs.List style={{ overflow: "hidden", flexShrink: 1, flexWrap: "nowrap" }}>
              {mainTabs.map((tab) => (
                <Tabs.Tab
                  key={tab.value}
                  value={tab.value}
                  {...useDisabled(
                    {
                      isDisabled: tab.disabled,
                      baseStyles: {
                        fontSize: "16px",
                        fontWeight: 500,
                        padding: "5px 5px",
                        borderBottom: activeTab === tab.value ? "2px solid #ff6b35 " : "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        margin: "0 7px",
                        whiteSpace: "nowrap",
                        minWidth: "auto",
                        flexShrink: 1,
                      }
                    }
                  )}
                  className={
                    `${activeTab === tab.value
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-gray-800 dark:text-gray-200'} transition-colors`
                  }
                >
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
          {/* Right: Filter Icon */}
          <FilterDialog
            trigger={
              <ActionIcon 
                variant="transparent" 
                size="lg"
                className="text-gray-600 hover:text-orange-600 cursor-pointer dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
              >
                <Filter size={20} />
              </ActionIcon>
            }
            onFiltersChange={(filters) => {
            }}
          />
          
        </Group>
      </Box>

      {/* Search Dialog */}
      <SearchDialog 
        opened={searchOpened} 
        onClose={() => setSearchOpened(false)} 
      />
    </Box>
  )
}
