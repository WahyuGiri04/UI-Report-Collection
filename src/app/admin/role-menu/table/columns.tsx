import { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertDelete } from "../alert/alert-delete";
import { RoleMenu } from "@/lib/model/entity/RoleMenu";

export const columns = (
  onReload: (userId: string, roleId: string, page: number, row: number) => void,
  userId: string,
  roleId: string,
  page: number,
  rowNumber: number
): ColumnDef<RoleMenu>[] => [
  {
    header: " ",
    cell: () => "#",
  },
  {
    header: "Menu",
    cell: ({ row }) => <p>{row.original.mainMenuId?.menuName}</p>,
  },
  {
    header: "Role",
    cell: ({ row }) => <p>{row.original.roleId?.roleName}</p>,
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
                <AlertDelete
                  id={row.original.id!}
                  onSuccess={() => {
                    onReload(roleId, userId, page, rowNumber);
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
