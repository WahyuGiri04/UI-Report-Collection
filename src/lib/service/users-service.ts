import { BaseResponse } from "../model/view/BaseResponse";
import { Users } from "../model/entity/Users";
import { GetToken } from "./token-service";
import { UsersSearch } from "../model/view/UsersSearch";
import { BaseResponsePage } from "../model/view/BaseResponsePage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetUsersDetail(): Promise<BaseResponse<Users>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/users/get-user-detail`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function GetUserList(): Promise<BaseResponse<Users[]>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

export async function GetUsersPage(
  usersSearch: UsersSearch,
  pageNumber: number,
  rowPerPage: number
): Promise<BaseResponse<BaseResponsePage<Users[]>>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/users/search?page=${pageNumber}&pageSize=${rowPerPage}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(usersSearch),
    }
  );

  return await response.json();
}

export async function AddUsers(data: Users): Promise<BaseResponse<Users>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function ResetAccount(id: number): Promise<BaseResponse<Users>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/users/reset-account/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
}

export async function UpdateUsers(
  data: Users,
  id: number
): Promise<BaseResponse<Users>> {
  const token = GetToken();
  const response = await fetch(`${API_BASE_URL}admin/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function ChangeStatus(
  data: Users,
  id: number
): Promise<BaseResponse<Users>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/users/change-status/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
}

export async function DeleteUsers(id: number): Promise<BaseResponse<Users>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/users/delete-permanent/${id}`,
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

export async function GetUsersById(id: number): Promise<BaseResponse<Users>> {
  const token = GetToken();
  const response = await fetch(
    `${API_BASE_URL}admin/users/get-all-by-id/${id}`,
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
