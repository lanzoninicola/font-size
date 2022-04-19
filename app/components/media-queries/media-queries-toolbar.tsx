import { HStack } from "@chakra-ui/react";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";
import ToolbarButton from "../layout/toolbar-button";
import ToolbarWrapper from "../layout/toolbar-wrapper";
import { NewMediaQueryIcon, CodeIcon, ExportConfig } from "../shared/icons";

export default function MediaQueriesToolbar() {
  const { initMediaQuery } = useMediaQueryService();

  function onNewMediaQuery() {
    initMediaQuery();
  }

  return (
    <ToolbarWrapper justify="space-between">
      <HStack>
        <ToolbarButton label="New media query" onClick={onNewMediaQuery}>
          <NewMediaQueryIcon />
        </ToolbarButton>
        <ToolbarButton label="Show me the code">
          <CodeIcon />
        </ToolbarButton>
      </HStack>
      <ToolbarButton label="Export configuration">
        <ExportConfig />
      </ToolbarButton>
    </ToolbarWrapper>
  );
}
