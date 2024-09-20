import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@generouted/react-router";
import { Toaster } from "sonner";

import "@/styles/globals.css";

import { ErrorBoundaryLayout } from "@/components";
import { Providers } from "@/provider";

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: routes,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
      <Toaster richColors />
    </Providers>
  </StrictMode>
);
