import { BaseResponse } from "../model/BaseResponse";
import { BaseResponsePage } from "../model/BaseResponsePage";
import { Roles } from "../model/Roles";
import { GetToken } from "./token-service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetRoles(): Promise<BaseResponse<Roles[]>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function GetRolesPage(
  roleName: string,
  page: number,
  pageSize: number
): Promise<BaseResponse<BaseResponsePage<Roles[]>>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/roles/search?roleName=${roleName}&page=${page}&pageSize=${pageSize}`,
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


export async function AddRoles(roles: Roles): Promise<BaseResponse<Roles>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(roles),
  });
  return await response.json();
}

export async function GetRolesById(id: number): Promise<BaseResponse<Roles>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/roles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function DeleteRoles(id: number): Promise<BaseResponse<Roles>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/roles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function UpdateRoles(roles: Roles, id: number): Promise<BaseResponse<Roles>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/roles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(roles),
  });
  return await response.json();
}
