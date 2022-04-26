export default function useMediaQueriesRoutes() {
  const BASE_ROUTE = "/app/media-queries";
  const ROUTE_MEDIA_QUERY_LIST = `${BASE_ROUTE}/list`;
  const ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS = `${BASE_ROUTE}/missing-breakpoints`;
  const ROUTE_MEDIA_QUERY_NEW = `${BASE_ROUTE}/edit`;
  const ROUTE_MEDIA_QUERY_UPDATE = `${BASE_ROUTE}/edit`;
  const ROUTE_MEDIA_QUERY_SHOW_CODE = `${BASE_ROUTE}/code`;

  return {
    BASE_ROUTE,
    ROUTE_MEDIA_QUERY_LIST,
    ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS,
    ROUTE_MEDIA_QUERY_NEW,
    ROUTE_MEDIA_QUERY_UPDATE,
    ROUTE_MEDIA_QUERY_SHOW_CODE,
  };
}
