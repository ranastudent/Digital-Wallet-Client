import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  ArrowUp,
  ArrowDown,
  DollarSign,
  User,
  List,
  LogOut,
  BarChart,
  Wallet,
  Users,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { type RootState } from "@/redux/store";
import { ModeToggle } from "@/components/mode-toggle"; // ✅ Added

// User sidebar items
const userItems = [
  { title: "Dashboard", url: "/user", icon: Home },
  { title: "Deposit", url: "/user/deposit", icon: DollarSign },
  { title: "Withdraw", url: "/user/withdraw", icon: ArrowDown },
  { title: "Send Money", url: "/user/send", icon: ArrowUp },
  { title: "Transactions", url: "/user/transactions", icon: List },
  { title: "Profile", url: "/user/profile", icon: User },
];

// Agent sidebar items
const agentItems = [
  { title: "Overview", url: "/agent", icon: BarChart },
  { title: "Cash In", url: "/agent/cashin", icon: DollarSign },
  { title: "Cash Out", url: "/agent/cashout", icon: Wallet },
  { title: "Profile", url: "/agent/profile", icon: User },
];

// Admin sidebar items
const adminItems = [
  { title: "Dashboard", url: "/admin", icon: BarChart },
  { title: "Transactions", url: "/admin/transactions", icon: List },
  { title: "Manage Agents", url: "/admin/agents", icon: Users },
  { title: "Manage Users", url: "/admin/users", icon: Users },
  { title: "Profile", url: "/admin/profile", icon: User },
  { title: "SystemFee", url: "/admin/system", icon: Settings },
];

export function AppSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.user?.role);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const items =
    role === "agent" ? agentItems : role === "admin" ? adminItems : userItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 space-y-2">
        <div className=" py-2">
          <ModeToggle /> {/* ✅ Theme toggle */}
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-red-100"
        >
          <LogOut />
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
