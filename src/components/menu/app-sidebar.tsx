"use client";

import * as React from "react";
import { Command } from "lucide-react";

import { NavMain } from "@/components/menu/nav-main";
import { NavSecondary } from "@/components/menu/nav-secondary";
import { NavUser } from "@/components/menu/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMenu } from "./nav-menu";
import { useState, useEffect } from "react";
import { Menu } from "@/lib/model/entity/Menu";
import { GetMenu } from "@/lib/service/menu-service";
import { Users } from "@/lib/model/entity/Users";
import { GetUsersDetail } from "@/lib/service/users-service";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/images/vs-code.png",
  },
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: "settings",
    },
    {
      title: "Get Help",
      url: "#",
      icon: "info",
    },
    {
      title: "Search",
      url: "#",
      icon: "search",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [menuDashboard, setMenuDashboard] = useState<Menu[] | null>(null);
  const [mainMenu, setMainMenu] = useState<Menu[] | null>(null);
  const [users, setUsers] = useState<Users | null>(null);

  useEffect(() => {
    async function getMenu() {
      const res = await GetMenu();
      if (res.data !== undefined) {
        const menuDashboard = res.data.filter(
          (item: Menu) => item.menuType === 1
        );
        const mainMenu = res.data.filter((item: Menu) => item.menuType === 2);
        setMenuDashboard(menuDashboard);
        setMainMenu(mainMenu);
      } else {
        setMainMenu(null);
        setMenuDashboard(null);
      }
      const response = await GetUsersDetail();
      if (response.data !== undefined) {
        setUsers(response.data);
      } else {
        setUsers(null);
      }
    }
    getMenu();
  }, []);

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
                  <span className="truncate font-semibold">
                    Cashback Dashboard
                  </span>
                  <span className="truncate text-xs">Jalin</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuDashboard ?? []} />
        <NavMenu items={mainMenu ?? []} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={users} />
      </SidebarFooter>
    </Sidebar>
  );
}
