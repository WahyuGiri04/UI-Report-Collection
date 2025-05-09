import { AppSidebar } from "@/components/menu/app-sidebar"
import { ChartAreaInteractive } from "@/components/menu/chart-area-interactive"
import { SectionCards } from "@/components/menu/section-cards"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import data from "./data.json"
import { Header } from "@/components/header/header"
import { DataTable } from "@/components/menu/data-table"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="floating" />
      <SidebarInset >
        <Header />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
