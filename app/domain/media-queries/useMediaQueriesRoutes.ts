import { useNavigate } from "remix";
import useAppRoutes from "../app/useAppRoutes";

export default function useMediaQueriesRoutes() {
  const navigate = useNavigate();

  const { ROUTE_APP_ERROR_MISSING_BREAKPOINTS } = useAppRoutes();

  const ROUTE_MEDIA_QUERY_BASE_ROUTE = "/app/media-queries";
  const ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS = `${ROUTE_MEDIA_QUERY_BASE_ROUTE}/missing-breakpoints`;
  const ROUTE_MEDIA_QUERY_EDIT = `${ROUTE_MEDIA_QUERY_BASE_ROUTE}`;
  const ROUTE_MEDIA_QUERY_SHOW_CODE = `${ROUTE_MEDIA_QUERY_BASE_ROUTE}/code`;
  const ROUTE_MEDIA_QUERY_REMOVE_ALL = `${ROUTE_MEDIA_QUERY_BASE_ROUTE}/remove-all`;

  const actions = {
    NAVIGATE_TO_MISSING_BREAKPOINTS: {
      dispatch: () => navigate(ROUTE_APP_ERROR_MISSING_BREAKPOINTS),
    },
    NAVIGATE_TO_EDIT_MEDIA_QUERY: {
      dispatch: () => navigate(ROUTE_MEDIA_QUERY_EDIT),
    },
    NAVIGATE_TO_SHOW_THE_CODE: {
      dispatch: () => navigate(ROUTE_MEDIA_QUERY_SHOW_CODE),
    },
  };

  return {
    ROUTE_MEDIA_QUERY_BASE_ROUTE,
    ROUTE_MEDIA_QUERY_ERROR_MISSING_BREAKPOINTS,
    ROUTE_MEDIA_QUERY_EDIT,
    ROUTE_MEDIA_QUERY_SHOW_CODE,
    ROUTE_MEDIA_QUERY_REMOVE_ALL,
    actions,
  };
}
