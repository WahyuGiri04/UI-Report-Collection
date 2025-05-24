import { UsersRole } from "../model/entity/UsersRole";
import { BaseResponse } from "../model/view/BaseResponse";
import { BaseResponsePage } from "../model/view/BaseResponsePage";
import { GetToken } from "./token-service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetUsersRoleList(): Promise<BaseResponse<UsersRole[]>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/users-role`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

export async function GetUsersRolePage(
  userId: string,
  roleId: string,
  pageNumber: number,
  rowPerPage: number
): Promise<BaseResponse<BaseResponsePage<UsersRole[]>>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/users-role/search?userId=${userId}&roleId=${roleId}&page=${pageNumber}&pageSize=${rowPerPage}`,
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

export async function AddUsersRole(
  data: UsersRole
): Promise<BaseResponse<UsersRole>> {
  const token = GetToken();
  console.log(data);
  const response = await fetch(`${API_BASE_URL}admin/users-role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function UpdateUsersRole(
  data: UsersRole,
  id: number
): Promise<BaseResponse<UsersRole>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/users-role/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function DeleteUsersRole(
  id: number
): Promise<BaseResponse<UsersRole>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/users-role/delete-permanent/${id}`,
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

export async function GetUsersRoleById(
  id: number
): Promise<BaseResponse<UsersRole>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/users-role/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}
