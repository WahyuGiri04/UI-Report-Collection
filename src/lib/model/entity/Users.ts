import { Employee } from "./Employee";
import { Roles } from "./Roles";

export interface Users {
  id?: number;
  username?: string;
  password?: string;
  isDeleted?: string;
  employee?: Employee | null;
  roles?: Roles[] | null | undefined;
}
