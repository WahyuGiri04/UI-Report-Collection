import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login/login-form-2"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            PT. Jalin Pembayaran Nusantara
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden md:flex items-center justify-center bg-muted h-full w-full rounded-lg overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
        <img
            src="/images/login-hero.svg"
            alt="Image"
            className="max-w-full max-h-full dark:brightness-[0.2] dark:grayscale object-contain"
        />
    </div>
</div>
    </div>
  )
}
