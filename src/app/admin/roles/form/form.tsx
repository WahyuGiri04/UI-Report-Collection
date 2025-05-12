import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastError, ToastSuccess } from "@/components/util/toast-util";
import { Loader2, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { ComboboxIcon } from "../../../../components/util/combo-box-icon";
import { Roles } from "@/lib/model/Roles";
import { AddRoles, GetRolesById, UpdateRoles } from "@/lib/service/roles-service";

export function Form({ title, id, onSuccess }: { title: string; id: number; onSuccess?: () => void; }) {
  const [isLoading, setIsLoading] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleIcon, setRoleIcon] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id === 0) {
      setRoleName("");
      setRoleIcon("");
      setDescription("");
    } else {
      fetchData(id);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: Roles = {
      roleName: roleName,
      icon: roleIcon,
      description: description,
    };
    setIsLoading(true);
    if (id === 0) {
      const response = await AddRoles(data);
      if (response.statusCode === 200) {
        ToastSuccess(response.message)
        setIsLoading(false);
        resetForm();
        onSuccess?.();
      } else {
        ToastError(response.message)
        setIsLoading(false);
      }
    } else {
      const response = await UpdateRoles(data, id);
      if (response.statusCode === 200) {
        ToastSuccess(response.message)
        setIsLoading(false);
        resetForm();
        onSuccess?.();
      } else {
        ToastError(response.message)
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setRoleName("");
    setRoleIcon("");
    setDescription("");
  };

  const fetchData = async (roleId: number) => {
    setIsLoading(true);
    const response = await GetRolesById(roleId);
    if (response.data !== undefined) {
      setRoleName(response.data.roleName);
      setRoleIcon(response.data.icon);
      setDescription(response.data.description);
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
              <Label htmlFor="role-name" className="text-left sm:text-right">
                Role Name
              </Label>
              <Input
                id="role-name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-left sm:text-right">
                Icon
              </Label>
              <div className="col-span-3">
                <ComboboxIcon value={roleIcon} onChange={setRoleIcon} />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-left sm:text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="col-span-3"
              />
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