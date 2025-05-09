import { Badge } from "@/components/ui/badge";
import { SafeDynamicIcon } from "@/components/util/safe-dynamic-icon";
import { Roles } from "@/lib/model/Roles";
import { ColumnDef } from "@tanstack/react-table";
import { FormRoles } from "../form/form";
import { Alert } from "../alert/alert";

export const columns = (
  onReload: (page: number, row: number) => void,
  page: number,
  rowNumber: number
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
          <FormRoles title="Edit Role" id={row.original.id!} onSuccess={() => { onReload(page, rowNumber); }} />
          <div className="h-5 w-px bg-gray-300" />
          <Alert id={row.original.id!} onSuccess={() => { onReload(page, rowNumber); }} />
        </div>
      ),
    },
  ];
