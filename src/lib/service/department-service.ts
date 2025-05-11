import { BaseResponse } from "../model/BaseResponse";
import { BaseResponsePage } from "../model/BaseResponsePage";
import { Department } from "../model/Departement";
import { GetToken } from "./token-service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function GetDepartments(): Promise<BaseResponse<Department[]>> {
    const token = GetToken();
    const response = await fetch(`${API_BASE_URL}admin/departements`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}

export async function GetDepartmentsPage(
    departmentName: string,
    page: number,
    pageSize: number
): Promise<BaseResponse<BaseResponsePage<Department[]>>> {
    const token = GetToken();
    const response = await fetch(
        `${API_BASE_URL}admin/departements/search?departmentName=${departmentName}&page=${page}&pageSize=${pageSize}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return await response.json();
}

export async function AddDepartments(department: Department): Promise<BaseResponse<Department>> {
    const token = GetToken();
    const response = await fetch(`${API_BASE_URL}admin/departements`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(department),
    });
    return await response.json();
}

export async function GetDepartmentsById(id: number): Promise<BaseResponse<Department>> {
    const token = GetToken();
    const response = await fetch(`${API_BASE_URL}admin/departements/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}

export async function UpdateDepartments(department: Department, id : number): Promise<BaseResponse<Department>> {
    const token = GetToken();
    const response = await fetch(`${API_BASE_URL}admin/departements/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(department),
    });
    return await response.json();
}

export async function DeleteDepartments(id: number): Promise<BaseResponse<Department>> {
    const token = GetToken();
    const response = await fetch(`${API_BASE_URL}admin/departements/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}