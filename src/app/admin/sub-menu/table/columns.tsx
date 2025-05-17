import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SafeDynamicIcon } from "@/components/util/safe-dynamic-icon";
import { ColumnDef } from "@tanstack/react-table";
import { Alert } from "../alert/alert";
import { PencilIcon } from "lucide-react";
import { SubMenu } from "@/lib/model/entity/SubMenu";

export const columns = (
  onReload: (
    searchMainMenuName: string,
    searchMenuType: string,
    page: number,
    row: number
  ) => void,
  searchMainMenuName: string,
  searchMenuType: string,
  page: number,
  rowNumber: number,
  onEditClick: (id: number) => void
): ColumnDef<SubMenu>[] => [
  {
    header: " ",
    cell: () => "#",
  },
  {
    accessorKey: "subMenuName",
    header: "Sub Menu Name",
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
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "mainMenuId",
    header: "Main Menu",
    cell: ({ row }) => (
      <div className="flex items-start justify-start space-x-2">
        <Badge
          variant="secondary"
          className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
        >
          <SafeDynamicIcon name={row.original.mainMenuId?.icon} />
          <span>{row.original.mainMenuId?.menuName}</span>
        </Badge>
        <Badge
          variant={
            row.original.mainMenuId?.menuType === 1 ? "outline" : "secondary"
          }
          className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
        >
          <SafeDynamicIcon
            name={
              row.original.mainMenuId?.menuType === 1
                ? "layout-dashboard"
                : "menu"
            }
          />
          <span>
            {row.original.mainMenuId?.menuType === 1 ? "Dashboard" : "Menu"}
          </span>
        </Badge>
      </div>
    ),
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
        <Alert
          id={row.original.id!}
          onSuccess={() => {
            onReload(searchMainMenuName, searchMenuType, page, rowNumber);
          }}
        />
      </div>
    ),
  },
];
