import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/user/AppSidebar";

export default function UserLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="ml-14 p-6">
        <SidebarTrigger />
        {/* This will render nested routes like Dashboard, Deposit, Withdraw */}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
