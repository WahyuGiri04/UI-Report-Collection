import { Employee } from "./Employee"

export interface Users {
    id : number
    username : string
    password : string
    employee : Employee | null
}