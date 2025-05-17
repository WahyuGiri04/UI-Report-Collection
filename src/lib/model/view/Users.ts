import { Employee } from "../entity/Employee";

export interface Users {
  id: number;
  username: string;
  password: string;
  employee: Employee | null;
}
