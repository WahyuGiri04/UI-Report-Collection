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
import { genderType } from "@/lib/const/gender-type";

type ComboboxDemoProps = {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
};

export function ComboboxGender({
  value,
  onChange,
  className,
}: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);
  const selectedItem = genderType.find((item) => item.value === value);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${className}`}
        >
          {selectedItem ? selectedItem.label : "Select gender..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        style={{ width: buttonRef.current?.offsetWidth }}
        id="menu-type"
      >
        <Command className="w-full">
          <CommandInput placeholder="Search by gender..." className="h-9" />
          <CommandList>
            <CommandEmpty>Gender</CommandEmpty>
            <CommandGroup>
              {genderType.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.label}
                  onSelect={(selectedLabel) => {
                    const selected = genderType.find(
                      (x) =>
                        x.label.toLowerCase() === selectedLabel.toLowerCase()
                    );
                    if (selected) {
                      onChange(selected.value);
                      setOpen(false);
                    }
                  }}
                >
                  <SafeDynamicIcon name={framework.icon} />
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
