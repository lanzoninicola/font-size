import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import usePreviewZoomSelector from "~/context/preview/hooks/usePreviewZoomSelector";
import { PreviewItem } from "~/context/preview/interfaces";
import SETTINGS from "~/domain/settings";
import FormControlInputNumber from "../shared/form-control-input-number";

import { AddIcon, BrowserIcon, ZoomInIcon, ZoomOutIcon } from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";
import ToolbarButton from "./toolbar-button";
import UrlBar from "./url-bar";

export default function PreviewToolbar() {
  const { previewWindows, setPreviewWindows } = usePreviewWindowsSelector();
  const { zoom, setZoom } = usePreviewZoomSelector();
  const [showURLBar, setShowURLBar] = useState(false);

  function onAddPreview() {
    const nextState = [...previewWindows];

    const newItem: PreviewItem = {
      width: SETTINGS.preview.iframeDefaultWidth,
      height: SETTINGS.preview.iframeDefaultHeight,
    };

    nextState.unshift(newItem);

    setPreviewWindows(nextState);
  }

  function onShowURLBar() {
    setShowURLBar(!showURLBar);
  }

  function onZoomInPreview() {
    setZoom(zoom + 10);
  }

  function onZoomOutPreview() {
    const nextZoom = zoom - 10;
    if (nextZoom < 0) {
      return;
    }
    setZoom(zoom - 10);
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
          <HStack spacing={0} justify="center">
            <ToolbarButton label="Zoom In" onClick={onZoomInPreview}>
              <ZoomInIcon />
            </ToolbarButton>
            <FormControlInputNumber
              id="preview-zoom-percentage"
              ariaLabel="Zoom percentage"
              h="30px"
              w="70px"
              borderRadius="5px"
              labelFontSize="12px"
              justify="center"
              value={`${zoom}%`}
              fontSize="12px"
              isReadOnly
            />
            <ToolbarButton label="Zoom Out" onClick={onZoomOutPreview}>
              <ZoomOutIcon />
            </ToolbarButton>
          </HStack>
        </HStack>
        {showURLBar && <UrlBar />}
      </VStackBox>
    </HStack>
  );
}
