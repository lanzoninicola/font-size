import { HStack } from "@chakra-ui/react";
import { Link } from "remix";
import useMediaQueriesRoutes from "~/domain/media-queries/useMediaQueriesRoutes";
import useMediaQueriesRoutesLocation from "~/domain/media-queries/useMediaQueriesRoutesLocation";

import ToolbarWrapper from "../layout/toolbar-wrapper";
import ActionButton from "../shared/action-button";
import {
  CodeIcon,
  EditIcon,
  NavigateBackIcon,
  NewEntityIcon,
} from "../shared/icons";

export default function MediaQueriesToolbar() {
  const { ROUTE_MEDIA_QUERY_SHOW_CODE, ROUTE_MEDIA_QUERY_EDIT } =
    useMediaQueriesRoutes();

  const { currentRoute } = useMediaQueriesRoutesLocation();

  function getActionButtons() {
    switch (currentRoute) {
      case ROUTE_MEDIA_QUERY_EDIT:
        return (
          <>
            <ActionButton label="Show me the code">
              <Link to={ROUTE_MEDIA_QUERY_SHOW_CODE}>
                <CodeIcon />
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
