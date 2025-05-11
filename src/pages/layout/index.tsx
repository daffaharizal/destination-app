import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
  console.log(import.meta.env.VITE_BASE_URL);
  
  return (
    <div>
      <nav className="flex gap-4 p-4 bg-gray-100">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
