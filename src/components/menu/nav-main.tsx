"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SafeDynamicIcon } from "../util/safe-dynamic-icon";
import { Menu } from "@/lib/model/entity/Menu";
import { useEffect, useState } from "react";
import { SkeletonMenu } from "../util/skeleton-util";

export function NavMain({ items }: { items: Menu[] }) {
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    if (items !== null) {
      setIsLoad(false);
    }
  }, [items]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        {isLoad ? (
          <SkeletonMenu count={4} />
        ) : (
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.menuName}>
                <SidebarMenuButton asChild tooltip={item.menuName}>
                  <a href={item.url}>
                    {/* {item.icon && <item.icon />} */}
                    <SafeDynamicIcon name={item.icon} />
                    <span>{item.menuName}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
