import { HStack } from "@chakra-ui/react";
import usePreviewZoomSelector from "~/context/preview/hooks/usePreviewZoomSelector";
import usePreviewZoomService from "~/domain/preview/usePreviewZoomService";
import FormControlInputNumber from "../shared/form-control-input-number";
import { ZoomInIcon, ZoomOutIcon } from "../shared/icons";
import ToolbarButton from "./toolbar-button";

export default function ZoomBar() {
  const { zoomIn, zoomOut } = usePreviewZoomService();
  const { zoom } = usePreviewZoomSelector();

  function onZoomInPreview() {
    zoomIn();
  }

  function onZoomOutPreview() {
    zoomOut();
  }
  return (
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
  );
}
