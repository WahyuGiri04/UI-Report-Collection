import { ColumnDef } from "@tanstack/react-table";
import { FormDepartment } from "../form/form";
import { Alert } from "../alert/alert";
import { Department } from "@/lib/model/entity/Departement";

export const columns = (
  onReload: (searchDepartmentName: string, page: number, row: number) => void,
  searchDepartmentName: string,
  page: number,
  rowNumber: number
): ColumnDef<Department>[] => [
  {
    header: " ",
    cell: () => "#",
  },
  {
    accessorKey: "departmentName",
    header: "Department Name",
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
        <FormDepartment
          title="Edit Department"
          id={row.original.id!}
          onSuccess={() => {
            onReload(searchDepartmentName, page, rowNumber);
          }}
        />
        <div className="h-5 w-px bg-gray-300" />
        <Alert
          id={row.original.id!}
          onSuccess={() => {
            onReload(searchDepartmentName, page, rowNumber);
          }}
        />
      </div>
    ),
  },
];
