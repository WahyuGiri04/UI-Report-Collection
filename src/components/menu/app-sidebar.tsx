"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  HelpCircleIcon,
  SearchIcon,
  Settings2,
  SettingsIcon,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/menu/nav-main"
import { NavSecondary } from "@/components/menu/nav-secondary"
import { NavUser } from "@/components/menu/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMenu } from "./nav-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/images/vs-code.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/dashboard-default",
      icon: "layout-dashboard",
    },
    {
      title: "Analytics",
      url: "/dashboard/dashboard-analytic",
      icon: "chart-bar-big",
    },
    {
      title: "Projects",
      url: "/dashboard/dashboard-project",
      icon: "folder-archive",
    },
    {
      title: "Team",
      url: "/dashboard/dashboard-team",
      icon: "circle-user-round",
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  navMenu: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                  {/* <Avatar className="h-8 w-8 rounded-lg bg-white">
                    <AvatarImage src="/jalin-png.png" alt="Jalin Pembayaran" />
                  </Avatar> */}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Cashback Dashboard</span>
                  <span className="truncate text-xs">Jalin</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMenu items={data.navMenu} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
