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
import { Menu } from "@/lib/model/Menu";
import { AddMenu, GetMenuById, UpdateMenu } from "@/lib/service/menu-service";
import { Loader2, PencilIcon, PlusCircleIcon, SaveIcon } from "lucide-react";
import { Combo } from "next/font/google";
import { useEffect, useState } from "react";
import { ComboboxMenuType } from "./combo-box";

export function Form({ title, id, onSuccess }: { title: string; id: number; onSuccess?: () => void; }) {

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuIcon, setMenuIcon] = useState("");
  const [menuTypeData, setMenuTypeData] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: Menu = {
      menuName: menuName,
      icon: menuIcon,
      menuType: Number(menuTypeData),
      url: url,
    };
    setIsLoading(true);
    if (id === 0) {
      const response = await AddMenu(data);
      if (response.statusCode === 200) {
        ToastSuccess(response.message)
        setIsLoading(false);
        onSuccess?.();
      } else {
        ToastError(response.message)
        setIsLoading(false);
      }
    } else {
      const response = await UpdateMenu(data, id);
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
    const response = await GetMenuById(id);
    if (response.data !== undefined) {
      setMenuName(response.data.menuName);
      setMenuIcon(response.data.icon);
      setMenuTypeData(String(response.data.menuType));
      setUrl(response.data.url);
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
            Data Parameter Roles
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role-name" className="text-right">
                Menu Name
              </Label>
              <Input id="role-name" value={menuName} onChange={(e) => setMenuName(e.target.value)} required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">
                Icon
              </Label>
              <Input id="icon" value={menuIcon} onChange={(e) => setMenuIcon(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="menu-type" className="text-right mt-2">
                Menu Type
              </Label>
              <ComboboxMenuType value={menuTypeData} onChange={setMenuTypeData} />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right mt-2">
                URL
              </Label>
              <Textarea id="description" value={url} onChange={(e) => setUrl(e.target.value)} required className="col-span-3" />
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
