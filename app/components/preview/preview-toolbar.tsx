import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import usePreviewService from "~/domain/preview/usePreviewService";
import ToolbarWrapper from "../layout/toolbar-wrapper";

import { AddIcon, BrowserIcon } from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";
import ToolbarButton from "../layout/toolbar-button";
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
            <ToolbarButton label="Add Preview" onClick={onAddPreview}>
              <AddIcon size={20} />
            </ToolbarButton>
            <ToolbarButton label="Show navigation Bar" onClick={onShowURLBar}>
              <BrowserIcon size={20} />
            </ToolbarButton>
          </HStack>
          <ZoomBar />
        </HStack>
        {showURLBar && <UrlBar />}
      </VStackBox>
    </ToolbarWrapper>
  );
}
