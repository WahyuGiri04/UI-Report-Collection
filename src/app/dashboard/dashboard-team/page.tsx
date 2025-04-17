import { AppSidebar } from "@/components/menu/app-sidebar"
import { Header } from "@/components/header/header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header/>
        <div className="rounded-md w-full h-full p-1">
          <div className="bg-backgroud rounded-md mt-1 w-full overflow-y-auto p-1 space-y-2" style={{ height: 'calc(100vh - 64px - 16px)' }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="bg-white p-2 rounded items-center text-center">
                Item {i + 1}
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
