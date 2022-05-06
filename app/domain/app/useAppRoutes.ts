export default function useAppRoutes() {
  const ROUTE_APP_BASE_ROUTE = "/app";
  const ROUTE_APP_ERROR_MISSING_BREAKPOINTS = `${ROUTE_APP_BASE_ROUTE}/missing-breakpoints`;

  return {
    ROUTE_APP_BASE_ROUTE,
    ROUTE_APP_ERROR_MISSING_BREAKPOINTS,
  };
}
