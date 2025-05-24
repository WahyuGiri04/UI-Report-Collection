import { Roles } from "./Roles";
import { Users } from "./Users";

export interface UsersRole {
  id?: number;
  roleId?: Roles;
  userId?: Users;
}
