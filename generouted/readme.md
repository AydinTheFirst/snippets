### After adding generouted from cli you should update some files

main.tsx
```js
import { routes } from "@generouted/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { ErrorBoundaryLayout } from "@/components/ErrorBoundary"; // this is optional

// import "@/styles/tailwind.css";

const router = createBrowserRouter([
  {
    children: routes,
    element: <ErrorBoundaryLayout />, // you can delete this line if you dont want to use custom error boundary in your project
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

vite.config.js
```js
import Generouted from "@generouted/react-router/plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Generouted()], // plugin added
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
```
