import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { CenteredCard } from "./CenteredCard";

function fallbackRender({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <CenteredCard title="Something went wrong">
      <p className="text-center">
        There was an error while rendering this component.
      </p>
      <br />
      <pre style={{ whiteSpace: "normal" }} className="text-sm text-red-500">
        {error.message}
      </pre>
      <br />
      <Button onClick={resetErrorBoundary} color="danger" fullWidth>
        Reload
      </Button>
    </CenteredCard>
  );
}

export const ErrorBoundaryLayout = () => (
  <ErrorBoundary FallbackComponent={fallbackRender}>
    <Outlet />
  </ErrorBoundary>
);
