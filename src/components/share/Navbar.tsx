import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";
import { ModeToggle } from "@/components/mode-toggle"; // ✅ Import toggle
import { useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Determine dashboard path
  const dashboardPath =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "agent"
      ? "/agent"
      : "/user";

  return (
    <header className="navbar-root bg-background shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Logo + NavLinks */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-2xl font-bold text-primary hover:text-primary/80 transition"
          >
            DigitalWallet
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-primary transition">
              About
            </Link>
            <Link to="/features" className="hover:text-primary transition">
              Features
            </Link>
            <Link to="/pricing" className="hover:text-primary transition">
              Pricing
            </Link>
            <Link to="/faq" className="hover:text-primary transition">
              FAQ
            </Link>
            <Link to="/contact" className="hover:text-primary transition">
              Contact
            </Link>
            <Link to="/guide-tour" className="hover:text-primary transition">
              Guide Tour
            </Link>
            {token && user && (
              <Link
                to={dashboardPath}
                className="hover:text-primary transition font-semibold"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        {/* Right: Dark Mode + Login/Logout */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Popover open={menuOpen} onOpenChange={setMenuOpen}>
            <PopoverTrigger asChild>
              <button
                className="p-2 rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="bg-popover text-popover-foreground shadow-lg rounded-lg p-4 flex flex-col space-y-3 w-52"
              side="bottom"
              align="end"
            >
              <Link
                to="/"
                className="hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/features"
                className="hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/faq"
                className="hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>

              {token && user && (
                <Link
                  to={dashboardPath}
                  className="hover:text-primary transition font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              {/* Dark Mode Toggle (closes menu after selection) */}
              <div onClick={() => setMenuOpen(false)}>
                <ModeToggle />
              </div>

              {token ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="mt-2 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition text-center"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="mt-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
