import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SafeDynamicIcon } from "@/components/util/safe-dynamic-icon";
import { Employee } from "@/lib/model/entity/Employee";
import { GetEmployeeById } from "@/lib/service/employee-service";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

type DetailProp = {
  id: number;
};

export function DialogDetail({ id }: DetailProp) {
  const [employee, setEpmloyee] = useState<Employee>();

  useEffect(() => {
    fetchDetail(id);
  }, [id]);

  const fetchDetail = async (id: number) => {
    const response = await GetEmployeeById(id);
    if (response.data !== undefined) {
      setEpmloyee(response.data);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
          size="icon"
        >
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] w-full">
        <DialogHeader>
          <DialogTitle>Detail</DialogTitle>
          <DialogDescription>Detail data Employee</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
          <Label htmlFor="NIP" className="text-left">
            NIP
          </Label>
          <Input
            className="col-span-3 w-full"
            disabled
            id="NIP"
            value={employee?.nip}
          />
          <Label htmlFor="Name" className="text-left">
            Name
          </Label>
          <Input
            className="col-span-3 w-full"
            disabled
            id="Name"
            value={employee?.fullName}
          />
          <Label htmlFor="Alamat" className="text-left">
            Alamat
          </Label>
          <Textarea
            className="col-span-3 w-full"
            disabled
            id="Alamat"
            value={employee?.alamat}
          />
          <Label htmlFor="NIP" className="text-left">
            Gender
          </Label>
          <Label className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3 col-span-3 w-full sm:w-[200px]">
            <SafeDynamicIcon
              color={employee?.gender === "L" ? "red" : "blue"}
              name={employee?.gender === "L" ? "mars" : "venus"}
            />
            <span>{employee?.gender === "L" ? "Laki-laki" : "Perempuan"}</span>
          </Label>
          <Label htmlFor="Email" className="text-left">
            Email
          </Label>
          <Input
            className="col-span-3 w-full"
            disabled
            id="Email"
            value={employee?.email}
          />
          <Label htmlFor="tanggalLahir" className="text-left">
            Tanggal Lahir
          </Label>
          <Input
            className="col-span-3 w-full"
            disabled
            id="tanggalLahir"
            value={employee?.tanggalLahir}
          />
          <Label htmlFor="tempatLahir" className="text-left">
            Tempat Lahir
          </Label>
          <Input
            className="col-span-3 w-full"
            disabled
            id="tempatLahir"
            value={employee?.tempatLahir}
          />
          <Label htmlFor="department" className="text-left">
            Department
          </Label>
          {/* <Label htmlFor="department" className="col-span-3">
            {employee?.departement?.departmentName}
          </Label> */}
          <Input
            className="col-span-3 w-full"
            disabled
            id="department"
            value={employee?.departement?.departmentName}
          />
        </div>
        <DialogFooter className="sm:justify-end mt-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              className="bg-red-500 text-white"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
