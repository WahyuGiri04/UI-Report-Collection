"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Login } from "@/lib/service/login/login-service"
import { ToastError, ToastSuccess } from "../util/toast-util"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await Login({username, password})

    if(response.statusCode === 200){
      ToastSuccess(response.message)
      if(response.data?.token){
        Cookies.set("token", response.data.token, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
      }
      router.push("/dashboard/dashboard-default")
    } else {
      ToastError(response.message)
      setIsLoading(false);
    }

  }
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2 h-full w-full">
            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Welcome back</h1>
                        <p className="text-balance text-muted-foreground">
                        Login to your Jalin account
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                        id="username"
                        type="text"
                        placeholder="admin"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                            Forgot your password?
                        </a>
                        </div>
                        <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Logging in...</>) : ("Login")}
                    </Button>
                </div>
            </form>
            <div className="relative hidden md:flex items-center justify-center bg-muted h-full w-full rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src="/images/login-hero.svg"
                        alt="Image"
                        className="max-w-full max-h-full dark:brightness-[0.8] object-contain"
                    />
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
