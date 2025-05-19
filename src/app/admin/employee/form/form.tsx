import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastError, ToastSuccess } from "@/components/util/toast-util";
import { Menu } from "@/lib/model/entity/Menu";
import { AddMenu, GetMenuById, UpdateMenu } from "@/lib/service/menu-service";
import { Loader2, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { Employee } from "@/lib/model/entity/Employee";
import {
  AddEmployee,
  GetEmployeeById,
  UpdateEmployee,
} from "@/lib/service/employee-service";
import { ComboboxGender } from "@/components/util/combo-box-gender";
import { DateTimePicker } from "./data-time-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type formEmpProp = {
  validFullName: boolean;
  validAlamat: boolean;
  validEmail: boolean;
  validTanggalLahir: boolean;
  validTempatLahir: boolean;
  validGender: boolean;
  validDepartment: boolean;
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
  const [isValidGender, setIsValidGender] = useState(false);
  const [employee, setEmployee] = useState<Employee>({
    nip: "",
    firstName: "",
    lastName: "",
    fullName: "",
    alamat: "",
    email: "",
    tanggalLahir: "",
    tempatLahir: "",
    gender: "",
    departement: null,
  });
  const [formValid, setFormValid] = useState<formEmpProp>({
    validFullName: false,
    validAlamat: false,
    validEmail: false,
    validTanggalLahir: false,
    validTempatLahir: false,
    validGender: false,
    validDepartment: false,
  });

  useEffect(() => {
    if (id === 0) {
      setEmployee({
        nip: "",
        firstName: "",
        lastName: "",
        fullName: "",
        alamat: "",
        email: "",
        tanggalLahir: "",
        tempatLahir: "",
        gender: "",
        departement: null,
      });
    } else {
      fetchData(id);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmployee({
      ...employee,
      fullName: employee.firstName + " " + employee.lastName,
    });

    const isValid = validationForm();
    if (!isValid) {
      return;
    }

    setIsLoading(true);
    // if (id === 0) {
    //   const response = await AddEmployee(employee);
    //   if (response.statusCode === 200) {
    //     ToastSuccess(response.message);
    //     setIsLoading(false);
    //     resetForm();
    //     onSuccess?.();
    //   } else {
    //     ToastError(response.message);
    //     setIsLoading(false);
    //   }
    // } else {
    //   const response = await UpdateEmployee(employee, id);
    //   if (response.statusCode === 200) {
    //     ToastSuccess(response.message);
    //     setIsLoading(false);
    //     resetForm();
    //     onSuccess?.();
    //   } else {
    //     ToastError(response.message);
    //     setIsLoading(false);
    //   }
    // }
  };

  const resetForm = () => {
    setEmployee({
      nip: "",
      firstName: "",
      lastName: "",
      fullName: "",
      alamat: "",
      email: "",
      tanggalLahir: "",
      tempatLahir: "",
      gender: "",
      departement: null,
    });
  };

  const validationForm = () => {
    const isFullNameEmpty = !employee.fullName;
    setFormValid({
      ...formValid,
      validFullName: isFullNameEmpty,
    });
    if (isFullNameEmpty) return false;

    const isGenderEmpty = !employee.gender;
    setFormValid({
      ...formValid,
      validGender: isGenderEmpty,
    });
    if (isGenderEmpty) return false;

    return true;
  };

  const fetchData = async (empId: number) => {
    setIsLoading(true);
    const response = await GetEmployeeById(empId);
    if (response.data !== undefined) {
      setEmployee(response.data);
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
            <div
              className={`${
                id === 0 ? "hidden" : "grid grid-cols-4 items-center gap-4"
              }`}
            >
              <Label
                htmlFor="sub-menu-name"
                className="text-left sm:text-right"
              >
                NIP
              </Label>
              <Input
                id="NIP"
                disabled
                value={employee.nip}
                onChange={(e) =>
                  setEmployee({ ...employee, nip: e.target.value })
                }
                className="col-span-3"
                placeholder="Sub Menu Name ..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-left sm:text-right">
                First Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="firstName"
                  value={employee.firstName}
                  onChange={(e) => {
                    setEmployee({ ...employee, firstName: e.target.value });
                    setFormValid({
                      ...formValid,
                      validFullName: false,
                    });
                  }}
                  className={
                    formValid.validFullName
                      ? "ring-4 ring-red-500 shadow-red-400"
                      : " "
                  }
                  placeholder="First Name ..."
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-left sm:text-right">
                Last Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="lastName"
                  value={employee.lastName}
                  onChange={(e) =>
                    setEmployee({ ...employee, lastName: e.target.value })
                  }
                  placeholder="Last Name ..."
                />
                <p className="text-[12px] italic mt-0">
                  *) Last name tidak wajib di isi...
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-left sm:text-right">
                Gender
              </Label>
              <div className="col-span-3">
                <ComboboxGender
                  value={employee.gender}
                  onChange={(value) => {
                    setEmployee({
                      ...employee,
                      gender: value || "",
                    });
                    setFormValid({
                      ...formValid,
                      validGender: false,
                    });
                  }}
                  className={formValid.validGender ? "ring-4 ring-red-500" : ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alamat" className="text-left sm:text-right">
                Alamat
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="alamat"
                  value={employee.alamat}
                  onChange={(e) => {
                    setEmployee({ ...employee, alamat: e.target.value });
                    setFormValid({
                      ...formValid,
                      validAlamat: false,
                    });
                  }}
                  className={formValid.validAlamat ? "ring-4 ring-red-500" : ""}
                  placeholder="Alamat ..."
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alamat" className="text-left sm:text-right">
                Tanggal Lahir
              </Label>
              <div className="w-full sm:w-[250px] col-span-3">
                <DateTimePicker
                  value={employee.tanggalLahir}
                  onChange={(value) => {
                    setEmployee({
                      ...employee,
                      tanggalLahir: format(value, "yyyy-MM-dd") || "",
                    });
                    setFormValid({
                      ...formValid,
                      validTanggalLahir: false,
                    });
                  }}
                  format="yyyy-MM-dd"
                  placeholder="Select a date"
                  className={
                    formValid.validTanggalLahir ? "ring-4 ring-red-500" : ""
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tempatLahir" className="text-left sm:text-right">
                Tempat lahir
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="tempatLahir"
                  value={employee.tempatLahir}
                  onChange={(e) => {
                    setEmployee({ ...employee, tempatLahir: e.target.value });
                    setFormValid({
                      ...formValid,
                      validTempatLahir: false,
                    });
                  }}
                  className={
                    formValid.validTempatLahir ? "ring-4 ring-red-500" : ""
                  }
                  placeholder="Tempat lahir ..."
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
