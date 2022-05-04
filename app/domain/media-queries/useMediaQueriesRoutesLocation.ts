import { useEffect, useState } from "react";
import { useLocation } from "remix";
import useMediaQueriesRoutes from "./useMediaQueriesRoutes";

export default function useMediaQueriesRoutesLocation() {
  const {
    ROUTE_MEDIA_QUERY_BASE_ROUTE,
    ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS,
    ROUTE_MEDIA_QUERY_EDIT,
    ROUTE_MEDIA_QUERY_SHOW_CODE,
    ROUTE_MEDIA_QUERY_REMOVE_ALL,
  } = useMediaQueriesRoutes();
  const { pathname } = useLocation();

  const [currentRoute, setCurrentRoute] = useState(
    ROUTE_MEDIA_QUERY_BASE_ROUTE
  );

  function _isCurrentRoute(route: string) {
    return pathname === route;
  }

  function _updateCurrentRoute() {
    if (_isCurrentRoute(ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS)) {
      setCurrentRoute(ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS);
    }

    if (_isCurrentRoute(ROUTE_MEDIA_QUERY_EDIT)) {
      setCurrentRoute(ROUTE_MEDIA_QUERY_EDIT);
    }

    if (_isCurrentRoute(ROUTE_MEDIA_QUERY_SHOW_CODE)) {
      setCurrentRoute(ROUTE_MEDIA_QUERY_SHOW_CODE);
    }

    if (_isCurrentRoute(ROUTE_MEDIA_QUERY_REMOVE_ALL)) {
      setCurrentRoute(ROUTE_MEDIA_QUERY_REMOVE_ALL);
    }
  }

  useEffect(() => {
    _updateCurrentRoute();
  }, [pathname]);

  return {
    currentRoute,
  };
}
