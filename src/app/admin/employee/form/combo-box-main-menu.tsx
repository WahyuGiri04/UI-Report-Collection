"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SafeDynamicIcon } from "@/components/util/safe-dynamic-icon";
import { GetMenuList } from "@/lib/service/menu-service";
import { useEffect, useRef, useState } from "react";
import { Menu } from "@/lib/model/Menu";

type ComboboxMainMenuProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ComboboxMainMenu({ value, onChange }: ComboboxMainMenuProps) {
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [displayedMenus, setDisplayedMenus] = useState<Menu[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedItem = menuList.find((item) => String(item.id) === value);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const batchSize = 5;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (menuList.length > 0) {
      if (searchTerm) {
        const filtered = menuList.filter((menu) =>
          menu.menuName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setDisplayedMenus(filtered.slice(0, batchSize));
      } else {
        setDisplayedMenus(menuList.slice(0, batchSize));
      }
    }
  }, [menuList, searchTerm]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await GetMenuList();
      if (response.data !== undefined) {
        setMenuList(response.data);
        setDisplayedMenus(response.data.slice(0, batchSize));
      }
    } catch (error) {
      console.error("Failed to fetch menu list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMenus = () => {
    if (displayedMenus.length >= getFilteredMenus().length) return;

    setLoadingMore(true);
    setTimeout(() => {
      const nextBatch = getFilteredMenus().slice(
        0,
        displayedMenus.length + batchSize
      );
      setDisplayedMenus(nextBatch);
      setLoadingMore(false);
    }, 300); // Small timeout to provide visual feedback
  };

  const getFilteredMenus = () => {
    if (!searchTerm) return menuList;
    return menuList.filter((menu) =>
      menu.menuName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="sm:w-full w-full justify-between col-span-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="text-gray-400">Loading menus...</span>
              <div className="animate-spin ml-2 h-4 w-4 border-2 border-gray-300 border-t-primary rounded-full"></div>
            </>
          ) : (
            <>
              {selectedItem ? selectedItem.menuName : "Select Main menu..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        style={{ width: buttonRef.current?.offsetWidth }}
        id="menu-type"
      >
        <Command className="w-full">
          <CommandInput
            placeholder="Search menu..."
            className="h-9"
            onValueChange={setSearchTerm}
          />
          <CommandList className="max-h-60 overflow-auto">
            {isLoading ? (
              <div className="py-6 text-center">
                <div className="animate-spin mx-auto h-6 w-6 border-2 border-gray-300 border-t-primary rounded-full"></div>
                <p className="mt-2 text-sm text-gray-500">Loading menus...</p>
              </div>
            ) : (
              <>
                <CommandEmpty>No menu found</CommandEmpty>
                <CommandGroup>
                  {displayedMenus.map((menu) => (
                    <CommandItem
                      key={menu.id}
                      value={menu.menuName}
                      onSelect={() => {
                        onChange(String(menu.id));
                        setOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <SafeDynamicIcon
                        name={menu.icon}
                        className="mr-2 h-4 w-4"
                      />
                      <span className="flex-1">{menu.menuName}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === String(menu.id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
                {!isLoading &&
                  displayedMenus.length < getFilteredMenus().length && (
                    <div className="p-2 flex justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={loadMoreMenus}
                        disabled={loadingMore}
                        className="w-full text-xs"
                      >
                        {loadingMore ? (
                          <>
                            <div className="animate-spin mr-2 h-3 w-3 border-2 border-gray-300 border-t-primary rounded-full"></div>
                            Loading...
                          </>
                        ) : (
                          <>
                            Load More ({displayedMenus.length} of{" "}
                            {getFilteredMenus().length})
                          </>
                        )}
                      </Button>
                    </div>
                  )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
