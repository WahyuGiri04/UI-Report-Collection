import { RoleMenu } from "../model/entity/RoleMenu";
import { BaseResponse } from "../model/view/BaseResponse";
import { BaseResponsePage } from "../model/view/BaseResponsePage";
import { GetToken } from "./token-service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetRoleMenuList(): Promise<BaseResponse<RoleMenu[]>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/role-menu`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

export async function GetRoleMenuPage(
  mainMenuId: string,
  roleId: string,
  pageNumber: number,
  rowPerPage: number
): Promise<BaseResponse<BaseResponsePage<RoleMenu[]>>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/role-menu/search?mainMenuId=${mainMenuId}&roleId=${roleId}&page=${pageNumber}&pageSize=${rowPerPage}`,
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

export async function AddRoleMenu(
  data: RoleMenu
): Promise<BaseResponse<RoleMenu>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/role-menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function UpdateRoleMenu(
  data: RoleMenu,
  id: number
): Promise<BaseResponse<RoleMenu>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/role-menu/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function DeleteRoleMenu(
  id: number
): Promise<BaseResponse<RoleMenu>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/role-menu/delete-permanent/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
}

export async function GetMenuById(id: number): Promise<BaseResponse<RoleMenu>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/role-menu/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}
