import { BaseResponse } from "../model/BaseResponse";
import { BaseResponsePage } from "../model/BaseResponsePage";
import { SubMenu } from "../model/SubMenu";
import { GetToken } from "./token-service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function GetSubMenuPage(subMenuName: string, mainMenuId: number, pageNumber: number, rowPerPage: number): Promise<BaseResponse<BaseResponsePage<SubMenu[]>>> {
    const token = GetToken()
    const response = await fetch(`${API_BASE_URL}admin/sub-menu/search?subMenuName=${subMenuName}&mainMenuId=${mainMenuId}&page=${pageNumber}&pageSize=${rowPerPage}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )

    return await response.json();
}

export async function AddSubMenu(data: SubMenu): Promise<BaseResponse<SubMenu>> {
    const token = GetToken()
    const response = await fetch(`${API_BASE_URL}admin/sub-menu`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
    )

    return await response.json();
}

export async function UpdateSubMenu(data: SubMenu, id: number): Promise<BaseResponse<SubMenu>> {
    const token = GetToken()
    const response = await fetch(`${API_BASE_URL}admin/sub-menu/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
    )

    return await response.json();
}

export async function DeleteSubMenu(id: number): Promise<BaseResponse<SubMenu>> {
    const token = GetToken()
    const response = await fetch(`${API_BASE_URL}admin/sub-menu/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )

    return await response.json();
}

export async function GetSubMenuById(id: number): Promise<BaseResponse<SubMenu>> {
    const token = GetToken()
    const response = await fetch(`${API_BASE_URL}admin/sub-menu/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )

    return await response.json();
}