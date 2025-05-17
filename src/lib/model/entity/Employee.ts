

export interface Employee {
  id?: number
  nip?: string
  firstName: string
  lastName: string
  fullName: string
  gender: string
  alamat: string
  tanggalLahir: string
  tempatLahir: string
  email: string
  departement: Departement | null
}

  
export interface Departement {
  id?: number;
  departmentName: string;
  description: string;
}
