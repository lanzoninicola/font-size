export default function useSelectorsRoutes() {
  const ROUTE_SELECTORS_BASE_ROUTE = "/app/type-scale";
  const ROUTE_SELECTORS_LIST = `${ROUTE_SELECTORS_BASE_ROUTE}/list`;
  const ROUTE_SELECTORS_ERROR_MISSING_SELECTORS = `${ROUTE_SELECTORS_BASE_ROUTE}/missing-selectors`;
  const ROUTE_SELECTORS_NEW = `${ROUTE_SELECTORS_BASE_ROUTE}/new`;
  const ROUTE_SELECTORS_UPDATE = `${ROUTE_SELECTORS_BASE_ROUTE}/edit`;

  return {
    ROUTE_SELECTORS_BASE_ROUTE,
    ROUTE_SELECTORS_LIST,
    ROUTE_SELECTORS_ERROR_MISSING_SELECTORS,
    ROUTE_SELECTORS_NEW,
    ROUTE_SELECTORS_UPDATE,
  };
}
