// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/user/AppSidebar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex-1 ml-14 p-6">
          {/* Sidebar trigger (hamburger menu) */}
          <SidebarTrigger />

          {/* Nested Routes */}
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
