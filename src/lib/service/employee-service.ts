import { Employee } from "../model/entity/Employee";
import { BaseResponse } from "../model/view/BaseResponse";
import { BaseResponsePage } from "../model/view/BaseResponsePage";
import { EmployeeSearch } from "../model/view/EmployeeSearch";
import { GetToken } from "./token-service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetEmployeeList(): Promise<BaseResponse<Employee[]>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/employee`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function GetEmployeePage(
  employeeSearch: EmployeeSearch,
  pageNumber: number,
  rowPerPage: number
): Promise<BaseResponse<BaseResponsePage<Employee[]>>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/employee/search?page=${pageNumber}&pageSize=${rowPerPage}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employeeSearch),
    }
  );

  return await response.json();
}

export async function AddEmployee(
  data: Employee
): Promise<BaseResponse<Employee>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function UpdateEmployee(
  data: Employee,
  id: number
): Promise<BaseResponse<Employee>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/employee/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function DeleteEmployee(
  id: number
): Promise<BaseResponse<Employee>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/employee/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

export async function GetEmployeeById(id: number): Promise<BaseResponse<Employee>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/employee/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}
