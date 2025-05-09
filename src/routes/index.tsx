import MainLayout from "@/pages/layout";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const SettingPage = lazy(() => import("@/pages/setting/main"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/setting",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SettingPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default Router;
