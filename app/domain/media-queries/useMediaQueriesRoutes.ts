export default function useMediaQueriesRoutes() {
  const ROUTE_MEDIA_QUERY_BASE_ROUTE = "/app/media-queries";
  const ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS = `${ROUTE_MEDIA_QUERY_BASE_ROUTE}/missing-breakpoints`;
  const ROUTE_MEDIA_QUERY_EDIT = `${ROUTE_MEDIA_QUERY_BASE_ROUTE}`;
  const ROUTE_MEDIA_QUERY_SHOW_CODE = `${ROUTE_MEDIA_QUERY_BASE_ROUTE}/code`;

  return {
    ROUTE_MEDIA_QUERY_BASE_ROUTE,
    ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS,
    ROUTE_MEDIA_QUERY_EDIT,
    ROUTE_MEDIA_QUERY_SHOW_CODE,
  };
}
