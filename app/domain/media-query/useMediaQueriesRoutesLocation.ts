import { useEffect, useState } from "react";
import { useLocation } from "remix";
import useMediaQueriesRoutes from "./useMediaQueriesRoutes";

export default function useMediaQueriesRoutesLocation() {
  const {
    BASE_ROUTE,
    ROUTE_MEDIA_QUERY_LIST,
    ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS,
    ROUTE_MEDIA_QUERY_NEW,
    ROUTE_MEDIA_QUERY_UPDATE,
    ROUTE_MEDIA_QUERY_SHOW_CODE,
  } = useMediaQueriesRoutes();
  const { pathname } = useLocation();

  const [currentRoute, setCurrentRoute] = useState(BASE_ROUTE);

  function _isCurrentRoute(route: string) {
    return pathname === route;
  }

  function _updateCurrentRoute() {
    if (_isCurrentRoute(ROUTE_MEDIA_QUERY_LIST)) {
      setCurrentRoute(ROUTE_MEDIA_QUERY_LIST);
    }

    if (_isCurrentRoute(ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS)) {
      setCurrentRoute(ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS);
    }

    if (_isCurrentRoute(ROUTE_MEDIA_QUERY_NEW)) {
      setCurrentRoute(ROUTE_MEDIA_QUERY_NEW);
    }

    if (_isCurrentRoute(ROUTE_MEDIA_QUERY_UPDATE)) {
      setCurrentRoute(ROUTE_MEDIA_QUERY_UPDATE);
    }

    if (_isCurrentRoute(ROUTE_MEDIA_QUERY_SHOW_CODE)) {
      setCurrentRoute(ROUTE_MEDIA_QUERY_SHOW_CODE);
    }
  }

  useEffect(() => {
    _updateCurrentRoute();
  }, [pathname]);

  return {
    currentRoute,
  };
}
