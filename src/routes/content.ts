import { lazy } from "react";

export const DashboardPage = lazy(() => import("@pages/dashboard"));
export const RegisterPage = lazy(() => import("@pages/auth/register"));
export const LoginPage = lazy(() => import("@pages/auth/login"));
export const CommentPage = lazy(() => import("@pages/comment"));
export const CategoryPage = lazy(() => import("@/pages/category"));
export const SuspensePage = lazy(() => import("@/components/molecules/suspense-page"))
