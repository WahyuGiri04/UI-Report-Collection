"use client"

import * as React from "react"
import {
  LogOut,
  MoreHorizontal,
  Moon,
  Sun
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { format } from "date-fns"
import { useTheme } from "next-themes"
import Cookies from "js-cookie"
import { useState } from "react"

const data = [
  [
    {
      label: "Log Out",
      icon: LogOut,
      url: "/login"
    }
  ]
]

export function NavbarRight() {
  const { setTheme } = useTheme()
  const [isDark, setIsDark] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [now, setNow] = useState<Date | null>(null)
  React.useEffect(() => {
    setNow(new Date())
    setIsOpen(false)
  }, [])
  const toggleTheme = () => {
    setTheme(isDark ? "dark" : "light")
    setIsDark(!isDark)
  }

  const handleClickOutside = () => {
    Cookies.remove("token");
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="hidden font-medium text-muted-foreground md:inline-block">
        {now ? format(now, "dd MMM yyyy") : "Loading..."}
      </div>
      <Button onClick={toggleTheme} variant="ghost" className="rounded-full" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
      </Button>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton asChild  >
                            <a href={item.url} onClick={handleClickOutside}>
                              <item.icon /> <span>{item.label}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  )
}
