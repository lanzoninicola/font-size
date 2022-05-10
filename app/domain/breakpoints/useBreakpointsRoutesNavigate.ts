import { useNavigate } from "remix";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useBreakpointsRoutes from "./useBreakpointsRoutes";

export default function useBreakpointsRoutesNavigate() {
  const {
    ROUTE_BREAKPOINTS_LIST,
    ROUTE_BREAKPOINTS_ERROR_MISSING_BREAKPOINTS,
    ROUTE_BREAKPOINTS_NEW,
    ROUTE_BREAKPOINTS_UPDATE,
  } = useBreakpointsRoutes();
  const navigate = useNavigate();

  function navigateToMissingBreakpoints() {
    navigate(ROUTE_BREAKPOINTS_ERROR_MISSING_BREAKPOINTS);
  }

  function navigateToList() {
    navigate(ROUTE_BREAKPOINTS_LIST);
  }

  function navigateToNewBreakpoint() {
    navigate(ROUTE_BREAKPOINTS_NEW);
  }

  function navigateToUpdateBreakpoint(id: BreakpointId) {
    const updateURL = ROUTE_BREAKPOINTS_UPDATE.replace(":breakpointId", id);
    navigate(updateURL);
  }

  return {
    navigateToMissingBreakpoints,
    navigateToList,
    navigateToNewBreakpoint,
    navigateToUpdateBreakpoint,
  };
}
