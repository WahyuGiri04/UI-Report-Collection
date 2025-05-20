import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ToastError, ToastSuccess } from "@/components/util/toast-util";
import { DeleteEmployee } from "@/lib/service/employee-service";
import { DeleteSubMenu } from "@/lib/service/sub-menu-service";
import { Trash2Icon } from "lucide-react";

export function Alert({
  id,
  onSuccess,
}: {
  id: number;
  onSuccess?: () => void;
}) {
  const handleDelete = async () => {
    const response = await DeleteEmployee(id);
    if (response.statusCode === 200) {
      ToastSuccess(response.message);
    } else {
      ToastError(response.message);
    }
    onSuccess?.();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
          size="icon"
        >
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah adan yakin ?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus data ini ? Data yang dihapus tidak
            dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
