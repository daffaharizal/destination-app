import { lazy } from "react";

export const DashboardPage = lazy(() => import("@pages/dashboard"))
export const RegisterPage = lazy(() => import("@pages/register"));
export const LoginPage = lazy(() => import("@pages/login"));
