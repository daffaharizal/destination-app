import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";

export default function MainLayout() {
  const navigate = useNavigate();

  const handleLogoutAuthentication = () => {
    sessionStorage.clear();
    navigate("login");
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen overflow-auto p-6 bg-gray-50">
        <Outlet />
      </main>
    </>
  );
}
