import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./SideBar";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-[rgb(246,247,248)] w-screen">
        <Navbar />
        <div
          className={`bg-[rgb(246,247,248)] h-[calc(100%-4.7919rem)] ${
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
