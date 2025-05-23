import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { AlertActiveInActive } from "../alert/alert-active-inactive";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogDetail } from "../alert/detail";
import { UsersSearch } from "@/lib/model/view/UsersSearch";
import { Users } from "@/lib/model/entity/Users";
import { CheckCircle2Icon, CircleX } from "lucide-react";
import { AlertDelete } from "../alert/alert-delete";
import { AlertResetPassword } from "../alert/alert-reset-password";
import { Roles } from "@/lib/model/entity/Roles";

export const columns = (
  onReload: (searchForm: UsersSearch, page: number, row: number) => void,
  searchForm: UsersSearch,
  page: number,
  rowNumber: number
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
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
      >
        {row.original.isDeleted === "N" ? (
          <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
        ) : (
          <CircleX className="text-red-500 dark:text-red-400" />
        )}
        {row.original.isDeleted === "Y" ? "Inactive" : "Active"}
      </Badge>
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
          {roles.map((role: Roles, idx: number) => {
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
        {row.original.isDeleted !== "Y" ? (
          <>
            <div className="h-5 w-px bg-gray-300" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <AlertResetPassword
                      id={row.original.id!}
                      onSuccess={() => {
                        onReload(searchForm, page, rowNumber);
                      }}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset Password</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <div></div>
        )}
        {row.original.username !== "admin" ? (
          <>
            <div className="h-5 w-px bg-gray-300" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <AlertActiveInActive
                      id={row.original.id!}
                      onSuccess={() => {
                        onReload(searchForm, page, rowNumber);
                      }}
                      isActive={row.original.isDeleted}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {row.original.isDeleted === "Y" ? (
                    <p>Set Active</p>
                  ) : (
                    <p>Set InActive</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="h-5 w-px bg-gray-300" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <AlertDelete
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
          </>
        ) : (
          <div></div>
        )}
      </div>
    ),
  },
];
