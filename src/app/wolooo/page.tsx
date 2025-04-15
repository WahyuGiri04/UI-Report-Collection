import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header/header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Image } from "@radix-ui/react-avatar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header/>
        <div className="rounded-md w-full h-full p-1">
          <div className="rounded-md mt-1 w-full p-1 space-y-2" style={{ height: 'calc(100vh - 64px - 16px)' }}>
            {/* <img className="h-full" src="/image.png"/> */}
            <div className="grid  md:grid-cols-2 h-full">
              <div className="aspect-square grid grid-rows-2 grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <div className=" rounded-md bg-red-500 h-full col-span-2" />
                <div className="aspect-square rounded-md bg-blue-300 h-full" />
                <div className="aspect-square rounded-md bg-yellow-300 h-full" />
              </div>
              <div className="aspect-square rounded-md">
                <img className="h-full" src="/image.png"/>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
