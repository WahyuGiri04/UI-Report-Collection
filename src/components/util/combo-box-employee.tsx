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
import { useEffect, useRef, useState } from "react";
import { Employee } from "@/lib/model/entity/Employee";
import { GetEmployeeList } from "@/lib/service/employee-service";

type ComboboxProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function ComboboxEmployee({
  value,
  onChange,
  className,
}: ComboboxProps) {
  const [dataList, setDataList] = useState<Employee[]>([]);
  const [displayedData, setDisplayedData] = useState<Employee[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedItem = dataList.find((item) => String(item.id) === value);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const batchSize = 5;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (dataList.length > 0) {
      if (searchTerm) {
        const filtered = dataList.filter((data) =>
          data.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setDisplayedData(filtered.slice(0, batchSize));
      } else {
        setDisplayedData(dataList.slice(0, batchSize));
      }
    }
  }, [dataList, searchTerm]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await GetEmployeeList();
      if (response.data !== undefined) {
        setDataList(response.data);
        setDisplayedData(response.data.slice(0, batchSize));
      }
    } catch (error) {
      console.error("Failed to fetch data list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoredatas = () => {
    if (displayedData.length >= getFilteredDatas().length) return;

    setLoadingMore(true);
    setTimeout(() => {
      const nextBatch = getFilteredDatas().slice(
        0,
        displayedData.length + batchSize
      );
      setDisplayedData(nextBatch);
      setLoadingMore(false);
    }, 300); // Small timeout to provide visual feedback
  };

  const getFilteredDatas = () => {
    if (!searchTerm) return dataList;
    return dataList.filter((data) =>
      data.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
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
          className={`sm:w-full w-full justify-between col-span-2 ${className}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="text-gray-400">Loading employee...</span>
              <div className="animate-spin ml-2 h-4 w-4 border-2 border-gray-300 border-t-primary rounded-full"></div>
            </>
          ) : (
            <>
              {selectedItem ? selectedItem.fullName : "Select Emplopyee..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        style={{ width: buttonRef.current?.offsetWidth }}
        id="data-type"
      >
        <Command className="w-full">
          <CommandInput
            placeholder="Search data..."
            className="h-9"
            onValueChange={setSearchTerm}
          />
          <CommandList className="max-h-60 overflow-auto">
            {isLoading ? (
              <div className="py-6 text-center">
                <div className="animate-spin mx-auto h-6 w-6 border-2 border-gray-300 border-t-primary rounded-full"></div>
                <p className="mt-2 text-sm text-gray-500">
                  Loading employee...
                </p>
              </div>
            ) : (
              <>
                <CommandEmpty>No data found</CommandEmpty>
                <CommandGroup>
                  {displayedData.map((data) => (
                    <CommandItem
                      key={data.id}
                      value={data.fullName}
                      onSelect={() => {
                        onChange(String(data.id));
                        setOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <span className="flex-1">
                        {data.nip} - {data.fullName}
                      </span>
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
                  displayedData.length < getFilteredDatas().length && (
                    <div className="p-2 flex justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={loadMoredatas}
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
                            Load More ({displayedData.length} of{" "}
                            {getFilteredDatas().length})
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
