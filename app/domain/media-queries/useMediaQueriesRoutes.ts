export default function useMediaQueriesRoutes() {
  const BASE_ROUTE = "/app/media-queries";
  const ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS = `${BASE_ROUTE}/missing-breakpoints`;
  const ROUTE_MEDIA_QUERY_EDIT = `${BASE_ROUTE}`;
  const ROUTE_MEDIA_QUERY_SHOW_CODE = `${BASE_ROUTE}/code`;

  return {
    BASE_ROUTE,
    ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS,
    ROUTE_MEDIA_QUERY_EDIT,
    ROUTE_MEDIA_QUERY_SHOW_CODE,
  };
}
