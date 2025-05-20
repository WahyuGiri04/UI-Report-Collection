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
import { Department } from "@/lib/model/entity/Departement";
import { GetDepartments } from "@/lib/service/department-service";

type ComboboxMainMenuProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function ComboboxDepartment({
  value,
  onChange,
  className,
}: ComboboxMainMenuProps) {
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [displayedDepartment, setDisplayedDepartment] = useState<Department[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedItem = departmentList.find((item) => String(item.id) === value);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const batchSize = 5;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (departmentList.length > 0) {
      if (searchTerm) {
        const filtered = departmentList.filter((departement) =>
          departement.departmentName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        setDisplayedDepartment(filtered.slice(0, batchSize));
      } else {
        setDisplayedDepartment(departmentList.slice(0, batchSize));
      }
    }
  }, [departmentList, searchTerm]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await GetDepartments();
      if (response.data !== undefined) {
        setDepartmentList(response.data);
        setDisplayedDepartment(response.data.slice(0, batchSize));
      }
    } catch (error) {
      console.error("Failed to fetch menu list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMenus = () => {
    if (displayedDepartment.length >= getFiltered().length) return;

    setLoadingMore(true);
    setTimeout(() => {
      const nextBatch = getFiltered().slice(
        0,
        displayedDepartment.length + batchSize
      );
      setDisplayedDepartment(nextBatch);
      setLoadingMore(false);
    }, 300); // Small timeout to provide visual feedback
  };

  const getFiltered = () => {
    if (!searchTerm) return departmentList;
    return departmentList.filter((data) =>
      data.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
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
          className={`w-full justify-between ${className}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="text-gray-400">Loading departement...</span>
              <div className="animate-spin ml-2 h-4 w-4 border-2 border-gray-300 border-t-primary rounded-full"></div>
            </>
          ) : (
            <>
              {selectedItem
                ? selectedItem.departmentName
                : "Select Department..."}
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
                <p className="mt-2 text-sm text-gray-500">
                  Loading departement...
                </p>
              </div>
            ) : (
              <>
                <CommandEmpty>No menu found</CommandEmpty>
                <CommandGroup>
                  {displayedDepartment.map((data) => (
                    <CommandItem
                      key={data.id}
                      value={data.departmentName}
                      onSelect={() => {
                        onChange(String(data.id));
                        setOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <span className="flex-1">{data.departmentName}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === String(data.id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
                {!isLoading &&
                  displayedDepartment.length < getFiltered().length && (
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
                            Load More ({displayedDepartment.length} of{" "}
                            {getFiltered().length})
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
