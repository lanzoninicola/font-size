import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import usePreviewService from "~/domain/preview/usePreviewService";

import { AddIcon, BrowserIcon } from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";
import ToolbarButton from "./toolbar-button";
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
    <HStack
      w="100%"
      paddingInline={"1rem"}
      gap="1rem"
      p=".5rem"
      spacing={0}
      backgroundColor={"background.300"}
      borderRadius={"5px"}
    >
      <VStackBox w="100%" spacing={"1rem"}>
        <HStack w="100%" justify={"space-between"}>
          <HStack>
            <ToolbarButton label="Add Preview" onClick={onAddPreview}>
              <AddIcon />
            </ToolbarButton>
            <ToolbarButton label="Show navigation Bar" onClick={onShowURLBar}>
              <BrowserIcon />
            </ToolbarButton>
          </HStack>
          <ZoomBar />
        </HStack>
        {showURLBar && <UrlBar />}
      </VStackBox>
    </HStack>
  );
}
