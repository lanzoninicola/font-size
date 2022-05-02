import { useNavigate } from "remix";
import useMediaQueriesRoutes from "./useMediaQueriesRoutes";

export default function useMediaQueriesRoutesNavigate() {
  const {
    ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS,
    ROUTE_MEDIA_QUERY_EDIT,
    ROUTE_MEDIA_QUERY_SHOW_CODE,
  } = useMediaQueriesRoutes();
  const navigate = useNavigate();

  function navigateToMissingBreakpoints() {
    navigate(ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS);
  }

  function navigateToEditMediaQuery() {
    navigate(ROUTE_MEDIA_QUERY_EDIT);
  }

  function navigateToShowTheCode() {
    navigate(ROUTE_MEDIA_QUERY_SHOW_CODE);
  }

  return {
    navigateToMissingBreakpoints,
    navigateToEditMediaQuery,
    navigateToShowTheCode,
  };
}
