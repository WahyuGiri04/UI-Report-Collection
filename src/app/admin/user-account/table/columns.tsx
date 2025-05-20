import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SafeDynamicIcon } from "@/components/util/safe-dynamic-icon";
import { ColumnDef } from "@tanstack/react-table";
import { Alert } from "../alert/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogDetail } from "../alert/detail";
import { UsersSearch } from "@/lib/model/view/UsersSearch";
import { Users } from "@/lib/model/entity/Users";
import { PencilIcon } from "lucide-react";
import { ro } from "date-fns/locale";

export const columns = (
  onReload: (searchForm: UsersSearch, page: number, row: number) => void,
  searchForm: UsersSearch,
  page: number,
  rowNumber: number,
  onEditClick: (id: number) => void
): ColumnDef<Users>[] => [
  {
    header: " ",
    cell: () => "#",
  },
  {
    accessorKey: "username",
    header: "User Name",
  },
  {
    header: "NIP",
    cell: ({ row }) => <p>{row.original.employee?.nip}</p>,
  },
  {
    header: "Name",
    cell: ({ row }) => <p>{row.original.employee?.fullName}</p>,
  },
  {
    header: "Email",
    cell: ({ row }) => <p>{row.original.employee?.email}</p>,
  },
  {
    header: "Department",
    cell: ({ row }) => (
      <>{row.original.employee?.departement?.departmentName}</>
    ),
  },
  {
    header: "Role",
    cell: ({ row }) => {
      const roles = row.original.roles ?? [];

      if (roles.length === 0) {
        return <>-</>;
      }

      return (
        <div className="flex flex-wrap gap-1">
          {roles.map((role: any, idx: number) => {
            const isAdmin = role.roleName?.toLowerCase().includes("admin");

            return (
              <Badge key={idx} variant={isAdmin ? "destructive" : "secondary"}>
                {role.roleName}
              </Badge>
            );
          })}{" "}
        </div>
      );
    },
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
                    onReload(searchForm, page, rowNumber);
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
