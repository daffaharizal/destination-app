import { isAuthenticated } from "@/lib/utils";
import { Navigate, Outlet } from "react-router-dom";

export default function RedirectIfAuthenticated() {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
