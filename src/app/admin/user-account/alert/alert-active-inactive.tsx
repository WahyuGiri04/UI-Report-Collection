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
import { Users } from "@/lib/model/entity/Users";
import {
  DeleteUsers,
  GetUsersById,
  UpdateUsers,
} from "@/lib/service/users-service";
import { CheckIcon, CircleX } from "lucide-react";

export function AlertActiveInActive({
  id,
  onSuccess,
  isActive,
}: {
  id: number;
  onSuccess?: () => void;
  isActive?: string;
}) {
  const handleDelete = async () => {
    const responseId = await GetUsersById(id);
    if (responseId.data == undefined) {
      return;
    }
    const val = responseId.data;
    let isDeleted = "";

    if (isActive === "Y") {
      isDeleted = "N";
    } else {
      isDeleted = "Y";
    }
    const newData = {
      ...val,
      isDeleted: isDeleted,
    };

    const response = await UpdateUsers(newData, id);
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
          {isActive === "Y" ? <CheckIcon /> : <CircleX />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah adan yakin ?</AlertDialogTitle>
          <AlertDialogDescription>
            {isActive === "N"
              ? "Apakah anda yakin ingin menonaktifkan user ini ?"
              : "Apakah anda yakin ingin mengaktifkan user ini ?"}
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
