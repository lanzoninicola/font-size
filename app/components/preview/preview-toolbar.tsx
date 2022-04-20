import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import usePreviewService from "~/domain/preview/usePreviewService";
import ToolbarWrapper from "../layout/toolbar-wrapper";

import { AddIcon, BrowserIcon } from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";
import ActionButton from "../shared/action-button";
import UrlBar from "./url-bar";
import ZoomBar from "./zoom-bar";

export default function PreviewToolbar() {
  const { addWindow } = usePreviewService();
  const [showURLBar, setShowURLBar] = useState(false);

  function onAddPreview() {
    addWindow();
  }

  function onShowURLBar() {
    setShowURLBar(!showURLBar);
  }

  return (
    <ToolbarWrapper>
      <VStackBox w="100%" spacing={"1rem"}>
        <HStack w="100%" justify={"space-between"}>
          <HStack>
            <ActionButton label="Add Preview" onClick={onAddPreview}>
              <AddIcon size={20} />
            </ActionButton>
            <ActionButton label="Show navigation Bar" onClick={onShowURLBar}>
              <BrowserIcon size={20} />
            </ActionButton>
          </HStack>
          <ZoomBar />
        </HStack>
        {showURLBar && <UrlBar />}
      </VStackBox>
    </ToolbarWrapper>
  );
}
