import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();

  const handleLogoutAuthentication = () => {
    sessionStorage.clear();
    navigate("login");
  };

  return (
    <>
      <aside className="w-64 fixed top-0 left-0 h-full bg-white p-8 text-center shadow-md z-10">
        <Button variant={"logout"} className="bottom-0">
          <LogOut /> Logout
        </Button>
      </aside>
      <main className="ml-64 flex-1 min-h-screen overflow-auto p-6 bg-gray-50">
        <Outlet />
      </main>
    </>
  );
}
