import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout";
import {
  CategoryPage,
  CommentPage,
  DashboardPage,
  LoginPage,
  RegisterPage,
} from "./content";
import ProtectedRoute from "@/pages/auth/components/protected-route";
import RedirectIfAuthenticated from "@/pages/auth/components/redirect-if-authenticated";
import AuthSuspense from "@/pages/auth/components/auth-suspense";

const WithSuspense = (Component: React.ReactNode) => (
  <Suspense fallback={<div>Loading...</div>}>{Component}</Suspense>
);

const Router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: WithSuspense(<DashboardPage />),
          },
          {
            path: "dashboard",
            element: WithSuspense(<DashboardPage />),
          },
          {
            path: "comment",
            element: WithSuspense(<CommentPage />),
          },
          {
            path: "category",
            element: WithSuspense(<CategoryPage />),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <RedirectIfAuthenticated />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<AuthSuspense />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <RedirectIfAuthenticated />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<AuthSuspense />}>
            <RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default Router;
