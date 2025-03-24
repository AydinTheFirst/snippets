import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";

function fallbackRender({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const getStackoverflowUrl = () => {
    const url = `https://stackoverflow.com/search?q=${error.message}`;
    window.open(url, "_blank")?.focus();
  };

  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="max-w-lg border rounded-lg shadow-lg p-6 bg-white">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">
            There was an error while rendering this component.
          </h1>
        </div>
        <div className="text-center text-red-500 text-sm whitespace-pre-wrap">
          <code>{error.message}</code>
        </div>
        <div className="mt-4 overflow-auto max-h-60 border p-2 bg-gray-100 text-sm">
          <code>{error.stack}</code>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <button
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            onClick={resetErrorBoundary}
          >
            Reload
          </button>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            onClick={getStackoverflowUrl}
          >
            Stackoverflow it
          </button>
        </div>
      </div>
    </div>
  );
}

export const ErrorBoundaryLayout = () => (
  <ErrorBoundary FallbackComponent={fallbackRender}>
    <Outlet />
  </ErrorBoundary>
);
