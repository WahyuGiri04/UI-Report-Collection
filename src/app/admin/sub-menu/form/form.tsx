import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastError, ToastSuccess } from "@/components/util/toast-util";
import { Menu } from "@/lib/model/Menu";
import { AddMenu, GetMenuById, UpdateMenu } from "@/lib/service/menu-service";
import { Loader2, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { ComboboxIcon } from "../../../../components/util/combo-box-icon";
import { ComboboxMainMenu } from "./combo-box-main-menu";
import { SubMenu } from "@/lib/model/SubMenu";
import {
  AddSubMenu,
  GetSubMenuById,
  UpdateSubMenu,
} from "@/lib/service/sub-menu-service";

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
  const [subMenuName, setSubMenuName] = useState("");
  const [menuIcon, setMenuIcon] = useState("");
  const [mainMenuId, setMainMenuId] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (id === 0) {
      setSubMenuName("");
      setMenuIcon("");
      setMainMenuId("");
      setUrl("");
    } else {
      fetchData(id);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: SubMenu = {
      subMenuName: subMenuName,
      icon: menuIcon,
      mainMenuId: {
        id: Number(mainMenuId),
      },
      url: url,
    };
    setIsLoading(true);
    if (id === 0) {
      const response = await AddSubMenu(data);
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
      const response = await UpdateSubMenu(data, id);
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
    setSubMenuName("");
    setMenuIcon("");
    setMainMenuId("");
    setUrl("");
  };

  const fetchData = async (subMenuId: number) => {
    setIsLoading(true);
    const response = await GetSubMenuById(subMenuId);
    if (response.data !== undefined) {
      setSubMenuName(response.data.subMenuName);
      setMenuIcon(response.data.icon);
      setMainMenuId(String(response.data.mainMenuId?.id));
      setUrl(response.data.url);
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
              <Label
                htmlFor="sub-menu-name"
                className="text-left sm:text-right"
              >
                Sub Menu Name
              </Label>
              <Input
                id="sub-menu-name"
                value={subMenuName}
                onChange={(e) => setSubMenuName(e.target.value)}
                required
                className="col-span-3"
                placeholder="Sub Menu Name ..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-left sm:text-right">
                Icon
              </Label>
              <div className="col-span-3">
                <ComboboxIcon value={menuIcon} onChange={setMenuIcon} />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="menu-type" className="text-left sm:text-right">
                Menu Type
              </Label>
              <div className="col-span-3">
                <ComboboxMainMenu value={mainMenuId} onChange={setMainMenuId} />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-left sm:text-right">
                URL
              </Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="col-span-3"
                placeholder="URL ..."
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
