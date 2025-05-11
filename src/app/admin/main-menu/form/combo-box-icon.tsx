"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { lucideIconProp } from "@/lib/const/lucide-icon"
import { SafeDynamicIcon } from "@/components/util/safe-dynamic-icon"

interface ComboboxIconProps {
  value: string;
  onChange: (value: string) => void;
}

export function ComboboxIcon({ value, onChange }: ComboboxIconProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [visibleCount, setVisibleCount] = React.useState(20)
  const [isLoading, setIsLoading] = React.useState(false)

  // Filter icons based on search query
  const filteredIcons = React.useMemo(() => {
    if (!searchQuery) return lucideIconProp.slice(0, visibleCount)

    return lucideIconProp.filter(icon =>
      icon.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      icon.value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, visibleCount])

  // Handle loading more icons
  const handleLoadMore = () => {
    setIsLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 20, lucideIconProp.length))
      setIsLoading(false)
    }, 300)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {value ? (
            <div className="flex items-center gap-2">
              <SafeDynamicIcon name={value} />
              <span>{value}</span>
            </div>
          ) : (
            "Select Icon..."
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput
            placeholder="Search icons..."
            className="h-9"
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No icon found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {filteredIcons.map((icon) => (
                <CommandItem
                  key={icon.value}
                  value={icon.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <SafeDynamicIcon name={icon.value} />
                    <span>{icon.label}</span>
                    <Check
                      className={cn(
                        "ml-auto",
                        value === icon.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            {!searchQuery && visibleCount < lucideIconProp.length && (
              <div className="py-2 px-2 text-center border-t">
                <Button
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    `Load more (${visibleCount}/${lucideIconProp.length})`
                  )}
                </Button>
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}