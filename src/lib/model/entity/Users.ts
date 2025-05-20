import { Employee } from "./Employee";
import { Roles } from "./Roles";

export interface Users {
  id?: number;
  username?: string;
  password?: string;
  employee?: Employee | null;
  roles?: Roles | null;
}
