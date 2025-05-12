import { useState } from "react";
import { ChartNoAxesGantt, LogOut, Menu, Text, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("login");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">Travel Platform</h1>

        {/* Navigation - Center */}
        <div className="hidden md:flex items-center bg-blue-50 rounded-full p-1.5">
          <Button
            variant={
              pathname === "/dashboard" ? "tabToggleActive" : "tabToggleBase"
            }
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            variant={
              pathname === "/comment" ? "tabToggleActive" : "tabToggleBase"
            }
            onClick={() => navigate("/comment")}
          >
            Comment
          </Button>
        </div>

        <div className="hidden md:block group">
          <Button
            variant={"danger"}
            className="text-red-500"
            onClick={handleLogout}
          >
            Logout
            <LogOut className="transition-all duration-200 transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={
              " text-blue-500 hover:border-1 hover:border-white bg-transparent"
            }
          >
            {menuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Text className="w-7 h-7 rotate-180" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2">
          <Button
            onClick={() => setActiveTab("login")}
            className="bg-blue-100 text-blue-700 hover:text-white px-4 py-2 rounded"
          >
            Login
          </Button>
          <Button
            onClick={() => setActiveTab("register")}
            className="bg-blue-100 text-blue-700 hover:text-white px-4 py-2 rounded"
          >
            Register
          </Button>
          <Button
            variant={"danger"}
            className="text-red-500 mt-2 group"
            onClick={handleLogout}
          >
            Logout
            <LogOut className="transition-all duration-200 transform group-hover:translate-x-0.5 group-focus:translate-x-0.5" />
          </Button>
        </div>
      )}
    </nav>
  );
}
