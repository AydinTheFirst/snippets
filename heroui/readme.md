### After running cli you should update some files

main.tsx
```js
// main.tsx or main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {HeroUIProvider} from '@heroui/react'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </React.StrictMode>,
)
```

or if you are using `@generouted/react-router`
src/pages/_app.tsx
```js
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <_ThemeProvider>
      <_HeroUIProvider>
        <Outlet />
      </_HeroUIProvider>
    </_ThemeProvider>
  );
}

function _ThemeProvider({ children }: React.PropsWithChildren) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}

function _HeroUIProvider({ children }: React.PropsWithChildren) {
  return (
    <HeroUIProvider>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </HeroUIProvider>
  );
}
```
