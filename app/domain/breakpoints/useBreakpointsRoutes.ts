export default function useBreakpointsRoutes() {
  const BASE_ROUTE = "/app/breakpoints";
  const ROUTE_BREAKPOINTS_LIST = `${BASE_ROUTE}/list`;
  const ROUTE_BREAKPOINTS_ERROR_MISSING_BREAKPOINTS = `${BASE_ROUTE}/missing-breakpoints`;
  const ROUTE_BREAKPOINTS_NEW = `${BASE_ROUTE}/edit/new`;
  const ROUTE_BREAKPOINTS_UPDATE = `${BASE_ROUTE}/edit`;

  return {
    BASE_ROUTE,
    ROUTE_BREAKPOINTS_LIST,
    ROUTE_BREAKPOINTS_ERROR_MISSING_BREAKPOINTS,
    ROUTE_BREAKPOINTS_NEW,
    ROUTE_BREAKPOINTS_UPDATE,
  };
}
