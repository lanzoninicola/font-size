import { useEffect, useState } from "react";
import { useLocation } from "remix";
import useBreakpointsRoutes from "./useBreakpointsRoutes";

export default function useBreakpointRoutesLocation() {
  const {
    BASE_ROUTE,
    ROUTE_BREAKPOINTS_ERROR_MISSING_BREAKPOINTS,
    ROUTE_BREAKPOINTS_LIST,
    ROUTE_BREAKPOINTS_NEW,
    ROUTE_BREAKPOINTS_UPDATE,
  } = useBreakpointsRoutes();

  const { pathname } = useLocation();

  const [currentRoute, setCurrentRoute] = useState(BASE_ROUTE);

  function _isCurrentRoute(route: string) {
    return pathname === route;
  }

  function _updateCurrentRoute() {
    if (_isCurrentRoute(ROUTE_BREAKPOINTS_ERROR_MISSING_BREAKPOINTS)) {
      setCurrentRoute(ROUTE_BREAKPOINTS_ERROR_MISSING_BREAKPOINTS);
    }

    if (_isCurrentRoute(ROUTE_BREAKPOINTS_LIST)) {
      setCurrentRoute(ROUTE_BREAKPOINTS_LIST);
    }

    if (_isCurrentRoute(ROUTE_BREAKPOINTS_NEW)) {
      setCurrentRoute(ROUTE_BREAKPOINTS_NEW);
    }

    if (_isCurrentRoute(ROUTE_BREAKPOINTS_UPDATE)) {
      setCurrentRoute(ROUTE_BREAKPOINTS_UPDATE);
    }
  }

  useEffect(() => {
    console.log(pathname);
    _updateCurrentRoute();
  }, [pathname]);

  return {
    currentRoute,
  };
}
