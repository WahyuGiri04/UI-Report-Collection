import { AnimatedWave } from "@/components/animate/aminasi"
import { FooterBg } from "@/components/animate/footer-bg"
import { AppSidebar } from "@/components/menu/app-sidebar"
import { Header } from "@/components/header/header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      {/* <AppSidebar variant="floating" /> */}
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header/>
        <div className="rounded-md w-full h-full p-1">
          <div className="relative rounded-md  mt-1 w-full space-y-2" style={{ height: 'calc(100vh - 64px - 16px)', display: 'flex', flexDirection: 'column' }}>
            <div className="pt-24 p-8 absolute rounded-md z-40">
              <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                  <p className="uppercase tracking-loose w-full">PT. Jalin Pembayaran Nusantara</p>
                  <h1 className="my-4 text-5xl font-bold leading-tight">
                    Report Cashback
                  </h1>
                  <p className="leading-normal text-2xl mb-8">
                    Sub-hero message, not too long and not too short. Make it just right!
                  </p>
                </div>
                <div className="w-full md:w-3/5 py-6 text-center">
                  <img className="w-[250px] h-[250px] md:h-[450px] md:w-4/5 z-50 mx-auto" src="/images/hero1-black.svg" />
                </div>
              </div>
            </div>
            <div className="rounded-md absolut z-2" style={{ marginTop: 'auto', overflow: 'hidden' }}>
              {/* <FooterBg/> */}
              <AnimatedWave/>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
