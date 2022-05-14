import { HStack, Text } from "@chakra-ui/react";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import { PreviewDevice } from "~/context/preview/types";
import usePreviewWindowsService from "~/domain/preview/usePreviewWindowsService";
import parseInputString from "~/domain/utilities/parseInputString";
import ActionButton from "../../shared/action-button";
import FormControlInputNumber from "../../shared/form-control-input-number";
import { TrashIcon } from "../../shared/icons";
import VStackBox from "../../shared/vstack-wrapper";

interface PreviewFrameToolbarProps {
  device: PreviewDevice;
  showRemoveIcon: boolean;
}

export default function PreviewFrameToolbar({
  device,
  showRemoveIcon = false,
}: PreviewFrameToolbarProps) {
  const { actions } = usePreviewWindowsSelector();
  // const { changeWindowWidth, changeWindowHeight } = usePreviewWindowsService();

  function onChangeWidth(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // changeWindowWidth(itemIdx, value);
  }

  function onChangeHeight(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // changeWindowHeight(itemIdx, value);
  }

  function onRemovePreviewWindow() {
    actions.PREVIEW_WINDOWS__REMOVE_WINDOW.dispatch(device);
  }

  const inputProps = {
    fontSize: "smaller",
    h: "20px",
    w: "60px",
    labelFontSize: "smaller",
    unitFontSize: "smaller",
  };

  return (
    <VStackBox spacing={2}>
      <HStack justify={"space-between"} w="100%">
        <HStack spacing={4} justify="center">
          <FormControlInputNumber
            id={`viewport-width-${String(device.width)}`}
            value={parseInputString(String(device.width))}
            label="W"
            ariaLabel="Set the width of the preview"
            unit="PX"
            onChange={(e) => onChangeWidth(e)}
            {...inputProps}
          />
          <FormControlInputNumber
            id={`viewport-height-${String(device.height)}`}
            value={parseInputString(String(device.height))}
            label="H"
            ariaLabel="Set the height of the preview"
            unit="PX"
            onChange={(e) => onChangeHeight(e)}
            {...inputProps}
          />
        </HStack>
        {showRemoveIcon && (
          <ActionButton
            label={`Remove ${device.name}`}
            onClick={onRemovePreviewWindow}
          >
            <TrashIcon size={20} />
          </ActionButton>
        )}
      </HStack>
      <Text color="primary.500" fontSize="smaller">
        <Text as="span" fontSize="smaller" fontWeight={700}>
          Device:{" "}
        </Text>
        {device.name}
      </Text>
    </VStackBox>
  );
}
