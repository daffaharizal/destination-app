import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout";
import { DashboardPage, LoginPage, RegisterPage } from "./content";

const WithSuspense = (Component: React.ReactNode) => (
  <Suspense fallback={<div>Loading...</div>}>{Component}</Suspense>
);

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: WithSuspense(<DashboardPage />)
      },
    ],
  },
  {
    path: "/register",
    element: WithSuspense(<RegisterPage />)
  },
  {
    path: "/login",
    element: WithSuspense(<LoginPage />)
  },
]);

export default Router;
