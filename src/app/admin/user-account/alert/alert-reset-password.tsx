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
import { LoadingPage } from "@/components/util/loading";
import { ToastError, ToastSuccess } from "@/components/util/toast-util";
import { ResetAccount } from "@/lib/service/users-service";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export function AlertResetPassword({
  id,
  onSuccess,
  isActive,
}: {
  id: number;
  onSuccess?: () => void;
  isActive?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    const response = await ResetAccount(id);
    if (response.statusCode === 200) {
      ToastSuccess(response.message);
    } else {
      ToastError(response.message);
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onSuccess?.();
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <RefreshCw />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah adan yakin ?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah anda yakin ingin reset akun ini ? Password baru di kirim
              via email users
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {isLoading && <LoadingPage />}
    </>
  );
}
