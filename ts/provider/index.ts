"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SWRConfig } from "swr";

import http from "@/http";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const themeProps: ThemeProviderProps = {
  enableSystem: true,
};

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <SWRConfig
          value={{
            fetcher: http.fetcher,
            onError: http.handleError,
          }}
        >
          {children}
        </SWRConfig>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
