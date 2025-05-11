import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout";
import { DashboardPage, LoginPage, RegisterPage } from "./content";
import ProtectedRoute from "@/components/auth/protected-route";
import RedirectIfAuthenticated from "@/components/auth/redirect-if-authenticated";

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
            path: "dashboard",
            element: WithSuspense(<DashboardPage />),
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
        element: WithSuspense(<LoginPage />),
      },
    ],
  },
  {
    path: "/register",
    element: <RedirectIfAuthenticated />,
    children: [
      {
        index: true,
        element: WithSuspense(<RegisterPage />),
      },
    ],
  },
]);

export default Router;
