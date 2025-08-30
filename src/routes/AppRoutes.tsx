import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AgentLayout from "@/layouts/AgentLayout";
import UserLayout from "@/layouts/UserLayout";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Features from "../pages/Features";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import Pricing from "../pages/Pricing";

// Auth
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

// Route guards
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// Dashboards
import UserDashboard from "../features/user/UserDashboard";
import Deposit from "@/features/user/Deposit";
import SendMoney from "@/features/user/SendMoney";
import TransactionHistory from "@/features/user/Transactions/TransactionHistory";
import Profile from "@/features/common/Profile";

import AgentDashboard from "@/features/agent/Dashboard/Dashboard";
import AdminDashboard from "../features/admin/Dashboard/Dashboard";
import WithdrawMoney from "@/features/common/WithdrawMoney";
import CashIn from "@/features/agent/CashIn";
import CashOut from "@/features/agent/CashOut";

// Admin pages

import Agent from "@/features/admin/agent/Agent";
import Users from "@/features/admin/Users/Users";
import Transactions from "@/features/admin/Transactions/Transactions";
import SystemFee from "@/features/sysytem/SystemFee";
import GuideTour from "@/guideTour/GuideTour";

const AppRoutes = () => (
  <Routes>
    {/* Public pages for unauthenticated users only */}
    <Route element={<PublicRoute />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    {/* Public pages accessible to everyone */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/guide-tour" element={<GuideTour />} /> 
    </Route>

    {/* User dashboard with sidebar */}
    <Route element={<PrivateRoute roles={["user"]} />}>
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="withdraw" element={<WithdrawMoney />} />
        <Route path="send" element={<SendMoney />} />
        <Route path="transactions" element={<TransactionHistory />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>

    {/* Agent dashboard */}
    <Route element={<PrivateRoute roles={["agent"]} />}>
      <Route path="/agent" element={<AgentLayout />}>
        <Route index element={<AgentDashboard />} />
        <Route path="cashin" element={<CashIn />} />
        <Route path="cashout" element={<CashOut />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>

    {/* Admin dashboard */}
    <Route element={<PrivateRoute roles={["admin"]} />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="agents" element={<Agent />} />
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
        <Route path="system" element={<SystemFee />} />
      </Route>
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
