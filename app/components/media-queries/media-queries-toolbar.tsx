import { HStack } from "@chakra-ui/react";
import { Link } from "remix";
import useMediaQueriesData from "~/domain/media-queries/useMediaQueriesData";
import useMediaQueriesRoutes from "~/domain/media-queries/useMediaQueriesRoutes";
import useMediaQueriesRoutesLocation from "~/domain/media-queries/useMediaQueriesRoutesLocation";

import ToolbarWrapper from "../layout/toolbar-wrapper";
import ActionButton from "../shared/action-button";
import { ClearAllIcon, CodeIcon, InitIcon } from "../shared/icons";

export default function MediaQueriesToolbar() {
  const {
    ROUTE_MEDIA_QUERY_SHOW_CODE,
    ROUTE_MEDIA_QUERY_EDIT,
    ROUTE_MEDIA_QUERY_REMOVE_ALL,
  } = useMediaQueriesRoutes();

  const { currentRoute } = useMediaQueriesRoutesLocation();

  const { initMediaQueries } = useMediaQueriesData();

  function onInitMediaQueries() {
    initMediaQueries();
  }

  function getActionButtons() {
    switch (currentRoute) {
      case ROUTE_MEDIA_QUERY_EDIT:
        return (
          <>
            <ActionButton
              label="Load Pre-made Media Queries"
              onClick={onInitMediaQueries}
            >
              <InitIcon />
            </ActionButton>
            <Link to={ROUTE_MEDIA_QUERY_SHOW_CODE}>
              <ActionButton label="Show me the code">
                <CodeIcon />
              </ActionButton>
            </Link>
            <Link to={ROUTE_MEDIA_QUERY_REMOVE_ALL}>
              <ActionButton label="Clear all Media Queries">
                <ClearAllIcon />
              </ActionButton>
            </Link>
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
