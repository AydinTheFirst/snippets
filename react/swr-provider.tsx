import { SWRConfig } from "swr";

import http from "@/lib/http";

export default function SWR_Provider({ children }: React.PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        fetcher: http.fetcher,
        onError: http.handleError,
      }}
    >
      {children}
    </SWRConfig>
  );
}
