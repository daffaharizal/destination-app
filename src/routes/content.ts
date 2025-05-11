import { lazy } from "react";

export const DashboardPage = lazy(() => import("@pages/dashboard"))
export const RegisterPage = lazy(() => import("@pages/auth/register"));
export const LoginPage = lazy(() => import("@pages/auth/login"));
