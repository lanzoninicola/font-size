import { HStack } from "@chakra-ui/react";
import { Link } from "remix";
import useMediaQueriesRoutes from "~/domain/media-query/useMediaQueriesRoutes";
import useMediaQueriesRoutesLocation from "~/domain/media-query/useMediaQueriesRoutesLocation";

import ToolbarWrapper from "../layout/toolbar-wrapper";
import ActionButton from "../shared/action-button";
import {
  CodeIcon,
  EditIcon,
  NavigateBackIcon,
  NewEntityIcon,
} from "../shared/icons";

export default function MediaQueriesToolbar() {
  const {
    ROUTE_MEDIA_QUERY_LIST,
    ROUTE_MEDIA_QUERY_SHOW_CODE,
    ROUTE_MEDIA_QUERY_NEW,
    ROUTE_MEDIA_QUERY_UPDATE,
  } = useMediaQueriesRoutes();

  const { currentRoute } = useMediaQueriesRoutesLocation();

  function getActionButtons() {
    switch (currentRoute) {
      case ROUTE_MEDIA_QUERY_LIST:
        return (
          <>
            <ActionButton label="Edit media queries">
              <Link to={ROUTE_MEDIA_QUERY_NEW}>
                <EditIcon />
              </Link>
            </ActionButton>
            <ActionButton label="Show me the code">
              <Link to={ROUTE_MEDIA_QUERY_SHOW_CODE}>
                <CodeIcon />
              </Link>
            </ActionButton>
          </>
        );
      case ROUTE_MEDIA_QUERY_NEW || ROUTE_MEDIA_QUERY_UPDATE:
        return (
          <>
            <ActionButton label="Go back">
              <Link to={ROUTE_MEDIA_QUERY_LIST}>
                <NavigateBackIcon />
              </Link>
            </ActionButton>
          </>
        );
    }
  }

  // useEffect(() => {
  //   getActionButtons();
  // }, [currentRoute]);

  return (
    <ToolbarWrapper justify="space-between">
      <HStack>{getActionButtons()}</HStack>
      {/* <ActionButton label="Export configuration">
        <ExportConfig />
      </ActionButton> */}
    </ToolbarWrapper>
  );
}
