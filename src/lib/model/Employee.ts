import { Department } from "./Departement"

export interface Employee {
    id : number
    nip : string
    firstName : string
    lastName : string
    fullName : string
    gender : string
    alamat : string
    tanggalLahir : string
    tempatLahir : string
    email : string
    department : Department | null
}
