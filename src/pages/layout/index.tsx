import { Button } from "@/components/ui/button";
import { DOCUMENT_ID, EMAIL, ID_USER, TOKEN, USERNAME } from "@/lib";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();
  
  const handleLogoutAuthentication = () => {
    sessionStorage.clear();
    navigate("login");
  }
  
  return (
    <div>
      <nav className="flex gap-4 p-4 bg-gray-100">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/register">Register</NavLink>
        <Button onClick={handleLogoutAuthentication}>
          Logout
        </Button>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
