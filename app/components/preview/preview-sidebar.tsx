import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import usePreviewWindowsService from "~/domain/preview/usePreviewWindowsService";

import ActionButton from "../shared/action-button";
import { AddIcon, ClearAllIcon } from "../shared/icons";
import SidebarContainer from "../shared/sidebar-container";

export default function PreviewSidebar({
  onShowDevicesPanel,
}: {
  onShowDevicesPanel: () => void;
}) {
  const [isActive, setIsActive] = useState(false);
  const { removeAllWindows } = usePreviewWindowsService();
  const [showURLBar, setShowURLBar] = useState(false);

  function onAddPreview() {
    onShowDevicesPanel();
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
      isRight={true}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <VStack position={"sticky"} top="calc(50px + 1rem)" spacing={4}>
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

        {/* <ActionButton
          label="Show navigation Bar"
          onClick={onShowURLBar}
          tooltipOffset={[-110, -20]}
        >
          <BrowserIcon size={20} />
        </ActionButton> */}
      </VStack>
    </SidebarContainer>
  );
}
