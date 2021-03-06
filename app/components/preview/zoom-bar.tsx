import { HStack } from "@chakra-ui/react";
import usePreviewZoomSelector from "~/context/preview/hooks/usePreviewZoomSelector";
import usePreviewZoomService from "~/domain/preview/usePreviewZoomService";
import FormControlInputNumber from "../shared/form-control-input-number";
import { ZoomInIcon, ZoomOutIcon } from "../shared/icons";
import ActionButton from "../shared/action-button";

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
      <ActionButton label="Zoom In" onClick={onZoomInPreview}>
        <ZoomInIcon size={20} />
      </ActionButton>
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
      <ActionButton label="Zoom Out" onClick={onZoomOutPreview}>
        <ZoomOutIcon size={20} />
      </ActionButton>
    </HStack>
  );
}
