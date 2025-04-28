import { BaseResponse } from "@/lib/model/BaseResponse";
import { LoginForm } from "@/lib/model/Login";
import { LoginResponse } from "@/lib/model/LoginResponse";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function Login(form : LoginForm) : Promise<BaseResponse<LoginResponse>> {

    const response = await fetch(`${API_BASE_URL}auth/login`,
        {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('giri:giri')
            },
            body: JSON.stringify(form),
        }
    )
    
    return await response.json();
    
}