import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NavbarRight } from "./navbar-right"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex flex-1 w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Jalin Pembayaran Nusantara</h1>
      </div>
      <div className="ml-auto px-4">
        <NavbarRight />
      </div>
    </header>
  )
}
