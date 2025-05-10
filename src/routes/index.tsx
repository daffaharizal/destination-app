import MainLayout from "@/pages/layout";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { SettingPage } from "./content";

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
