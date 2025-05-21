import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastError, ToastSuccess } from "@/components/util/toast-util";
import { Loader2, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { Users } from "@/lib/model/entity/Users";
import {
  AddUsers,
  GetUsersById,
  UpdateUsers,
} from "@/lib/service/users-service";
import { ComboboxEmployee } from "@/components/util/combo-box-employee";
import { GetEmployeeById } from "@/lib/service/employee-service";
import { Employee } from "@/lib/model/entity/Employee";

type formEmpProp = {
  validEmployee: boolean;
  validPassword: boolean;
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
  const [data, setData] = useState<Users>({
    username: "",
    password: "",
    employee: undefined,
    roles: undefined,
  });
  const [formValid, setFormValid] = useState<formEmpProp>({
    validPassword: false,
    validEmployee: false,
  });

  useEffect(() => {
    if (id === 0) {
      setData({
        username: "",
        password: "",
        employee: undefined,
        roles: undefined,
      });
    } else {
      fetchData(id);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await GetEmployeeById(Number(data.employee?.id));
    if (response.data === undefined) {
      ToastError("Employee not found");
      return;
    }

    const val = response.data;

    const newData: Users = {
      username: val.email,
      password: data.password,
      employee: {
        id: val.id,
        departement: {
          id: val.departement?.id,
        },
      },
    };

    const isValid = validationForm();
    if (!isValid) {
      return;
    }

    setData(newData);

    setIsLoading(true);
    if (id === 0) {
      const response = await AddUsers(newData);
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
      const response = await UpdateUsers(newData, id);
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
      username: "",
      password: "",
      employee: undefined,
      roles: undefined,
    });
  };

  const validationForm = () => {
    const isEmployeeEmpty = !data.employee?.id;
    setFormValid({
      ...formValid,
      validEmployee: isEmployeeEmpty,
    });
    if (isEmployeeEmpty) return false;

    const isPasswordEmpty = !data.password;
    setFormValid({
      ...formValid,
      validPassword: isPasswordEmpty,
    });
    if (isPasswordEmpty) return false;

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
                <ComboboxEmployee
                  value={String(data.employee?.id)}
                  onChange={(value) => {
                    setData({
                      ...data,
                      employee: {
                        id: Number(value),
                      },
                    });
                  }}
                  className={
                    formValid.validEmployee ? "ring-4 ring-red-500" : ""
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-left sm:text-right">
                Password
              </Label>
              <div className="col-span-3">
                <Input
                  id="password"
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                    setFormValid({
                      ...formValid,
                      validPassword: false,
                    });
                  }}
                  className={
                    formValid.validPassword
                      ? "ring-4 ring-red-500 shadow-red-400"
                      : " "
                  }
                  placeholder="Password ..."
                  type="text"
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
