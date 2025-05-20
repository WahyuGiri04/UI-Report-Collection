// "use client";

// import * as React from "react";
// import { format, parseISO } from "date-fns";
// import { CalendarIcon } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// type DateTimeProp = {
//   value: string;
//   onChange: (value: string) => void;
// };

// export function DateTimePicker({ value, onChange }: DateTimeProp) {
//   const [date, setDate] = React.useState<Date | undefined>(
//     value ? parseISO(value) : undefined
//   );

//   const handleSelect = (selectedDate: Date | undefined) => {
//     if (!selectedDate) return;

//     setDate(selectedDate);
//     const formatted = format(selectedDate, "yyyy-MM-dd");
//     onChange(formatted);
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[240px] justify-start text-left font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon />
//           {date ? format(date, "PPP") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           required
//           selected={date}
//           onSelect={handleSelect}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }

"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  setMonth,
  setYear,
  getDaysInMonth,
  isToday as isDateToday,
  parse,
  isValid,
} from "date-fns";
import { id } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ModernDatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  className?: string;
  format?: string;
  placeholder?: string;
}

export function DateTimePicker({
  value,
  onChange,
  className,
  format: dateFormat = "yyyy-MM-dd",
  placeholder = "Pilih tanggal",
}: ModernDatePickerProps) {
  // Parse string value to Date if available
  const parseDate = React.useCallback(
    (dateString?: string) => {
      if (!dateString) return undefined;
      const parsedDate = parse(dateString, dateFormat, new Date());
      return isValid(parsedDate) ? parsedDate : undefined;
    },
    [dateFormat]
  );

  const parsedValue = React.useMemo(() => parseDate(value), [value, parseDate]);

  const [date, setDate] = React.useState<Date>(parsedValue || new Date());
  const [isOpen, setIsOpen] = React.useState(false);
  const [view, setView] = React.useState<"date" | "month" | "year" | "decade">(
    "date"
  );
  const [direction, setDirection] = React.useState<number>(0);
  const previousView = React.useRef<"date" | "month" | "year" | "decade">(
    "date"
  );
  const [currentDecade, setCurrentDecade] = React.useState<number>(
    Math.floor(date.getFullYear() / 10) * 10
  );
  const [animatingView, setAnimatingView] = React.useState(false);

  // Generate months
  const months = Array.from({ length: 12 }, (_, i) => i);

  // Generate days for the current month
  const daysInMonth = getDaysInMonth(date);
  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  // Adjust for Sunday as the first day of the week (0)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const daysWithPadding = [...Array(adjustedFirstDay).fill(null), ...days];

  // Week days
  const weekDays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  // Generate years for the current decade
  const getDecadeYears = (decade: number) => {
    return Array.from({ length: 10 }, (_, i) => decade + i);
  };

  // View hierarchy for determining direction
  const viewHierarchy = { date: 0, month: 1, year: 2, decade: 3 };

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    // Convert Date to string before calling onChange
    onChange?.(format(newDate, dateFormat));
    setIsOpen(false);
  };

  const handleMonthChange = (monthValue: number) => {
    const newDate = setMonth(date, monthValue);
    setDate(newDate);
    setDirection(-1); // Going back from month to date view
    previousView.current = view;
    setAnimatingView(true);
    setTimeout(() => {
      setView("date");
      setAnimatingView(false);
    }, 50);
  };

  const handleYearChange = (yearValue: number) => {
    const newDate = setYear(date, yearValue);
    setDate(newDate);
    setDirection(-1); // Going back from year to month view
    previousView.current = view;
    setAnimatingView(true);
    setTimeout(() => {
      setView("month");
      setAnimatingView(false);
    }, 50);
  };

  const handlePreviousMonth = () => {
    setDirection(-1);
    setDate(subMonths(date, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setDate(addMonths(date, 1));
  };

  const handlePreviousDecade = () => {
    setDirection(-1);
    setCurrentDecade(currentDecade - 10);
  };

  const handleNextDecade = () => {
    setDirection(1);
    setCurrentDecade(currentDecade + 10);
  };

  const handleViewChange = (newView: "date" | "month" | "year" | "decade") => {
    const currentViewLevel = viewHierarchy[view];
    const newViewLevel = viewHierarchy[newView];

    // Set direction based on view hierarchy
    setDirection(newViewLevel > currentViewLevel ? 1 : -1);
    previousView.current = view;

    setAnimatingView(true);
    setTimeout(() => {
      setView(newView);
      setAnimatingView(false);
    }, 50);

    // Update current decade when switching to year view
    if (newView === "year") {
      setCurrentDecade(Math.floor(date.getFullYear() / 10) * 10);
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!parsedValue) return false;
    return (
      day === parsedValue.getDate() &&
      date.getMonth() === parsedValue.getMonth() &&
      date.getFullYear() === parsedValue.getFullYear()
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
  };

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction * 50,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      },
    },
    exit: (direction: number) => ({
      x: direction * -50,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    }),
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-center text-left font-normal group relative overflow-hidden transition-all duration-300 bg-background hover:bg-background/80 border-border/50 hover:border-border rounded-xl",
            !parsedValue && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="truncate">
              {parsedValue
                ? format(parsedValue, "dd MMMM yyyy", { locale: id })
                : placeholder}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 shadow-lg shadow-black/10 backdrop-blur-md bg-background/95 rounded-xl border border-border/30"
        align="center"
        side="bottom"
        sideOffset={5}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="overflow-hidden rounded-xl"
        >
          <AnimatePresence mode="wait" custom={direction}>
            {!animatingView && (
              <motion.div
                key={view + (view === "year" ? currentDecade : "")}
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-4 min-w-[290px]"
              >
                {view === "date" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-muted/80"
                        onClick={handlePreviousMonth}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Bulan sebelumnya</span>
                      </Button>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          onClick={() => handleViewChange("month")}
                          className="text-sm font-medium hover:bg-muted/80 rounded-full px-3 relative overflow-hidden group"
                        >
                          <span className="relative z-10">
                            {format(date, "MMMM", { locale: id })}
                          </span>
                          <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleViewChange("year")}
                          className="text-sm font-medium hover:bg-muted/80 rounded-full px-3 relative overflow-hidden group"
                        >
                          <span className="relative z-10">
                            {format(date, "yyyy")}
                          </span>
                          <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-muted/80"
                        onClick={handleNextMonth}
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Bulan berikutnya</span>
                      </Button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mt-1">
                      {weekDays.map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-medium text-muted-foreground h-8 flex items-center justify-center"
                        >
                          {day}
                        </div>
                      ))}
                      {daysWithPadding.map((day, index) => {
                        if (day === null) {
                          return <div key={`empty-${index}`} />;
                        }

                        return (
                          <div
                            key={`day-${day}`}
                            className="flex items-center justify-center p-0.5"
                          >
                            <button
                              type="button"
                              className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 relative overflow-hidden group",
                                isToday(day) &&
                                  "font-medium text-primary relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full",
                                isSelected(day) &&
                                  "bg-primary text-primary-foreground shadow-md shadow-primary/20",
                                !isSelected(day) && "hover:bg-muted/80"
                              )}
                              onClick={() => {
                                const newDate = new Date(date);
                                newDate.setDate(day);
                                handleDateChange(newDate);
                              }}
                            >
                              {day}
                              {!isSelected(day) && (
                                <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {isDateToday(new Date()) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2 text-xs text-muted-foreground hover:text-foreground rounded-full relative overflow-hidden group"
                        onClick={() => handleDateChange(new Date())}
                      >
                        <span className="relative z-10">Hari ini</span>
                        <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                      </Button>
                    )}
                  </div>
                )}

                {view === "month" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleViewChange("date")}
                        className="text-sm font-medium hover:bg-muted/80 rounded-full relative overflow-hidden group"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1 relative z-10" />
                        <span className="relative z-10">Kembali</span>
                        <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleViewChange("year")}
                        className="text-sm font-medium hover:bg-muted/80 rounded-full relative overflow-hidden group"
                      >
                        <span className="relative z-10">
                          {format(date, "yyyy")}
                        </span>
                        <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {months.map((month) => {
                        const isCurrentMonth =
                          parsedValue && parsedValue.getMonth() === month;
                        return (
                          <div key={`month-${month}`} className="p-0.5">
                            <button
                              type="button"
                              className={cn(
                                "w-full py-2 rounded-lg text-sm transition-all duration-200 relative overflow-hidden",
                                isCurrentMonth
                                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                  : "hover:bg-muted/80 group"
                              )}
                              onClick={() => handleMonthChange(month)}
                            >
                              <span className="relative z-10">
                                {format(new Date(2000, month, 1), "MMM", {
                                  locale: id,
                                })}
                              </span>
                              {!isCurrentMonth && (
                                <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {view === "year" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleViewChange("month")}
                        className="text-sm font-medium hover:bg-muted/80 rounded-full relative overflow-hidden group"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1 relative z-10" />
                        <span className="relative z-10">Kembali</span>
                        <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                      </Button>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-muted/80 relative overflow-hidden group"
                          onClick={handlePreviousDecade}
                        >
                          <ChevronsLeft className="h-3.5 w-3.5 relative z-10" />
                          <span className="sr-only">Dekade sebelumnya</span>
                          <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                        </Button>
                        <span className="text-sm font-medium px-1">
                          {currentDecade} - {currentDecade + 9}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-muted/80 relative overflow-hidden group"
                          onClick={handleNextDecade}
                        >
                          <ChevronsRight className="h-3.5 w-3.5 relative z-10" />
                          <span className="sr-only">Dekade berikutnya</span>
                          <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {getDecadeYears(currentDecade).map((year) => {
                        const isCurrentYear =
                          parsedValue && parsedValue.getFullYear() === year;
                        return (
                          <div key={`year-btn-${year}`} className="p-0.5">
                            <button
                              type="button"
                              className={cn(
                                "w-full py-2.5 rounded-lg text-sm transition-all duration-200 relative overflow-hidden",
                                isCurrentYear
                                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                  : "hover:bg-muted/80 group"
                              )}
                              onClick={() => handleYearChange(year)}
                            >
                              <span className="relative z-10">{year}</span>
                              {!isCurrentYear && (
                                <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
