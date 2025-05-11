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
      <aside className="w-64 fixed top-0 left-0 h-full bg-white px-8 py-10 text-center shadow-md z-10 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4">Sidebar</h2>
          {/* Tambahkan menu lainnya di sini */}
        </div>
        <div>
          <Button variant={"danger"} className="text-red-500" onClick={handleLogoutAuthentication}>
            <LogOut /> Logout
          </Button>
        </div>
      </aside>
      <main className="ml-64 flex-1 min-h-screen overflow-auto p-6 bg-gray-50">
        <Outlet />
      </main>
    </>
  );
}
