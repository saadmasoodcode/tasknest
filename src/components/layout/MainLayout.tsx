import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./SideBar";
import { useIsMobile } from "@/hooks/use-mobile";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-[rgb(246,247,248)] w-screen p-5">
        {useIsMobile() ? <SidebarTrigger className="" /> : ""}
        <div
          className={`bg-[rgb(246,247,248)] h-[calc(100%-1.25rem)] ${
            useIsMobile() ? "w-full" : "w-[calc(100vw-18.50rem)]"
          }`}
        >
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
