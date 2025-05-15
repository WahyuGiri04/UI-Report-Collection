import { BaseResponse } from "../model/BaseResponse";
import { BaseResponsePage } from "../model/BaseResponsePage";
import { Menu } from "../model/Menu";
import { GetToken } from "./token-service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetMenu(): Promise<BaseResponse<Menu[]>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/main-menu/get-main-menu`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

export async function GetMenuList(): Promise<BaseResponse<Menu[]>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/main-menu`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

export async function GetMenuPage(
  menuName: string,
  menuType: string,
  pageNumber: number,
  rowPerPage: number
): Promise<BaseResponse<BaseResponsePage<Menu[]>>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/main-menu/search?mainMenuName=${menuName}&menuType=${menuType}&page=${pageNumber}&pageSize=${rowPerPage}`,
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

export async function AddMenu(data: Menu): Promise<BaseResponse<Menu>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/main-menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function UpdateMenu(
  data: Menu,
  id: number
): Promise<BaseResponse<Menu>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/main-menu/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function DeleteMenu(id: number): Promise<BaseResponse<Menu>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/main-menu/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

export async function GetMenuById(id: number): Promise<BaseResponse<Menu>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/main-menu/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}
