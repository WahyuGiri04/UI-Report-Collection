import { Badge } from "@/components/ui/badge";
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
import { Users } from "@/lib/model/entity/Users";
import { GetEmployeeById } from "@/lib/service/employee-service";
import { GetUsersById } from "@/lib/service/users-service";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

type DetailProp = {
  id: number;
};

export function DialogDetail({ id }: DetailProp) {
  const [data, setData] = useState<Users>();

  useEffect(() => {
    fetchDetail(id);
  }, []);

  const fetchDetail = async (id: number) => {
    const response = await GetUsersById(id);
    if (response.data !== undefined) {
      setData(response.data);
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
          <DialogDescription>Detail data Users</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
          <Label htmlFor="NIP" className="text-left">
            Username
          </Label>
          <Input
            className="col-span-3 w-full"
            disabled
            id="NIP"
            value={data?.username}
          />
          <Label htmlFor="NIP" className="text-left">
            NIP
          </Label>
          <Input
            className="col-span-3 w-full"
            disabled
            id="NIP"
            value={data?.employee?.nip}
          />
          <Label htmlFor="Name" className="text-left">
            Name
          </Label>
          <Input
            className="col-span-3 w-full"
            disabled
            id="Name"
            value={data?.employee?.fullName}
          />
          <Label htmlFor="Name" className="text-left">
            Email
          </Label>
          <Input
            className="col-span-3 w-full"
            disabled
            id="Name"
            value={data?.employee?.email}
          />
          <Label htmlFor="department" className="text-left">
            Department
          </Label>
          <Input
            className="col-span-3 w-full"
            disabled
            id="department"
            value={data?.employee?.departement?.departmentName}
          />
          <Label htmlFor="department" className="text-left">
            Role
          </Label>
          {data?.roles && data.roles.length > 0 ? (
            <div className="col-span-3 w-full">
              {data.roles.map((role: any, idx: number) => {
                const isAdmin = role.roleName?.toLowerCase().includes("admin");
                return (
                  <Badge
                    key={idx}
                    variant={isAdmin ? "destructive" : "secondary"}
                  >
                    {role.roleName}
                  </Badge>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">-</p>
          )}
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
