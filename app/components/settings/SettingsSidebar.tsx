"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Settings, Shield, Bell } from "lucide-react"

const MENU_ITEMS = [
  { key: "account", label: "Mi cuenta", icon: Settings },
  { key: "password", label: "Seguridad", icon: Shield },
  { key: "notifications", label: "Notificaciones", icon: Bell },
]

export default function SettingsSidebar({
  selected,
  setSelected,
}: {
  selected: string
  setSelected: (key: string) => void
}) {
    const renderCompactMenuItem = (item: (typeof MENU_ITEMS)[0]) => (
    <TooltipProvider key={item.key} delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={selected === item.key ? "default" : "ghost"}
            size="icon"
            className="w-10 h-10 mb-2"
            onClick={() => setSelected(item.key)}
          >
            <item.icon className="h-4 w-4" />
            <span className="sr-only">{item.label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <>
      {/*Desktop - Fixed Compact Sidebar*/}
      <aside className="hidden md:flex flex-col h-full w-16 border-r bg-gray-50 py-4">
        <ScrollArea className="flex-1">
          <div className="flex flex-col items-center px-2">{MENU_ITEMS.map(renderCompactMenuItem)}</div>
        </ScrollArea>
      </aside>

      {/*Mobile - Bottom Navigation Bar (always visible, no menu button)*/}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
        <div className="flex justify-around items-center h-16">
          {MENU_ITEMS.map((item) => (
            <Button
              key={item.key}
              variant={selected === item.key ? "default" : "ghost"}
              size="sm"
              className="flex flex-col h-14 rounded-none px-2 py-1"
              onClick={() => setSelected(item.key)}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  )
}
