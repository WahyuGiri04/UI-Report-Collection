import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SafeDynamicIcon } from "@/components/util/safe-dynamic-icon";
import { ColumnDef } from "@tanstack/react-table";
import { Alert } from "../alert/alert";
import { PencilIcon } from "lucide-react";
import { EmployeeSearch } from "@/lib/model/view/EmployeeSearch";
import { Employee } from "@/lib/model/entity/Employee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogDetail } from "../alert/detail";

export const columns = (
  onReload: (
    searchEmployeeForm: EmployeeSearch,
    page: number,
    row: number
  ) => void,
  searchEmployeeForm: EmployeeSearch,
  page: number,
  rowNumber: number,
  onEditClick: (id: number) => void
): ColumnDef<Employee>[] => [
  {
    header: " ",
    cell: () => "#",
  },
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
      >
        <SafeDynamicIcon
          color={row.original.gender === "L" ? "red" : "pink"}
          name={row.original.gender === "L" ? "mars" : "venus"}
        />
        <span>{row.original.gender === "L" ? "Laki-laki" : "Perempuan"}</span>
      </Badge>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    header: "Department",
    cell: ({ row }) => <>{row.original.departement?.departmentName}</>,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <DialogDetail id={row.original.id!} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>View</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="h-5 w-px bg-gray-300" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                size="sm"
                onClick={() => onEditClick(row.original.id!)}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="h-5 w-px bg-gray-300" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Alert
                  id={row.original.id!}
                  onSuccess={() => {
                    onReload(searchEmployeeForm, page, rowNumber);
                  }}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
];
