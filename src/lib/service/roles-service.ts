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
  page: number,
  pageSize: number
): Promise<BaseResponse<BaseResponsePage<Roles[]>>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/roles/page?page=${page}&pageSize=${pageSize}`,
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
