import { useLocation, useParams } from "remix";

export default function useRouteLocation() {
  const { pathname } = useLocation();
  const params = useParams();

  /**
   * @description Checks if the current route is the one provided
   *
   * @param route - The route to check against the current location
   * @returns {boolean} - True if the route given as parameter is the current location
   */
  function isCurrentRoute(route: string) {
    if (pathname === route) {
      return true;
    }

    const routeParam = route
      .split("/")
      .find((chunk) => chunk.charAt(0) === ":")
      ?.replace(":", "");

    if (routeParam) {
      if (params[routeParam]) {
        return true;
      }
    }

    return false;
  }

  return {
    isCurrentRoute,
  };
}
