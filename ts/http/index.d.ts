declare module "axios" {
  export interface AxiosInstance {
    handleError: (error: unknown) => void;
    fetcher: <T>(url: string) => Promise<T>;
  }
}

export {};
