"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { SafeDynamicIcon } from "../util/safe-dynamic-icon"
import { Menu } from "@/lib/model/Menu"
import { useEffect, useState } from "react"
import { SkeletonMenu } from "../util/skeleton-util"

export function NavMenu({ items } : { items : Menu[] }) {

  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    if(items !== null){
      setIsLoad(false)
    }
  }, [items])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
      {isLoad ? ((<SkeletonMenu count={4} />)) : (
        <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.menuName}
            asChild
            // defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.menuName}>
                  <SafeDynamicIcon name={item.icon} />
                  {/* {item.icon && <item.icon />} */}
                  <span>{item.menuName}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.subMenu?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.subMenuName}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <SafeDynamicIcon name={subItem.icon} />
                          <span>{subItem.subMenuName}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
      )}
    </SidebarGroup>
  )
}
