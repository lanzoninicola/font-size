import { Box, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useMediaQueriesRoutes from "~/domain/media-queries/useMediaQueriesRoutes";
import usePreviewWindowsService from "~/domain/preview/usePreviewWindowsService";
import ActionButton from "../shared/action-button";
import { AddIcon, ClearAllIcon, BrowserIcon } from "../shared/icons";

import SidebarContainer from "../shared/sidebar-container";

export default function PreviewSidebar() {
  const [isActive, setIsActive] = useState(false);
  const { addWindow, removeAllWindows } = usePreviewWindowsService();
  const [showURLBar, setShowURLBar] = useState(false);

  function onAddPreview() {
    addWindow();
  }

  function onRemoveAllPreviews() {
    removeAllWindows();
  }

  function onShowURLBar() {
    setShowURLBar(!showURLBar);
  }

  function onMouseEnter() {
    setIsActive(true);
  }

  function onMouseLeave() {
    setIsActive(false);
  }

  return (
    <SidebarContainer
      gridArea="preview-sidebar"
      isRight={true}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <VStack
        position={"sticky"}
        top="50%"
        transform="translateY(-50%)"
        spacing={4}
      >
        <ActionButton
          label="Add Preview"
          onClick={onAddPreview}
          tooltipOffset={[-80, -20]}
        >
          <AddIcon size={20} />
        </ActionButton>
        <ActionButton
          label="Remove all previews"
          onClick={onRemoveAllPreviews}
          tooltipOffset={[-110, -20]}
        >
          <ClearAllIcon size={20} />
        </ActionButton>

        <ActionButton
          label="Show navigation Bar"
          onClick={onShowURLBar}
          tooltipOffset={[-110, -20]}
        >
          <BrowserIcon size={20} />
        </ActionButton>
      </VStack>
    </SidebarContainer>
  );
}
