import { isAuthenticated } from "@/lib/utils";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
