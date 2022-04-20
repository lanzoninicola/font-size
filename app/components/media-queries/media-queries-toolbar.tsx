import { HStack } from "@chakra-ui/react";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";

import ActionButton from "../shared/action-button";
import ToolbarWrapper from "../layout/toolbar-wrapper";
import { CodeIcon, NewEntityIcon } from "../shared/icons";

export default function MediaQueriesToolbar() {
  const { initMediaQuery } = useMediaQueryService();

  function onNewMediaQuery() {
    initMediaQuery();
  }

  return (
    <ToolbarWrapper justify="space-between">
      <HStack>
        <ActionButton label="New media query" onClick={onNewMediaQuery}>
          <NewEntityIcon />
        </ActionButton>
        <ActionButton label="Show me the code">
          <CodeIcon />
        </ActionButton>
      </HStack>
      {/* <ActionButton label="Export configuration">
        <ExportConfig />
      </ActionButton> */}
    </ToolbarWrapper>
  );
}
