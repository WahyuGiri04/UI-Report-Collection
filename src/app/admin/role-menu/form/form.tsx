import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToastError, ToastSuccess } from "@/components/util/toast-util";
import { Loader2, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { GetUsersById } from "@/lib/service/users-service";
import { ComboboxRoles } from "@/components/util/combo-box-roles";
import { RoleMenu } from "@/lib/model/entity/RoleMenu";
import { AddRoleMenu, UpdateRoleMenu } from "@/lib/service/role-menu-service";
import { ComboboxMainMenu } from "@/components/util/combo-box-main-menu";

type formEmpProp = {
  validMenuId: boolean;
  validRoleId: boolean;
};

export function Form({
  title,
  id,
  onSuccess,
}: {
  title: string;
  id: number;
  onSuccess?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<RoleMenu>({
    mainMenuId: undefined,
    roleId: undefined,
  });
  const [formValid, setFormValid] = useState<formEmpProp>({
    validMenuId: false,
    validRoleId: false,
  });

  useEffect(() => {
    if (id === 0) {
      setData({
        mainMenuId: undefined,
        roleId: undefined,
      });
    } else {
      fetchData(id);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validationForm();
    if (!isValid) {
      return;
    }

    setIsLoading(true);
    if (id === 0) {
      const response = await AddRoleMenu(data);
      if (response.statusCode === 200) {
        ToastSuccess(response.message);
        setIsLoading(false);
        resetForm();
        onSuccess?.();
      } else {
        ToastError(response.message);
        setIsLoading(false);
      }
    } else {
      const response = await UpdateRoleMenu(data, id);
      if (response.statusCode === 200) {
        ToastSuccess(response.message);
        setIsLoading(false);
        resetForm();
        onSuccess?.();
      } else {
        ToastError(response.message);
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setData({
      mainMenuId: undefined,
      roleId: undefined,
    });
  };

  const validationForm = () => {
    const isMenuIdEmpty = !data.mainMenuId?.id;
    setFormValid({
      ...formValid,
      validMenuId: isMenuIdEmpty,
    });
    if (isMenuIdEmpty) return false;

    const isRoleIdEmpty = !data.roleId?.id;
    setFormValid({
      ...formValid,
      validRoleId: isRoleIdEmpty,
    });
    if (isRoleIdEmpty) return false;

    return true;
  };

  const fetchData = async (id: number) => {
    setIsLoading(true);
    const response = await GetUsersById(id);
    if (response.data !== undefined) {
      setData(response.data);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <CardHeader>
        <CardTitle>
          <h3 className="text-lg font-semibold">{title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-left sm:text-right">
                Employee
              </Label>
              <div className="col-span-3">
                <ComboboxMainMenu
                  value={String(data.mainMenuId?.id)}
                  onChange={(value) => {
                    setData({
                      ...data,
                      mainMenuId: {
                        id: Number(value),
                      },
                    });
                  }}
                  className={formValid.validMenuId ? "ring-4 ring-red-500" : ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-left sm:text-right">
                Password
              </Label>
              <div className="col-span-3">
                <ComboboxRoles
                  value={String(data.roleId?.id)}
                  onChange={(value) => {
                    setData({
                      ...data,
                      roleId: {
                        id: Number(value),
                      },
                    });
                  }}
                  className={
                    formValid.validRoleId
                      ? "ring-4 ring-red-500 shadow-red-400"
                      : " "
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {id === 0 ? "Adding..." : "Updating..."}
                </>
              ) : (
                <>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  {id === 0 ? "Save Data" : "Update Data"}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </CardContent>
    </div>
  );
}
