import { BaseResponse } from "../model/BaseResponse";
import { Menu } from "../model/Menu";
import { GetToken } from "./token-service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function GetMenu() : Promise<BaseResponse<Menu[]>> {
    const token = GetToken()
    const response = await fetch(`${API_BASE_URL}admin/main-menu/get-main-menu`,
        {
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )

    return await response.json();
    
}