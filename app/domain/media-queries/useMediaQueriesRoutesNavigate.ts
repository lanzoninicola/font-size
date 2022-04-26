import { useNavigate } from "remix";
import useMediaQueriesRoutes from "./useMediaQueriesRoutes";

export default function useMediaQueriesRoutesNavigate() {
  const {
    ROUTE_MEDIA_QUERY_LIST,
    ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS,
    ROUTE_MEDIA_QUERY_NEW,
    ROUTE_MEDIA_QUERY_UPDATE,
    ROUTE_MEDIA_QUERY_SHOW_CODE,
  } = useMediaQueriesRoutes();
  const navigate = useNavigate();

  function navigateToMissingBreakpoints() {
    navigate(ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS);
  }

  function navigateToList() {
    navigate(ROUTE_MEDIA_QUERY_LIST);
  }

  function navigateToNewMediaQuery() {
    navigate(ROUTE_MEDIA_QUERY_NEW);
  }

  function navigateToUpdateMediaQuery() {
    navigate(`${ROUTE_MEDIA_QUERY_UPDATE}`);
  }

  function navigateToShowTheCode() {
    navigate(ROUTE_MEDIA_QUERY_SHOW_CODE);
  }

  return {
    navigateToMissingBreakpoints,
    navigateToList,
    navigateToNewMediaQuery,
    navigateToUpdateMediaQuery,
    navigateToShowTheCode,
  };
}
