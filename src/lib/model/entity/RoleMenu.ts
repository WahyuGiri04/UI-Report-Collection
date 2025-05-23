import { Menu } from "./Menu";
import { Roles } from "./Roles";

export interface RoleMenu {
  id?: number;
  roleId?: Roles;
  mainMenuId?: Menu;
}
