// src/layouts/AgentLayout.tsx
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/user/AppSidebar"; // same sidebar component you used in UserLayout
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AgentLayout() {
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
