import { Badge } from "@/components/ui/badge";
import { SafeDynamicIcon } from "@/components/util/safe-dynamic-icon";
import { ColumnDef } from "@tanstack/react-table";
import { Alert } from "../alert/alert";
import { Menu } from "@/lib/model/Menu";

export const columns = (
  onReload: (searchMainMenuName: string, searchMenuType: string, page: number, row: number) => void,
  searchMainMenuName: string,
  searchMenuType: string,
  page: number,
  rowNumber: number
): ColumnDef<Menu>[] => [
    {
      header: " ",
      cell: () => "#",
    },
    {
      accessorKey: "menuName",
      header: "Menu Name",
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
      accessorKey: "menuType",
      header: "Menu Type",
      cell: ({ row }) => (
        <Badge
          variant={row.original.menuType === 1 ? "outline" : "destructive"}
          className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
        >
          <SafeDynamicIcon name={row.original.menuType === 1 ? "layout-dashboard" : "menu"} />
          <span>{row.original.menuType === 1 ? "Dashboard" : "Menu"}</span>
        </Badge>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center space-x-2">
          {/* <Form title="Edit Role" id={row.original.id!} onSuccess={() => { onReload(searchMainMenuName, searchMenuType, page, rowNumber); }} />
          <div className="h-5 w-px bg-gray-300" /> */}
          <Alert id={row.original.id!} onSuccess={() => { onReload(searchMainMenuName, searchMenuType, page, rowNumber); }} />
        </div>
      ),
    },
  ];
