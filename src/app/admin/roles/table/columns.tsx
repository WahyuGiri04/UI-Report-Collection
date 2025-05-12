import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SafeDynamicIcon } from "@/components/util/safe-dynamic-icon";
import { ColumnDef } from "@tanstack/react-table";
import { Alert } from "../alert/alert";
import { PencilIcon } from "lucide-react";
import { Roles } from "@/lib/model/Roles";

export const columns = (
  onReload: (searchRoleName: string, page: number, row: number) => void,
  searchRoleName: string,
  page: number,
  rowNumber: number,
  onEditClick: (id: number) => void
): ColumnDef<Roles>[] => [
    {
      header: " ",
      cell: () => "#",
    },
    {
      accessorKey: "roleName",
      header: "Role Name",
    },
    {
      accessorKey: "icon",
      header: "Icon",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
        >
          <SafeDynamicIcon name={row.original.icon} />
          <span>{row.original.icon}</span>
        </Badge>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="sm"
            onClick={() => onEditClick(row.original.id!)}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <div className="h-5 w-px bg-gray-300" />
          <Alert id={row.original.id!} onSuccess={() => { onReload(searchRoleName, page, rowNumber); }} />
        </div>
      ),
    },
  ];