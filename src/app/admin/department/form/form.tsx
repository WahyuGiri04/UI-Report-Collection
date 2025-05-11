import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { ToastError, ToastSuccess } from "@/components/util/toast-util";
import { Department } from "@/lib/model/Departement";
import { AddDepartments, GetDepartmentsById, UpdateDepartments } from "@/lib/service/department-service";
import { Loader2, PencilIcon, PlusCircleIcon, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function FormDepartment({ title, id, onSuccess }: { title: string; id: number; onSuccess?: () => void; }) {

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: Department = {
      departmentName: departmentName,
      description: departmentDescription,
    };
    setIsLoading(true);
    if (id === 0) {
      const response = await AddDepartments(data);
      if (response.statusCode === 200) {
        ToastSuccess(response.message)
        setIsLoading(false);
        onSuccess?.();
      } else {
        ToastError(response.message)
        setIsLoading(false);
      }
    } else {
      const response = await UpdateDepartments(data, id);
      if (response.statusCode === 200) {
        ToastSuccess(response.message)
        setIsLoading(false);
        onSuccess?.();
      } else {
        ToastError(response.message)
        setIsLoading(false);
      }
    }
    setOpen(false);
  };

  if (id !== 0) {
    useEffect(() => {
      fetchData(id);
    }, []);
  }

  const fetchData = async (id: number) => {
    const response = await GetDepartmentsById(id);
    if (response.data !== undefined) {
      setDepartmentName(response.data.departmentName);
      setDepartmentDescription(response.data.description);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {id === 0 ? (
          <Button className="">
            <PlusCircleIcon />
            {title}
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <PencilIcon />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Data Parameter Department
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department-name" className="text-right">
                Department Name
              </Label>
              <Input id="department-name" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right mt-2">
                Description
              </Label>
              <Textarea id="description" value={departmentDescription} onChange={(e) => setDepartmentDescription(e.target.value)} required className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving data ...</>) : (<><SaveIcon /> Save Data</>)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
