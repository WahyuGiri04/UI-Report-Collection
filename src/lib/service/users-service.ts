import { BaseResponse } from "../model/BaseResponse";
import { Users } from "../model/Users";
import { GetToken } from "./token-service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function GetUsersDetail() : Promise<BaseResponse<Users>> {
    const token = GetToken();
    const response = await fetch(`${API_BASE_URL}admin/users/get-user-detail`,
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