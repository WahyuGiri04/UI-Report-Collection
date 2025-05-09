import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SafeDynamicIcon } from "@/components/util/safe-dynamic-icon";
import { Roles } from "@/lib/model/Roles";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, SquareArrowOutUpRightIcon, Trash } from "lucide-react";

export const columns = (
  onEdit: (id: number) => void,
  onDelete: (id: number) => void
): ColumnDef<Roles>[] => [
  {
    header: "#",
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
    header: "Action",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <SquareArrowOutUpRightIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => onEdit(row.original.id)}>
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onDelete(row.original.id)}>
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
